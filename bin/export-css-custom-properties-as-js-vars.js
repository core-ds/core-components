const exportCustomVariables = require('postcss-export-custom-variables');
const path = require('path');
const postcssImport = require('postcss-import');
const postcss = require('postcss');
const fs = require('fs');
const shell = require('shelljs');

const distPath = '../dist/vars/';

fs.mkdirSync(path.resolve(__dirname, distPath), { recursive: true });

function exportCssVarsAsJs(srcFileName) {
    const cssPath = path.resolve(__dirname, `../packages/vars/src/${srcFileName}.css`);
    const css = fs.readFileSync(cssPath, 'utf-8');
    const jsPath = path.resolve(__dirname, distPath, `${srcFileName}.js`);

    return postcss()
        .use(postcssImport({}))
        .use(exportCustomVariables({ exporter: 'js', destination: jsPath }))
        .process(css, { from: cssPath, to: jsPath })
        .then(() => {
            shell.exec(
                `tsc --typeRoots [] --declaration --emitDeclarationOnly --allowJs ${jsPath}`,
            );
        });
}

function exec() {
    return Promise.all([exportCssVarsAsJs('index'), exportCssVarsAsJs('colors-bluetint')]);
}

exec()
    .then(() => process.exit(0))
    .catch((reason) => {
        console.error(reason);
        process.exit(1);
    });
