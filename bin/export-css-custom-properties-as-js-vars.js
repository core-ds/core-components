const exportCustomVariables = require('postcss-export-custom-variables');
const path = require('path');
const postcssImport = require('postcss-import');
const postcss = require('postcss');
const fs = require('fs');
const shell = require('shelljs');

const distPath = '../packages/vars/dist';

fs.mkdirSync(path.resolve(__dirname, distPath), { recursive: true });

const BUILDS = ['es5', 'cssm', 'moderncssm', 'esm', 'modern'];

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
                (['es5', 'cssm', 'moderncssm'].includes(buildName)
                    ? 'module.exports.'
                    : 'export const ') +
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

function exportCssVarsAsJs(srcFileName) {
    const cssPath = path.resolve(__dirname, `../packages/vars/src/${srcFileName}.css`);
    const css = fs.readFileSync(cssPath, 'utf-8');

    return Promise.all(
        BUILDS.map((buildName) => {
            const destJsPath = path.resolve(
                __dirname,
                distPath,
                buildName === 'es5' ? '' : buildName,
                `${srcFileName}.js`,
            );

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
                .then(() => {
                    shell.exec(
                        `tsc --typeRoots [] --declaration --emitDeclarationOnly --allowJs ${destJsPath}`,
                    );
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
