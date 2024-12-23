import fs from 'fs-extra';
import path from 'path';
import { createFilter } from 'rollup-pluginutils';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import postcssImport from 'postcss-import';
import stringHash from 'string-hash';
import { currentComponentName, currentPackageDir, rootPkg, pkg } from './common.mjs';

import postcssConfig from '../../postcss.config.js';

export function processCss(options = {}) {
    const config = {
        name: 'process-css',
        modules: options.modules ?? true,
        noCommonVars: options.noCommonVars ?? false,
    };

    const cssAssets = {};

    const isIncluded = createFilter('**/*.css', '**/node_modules/**');

    return {
        name: config.name,
        async resolveId(source, importer, options) {
            const resolution = await this.resolve(source, importer, options);

            if (!resolution || resolution.external || !isIncluded(resolution.id)) return resolution;

            cssAssets[resolution.id] = { filepath: resolution.id, from: importer };

            if (!config.modules) {
                resolution.external = true;
            }

            return resolution;
        },
        async transform(_, id) {
            if (!cssAssets[id]) {
                return null;
            }

            const result = await processPostcss(id, config);

            cssAssets[id].classNames = result.classNames;
            cssAssets[id].css = result.css;

            return {
                code: `
                import "${id.replace('.module.css', '.css')}";
                export default ${JSON.stringify(cssAssets[id].classNames)};`,
                map: null,
            };
        },
        async renderStart(outputOptions) {
            if (!outputOptions.preserveModules) {
                this.error(`\n\n${config.name} requires output.preserveModules to be enabled\n\n`);
            }

            await Promise.all(
                Object.values(cssAssets).map(async (cssAsset) => {
                    if (!config.modules) {
                        const result = await processPostcss(cssAsset.filepath, config);
                        cssAsset.css = result.css;
                    }

                    return saveCssAsset(cssAsset, outputOptions, config.modules);
                }),
            );
        },
    };
}

async function processPostcss(filePath, config = {}) {
    let classNames = {};

    const originalCss = fs.readFileSync(filePath).toString();

    const plugins = [...postcssConfig.plugins];

    if (config.noCommonVars) {
        const importPluginIdx = plugins.findIndex(
            (plugin) => plugin.postcssPlugin === 'postcss-import',
        );

        if (importPluginIdx !== -1) {
            plugins[importPluginIdx] = postcssImport({
                warnOnEmpty: false,
                load: async (filename, importOptions) => {
                    if (filename.includes('/vars/src/index.css')) {
                        // TODO: warnOnEmpty добавлен только в 16й версии postcss-import. Но для нее требуется node >= 18
                        // В текущей версиии postcss-import импорт пустого файла вызывает ошибку
                        // https://github.com/postcss/postcss-import/issues/84
                        return '/* */';
                    }

                    return fs.readFile(filename, 'utf-8');
                },
            });
        }
    }

    if (config.modules) {
        plugins.push(
            postcssModules({
                generateScopedName: function (name, fileName) {
                    const relativeFileName = path.relative(currentPackageDir, fileName);

                    const hash = generateClassNameHash(pkg.name, rootPkg.version, relativeFileName);

                    return `${currentComponentName}__${name}_${hash}`;
                },
                getJSON: (_, json) => {
                    classNames = json;
                },
            }),
        );
    }

    const result = await postcss(plugins).process(originalCss, {
        from: filePath,
    });

    return {
        css: result.css,
        classNames,
    };
}

async function saveCssAsset(cssAsset, outputOptions, modules = true) {
    if (!cssAsset.css) {
        return;
    }

    const { dir, preserveModulesRoot } = outputOptions;

    let dest = cssAsset.filepath.replace(preserveModulesRoot, dir);
    if (modules) {
        dest = dest.replace('.module.css', '.css');
    }

    if (!cssAsset.filepath.startsWith(preserveModulesRoot)) {
        throw new Error(
            `\n\nCannot include asset: ${cssAsset.filepath} from ${cssAsset.from} because it is outside of the preserve modules root`,
        );
    }

    await fs.ensureDir(path.dirname(dest));
    await fs.writeFile(dest, cssAsset.css);
}

function generateClassNameHash(packageName, packageVersion, relativeFileName) {
    return stringHash(`${packageName}@${packageVersion}@${relativeFileName}`)
        .toString(36)
        .slice(0, 5);
}

export function ignoreCss() {
    return {
        name: 'ignore-css',
        resolveId(source) {
            if (source.includes('.css')) {
                return false;
            }

            return null;
        },
    };
}