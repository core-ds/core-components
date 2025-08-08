/* eslint-disable @typescript-eslint/no-shadow, import/no-extraneous-dependencies, no-param-reassign */

import fse from 'fs-extra';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import postcss from 'postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssModules from 'postcss-modules';
import { createFilter } from 'rollup-pluginutils';
import stringHash from 'string-hash';
import { globSync } from 'tinyglobby';

import postcssConfig from '../../postcss.config.js';
import { isSamePath } from '../path.cjs';
import { persistMixins } from '../postcss/postcss-mixins.cjs';
import postcssPersistentMixins from '../postcss/postcss-persistent-mixins.cjs';
import { resolveInternal } from '../resolve-internal.cjs';

import { dynamicMixins } from './dynamic-mixins.mjs';

const pkg = fse.readJsonSync('package.json', { encoding: 'utf8' });

const varsEntryPoints = globSync('src/*index.css', {
    cwd: resolveInternal('@alfalab/core-components-vars'),
    absolute: true,
});

/**
 * @typedef Options
 * @property {boolean} [modules]
 * @property {boolean} [noCommonVars]
 * @property {boolean} [keepDynamicMixins]
 * @property {boolean} [preserveVars]
 */

/**
 * @param {Options} [options]
 * @returns {import('rollup').Plugin}
 */
export function processCss(options = {}) {
    /**
     * @type {Required<Options>}
     */
    const config = {
        modules: options.modules ?? true,
        noCommonVars: options.noCommonVars ?? false,
        keepDynamicMixins: options.keepDynamicMixins ?? false,
        preserveVars: options.preserveVars ?? true,
    };

    const name = 'process-css';

    const cssAssets = {};

    const isIncluded = createFilter('**/*.css', '**/node_modules/**');

    return {
        name,
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
                this.error(`\n\n${name} requires output.preserveModules to be enabled\n\n`);
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

/**
 * @param {string} filePath
 * @param {Required<Options>} config
 */
async function processPostcss(filePath, config) {
    let classNames = {};

    const originalCss = await fs.readFile(filePath, { encoding: 'utf8' });

    let plugins = postcssConfig.plugins.map((plugin) => {
        if (plugin.postcssPlugin === 'postcss-mixins') {
            const parsed = path.parse(filePath);

            let ignore;
            let mixins;

            if (/^alfasans-.*\.css$/.test(parsed.base)) {
                ignore = ['src/{index,typography}.css'];
            } else {
                const companionFile = path.join(parsed.dir, `alfasans-${parsed.base}`);

                if (existsSync(companionFile)) {
                    ignore = ['src/alfasans-{index,typography}.css'];
                } else if (config.keepDynamicMixins) {
                    ignore = ['src/alfasans-{index,typography}.css', 'src/{index,typography}.css'];
                    mixins = persistMixins(dynamicMixins);
                } else {
                    ignore = ['src/alfasans-{index,typography}.css'];
                }
            }

            return postcssMixins({
                mixinsFiles: globSync('src/*.css', {
                    ignore,
                    cwd: resolveInternal('@alfalab/core-components-vars'),
                    absolute: true,
                }),
                mixins,
            });
        }

        return plugin;
    });

    if (config.noCommonVars) {
        plugins = plugins.map((plugin) =>
            plugin.postcssPlugin === 'postcss-import'
                ? postcssImport({
                      warnOnEmpty: false,
                      load: (filename) => {
                          const isEntryPoint = varsEntryPoints.some((entryPoint) =>
                              isSamePath(entryPoint, filename),
                          );

                          return isEntryPoint ? '' : fs.readFile(filename, { encoding: 'utf8' });
                      },
                  })
                : plugin,
        );
    }

    if (config.preserveVars === false) {
        plugins.push(postcssCustomProperties({ preserve: false }));
    }

    if (config.modules) {
        plugins.push(
            postcssModules({
                generateScopedName(name, fileName) {
                    const relativeFileName = path.relative(cwd(), fileName);
                    const componentName = pkg.name.replace('@alfalab/core-components-', '');
                    const hash = generateClassNameHash(pkg.name, pkg.version, relativeFileName);

                    return `${componentName}__${name}_${hash}`;
                },
                getJSON: (_, json) => {
                    classNames = json;
                },
            }),
        );
    }

    let result = await postcss(plugins).process(originalCss, { from: filePath });

    if (config.keepDynamicMixins) {
        result = await postcss(postcssPersistentMixins()).process(result.css, {
            from: undefined,
        });
    }

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

    await fse.ensureDir(path.dirname(dest));

    await fs.writeFile(dest, cssAsset.css, { encoding: 'utf8' });
}

function generateClassNameHash(packageName, packageVersion, relativeFileName) {
    return stringHash(`${packageName}@${packageVersion}@${relativeFileName}`)
        .toString(36)
        .slice(0, 5);
}
