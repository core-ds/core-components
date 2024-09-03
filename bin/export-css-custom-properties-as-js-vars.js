const exportCustomVariables = require('postcss-export-custom-variables');
const path = require('path');
const postcssImport = require('postcss-import');
const postcss = require('postcss');
const fs = require('fs');
const shell = require('shelljs');

const distPath = '../packages/vars/dist';

fs.mkdirSync(path.resolve(__dirname, distPath), { recursive: true });

const BUILDS = ['es5', 'cssm', 'esm', 'modern'];
const PALETTES = [
    'colors',
    'colors-addons',
    'colors-bluetint',
    'colors-decorative',
    'colors-indigo',
    'colors-pfm',
    'colors-qualitative',
    'colors-sequential',
    'colors-students',
    'colors-transparent',
    'colors-x5',
    'shadows-bluetint',
    'shadows-indigo',
];

function ensureDirectoryExist(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return;
    fs.mkdirSync(dirname);
}

function createExporter(buildName) {
    return function (variables, options, root) {
        const pathname =
            options.destination ||
            (root.source &&
                root.source.input &&
                root.source.input.file &&
                root.source.input.file + '.js') ||
            'custom-variables.js';

        const contents = Object.keys(variables).reduce(function (buffer, key) {
            return (
                buffer +
                (['es5', 'cssm'].includes(buildName) ? 'module.exports.' : 'export const ') +
                key +
                ' = ' +
                JSON.stringify(variables[key]).replace(/(^|{|,)"(.+?)":/g, '$1$2:') +
                ';\n'
            );
        }, '');

        return new Promise(function (resolve, reject) {
            fs.writeFile(pathname, contents, function (error) {
                return error ? reject(error) : resolve();
            });
        });
    };
}

/** формирует файлы деклараций d.ts */
function execTsc(destJsPath) {
    return function () {
        console.log(`create d.ts => ${destJsPath.split('/packages')[1]}`);

        shell.exec(
            `tsc --typeRoots [] --declaration --emitDeclarationOnly --allowJs ${destJsPath}`,
        );
    };
}

/** формирует путь для создания js модуля с css переменными (учитывая тип сборки) */
function createJSPathDestination(buildName, srcFileName) {
    return path.resolve(
        __dirname,
        distPath,
        buildName === 'es5' ? '' : buildName,
        `${srcFileName}.js`,
    );
}

/** собирает css переменные из vars/index.css в единый js модуль */
function exportCssVarsAsJs(srcFileName) {
    const cssPath = path.resolve(__dirname, `../packages/vars/src/${srcFileName}.css`);
    const css = fs.readFileSync(cssPath, 'utf-8');

    return Promise.all(
        BUILDS.map((buildName) => {
            const destJsPath = createJSPathDestination(buildName, srcFileName);

            ensureDirectoryExist(destJsPath);
            return postcss()
                .use(postcssImport({}))
                .use(
                    exportCustomVariables({
                        exporter: createExporter(buildName),
                        destination: destJsPath,
                    }),
                )
                .process(css, { from: cssPath, to: destJsPath })
                .then(execTsc(destJsPath));
        }),
    );
}

/** собирает js модуль для каждого css файла по отдельности */
function buildPalettesCustomCSSProperties() {
    return Promise.all(
        PALETTES.map((palette) => {
            const cssPath = path.resolve(__dirname, `../packages/vars/src/${palette}.css`);
            const css = fs.readFileSync(cssPath, 'utf-8');

            BUILDS.map((buildName) => {
                const destJsPath = createJSPathDestination(buildName, `${palette}.module`);

                ensureDirectoryExist(destJsPath);

                console.log(`build [ ${palette} => ${buildName} ]`);

                return postcss()
                    .use(
                        exportCustomVariables({
                            exporter: createExporter(buildName),
                            destination: destJsPath,
                        }),
                    )
                    .process(css, { from: cssPath, to: destJsPath })
                    .then(execTsc(destJsPath));
            });
        }),
    );
}

exportCssVarsAsJs('index')
    .then(() => process.exit(0))
    .catch((reason) => {
        console.error(reason);
        process.exit(1);
    });

buildPalettesCustomCSSProperties().catch((reason) => {
    console.error(reason);
    process.exit(1);
});
