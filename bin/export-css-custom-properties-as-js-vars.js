const exportCustomVariables = require('postcss-export-custom-variables');
const path = require('path');
const postcssImport = require('postcss-import');
const postcss = require('postcss');
const fs = require('fs');
const shell = require('shelljs');

const distPath = '../dist/vars/';
const jsPath = path.resolve(__dirname, distPath, 'index.js');
const cssPath = path.resolve(__dirname, '../packages/vars/src/index.css');
const css = fs.readFileSync(cssPath, 'utf-8');

fs.mkdirSync(path.resolve(__dirname, distPath), { recursive: true });

postcss()
    .use(postcssImport({}))
    .use(
        exportCustomVariables({
            exporter: 'js',
            destination: jsPath,
        }),
    )
    .process(css, { from: cssPath, to: jsPath })
    .then(() => {
        shell.exec(`tsc --typeRoots [] --declaration --emitDeclarationOnly --allowJs ${jsPath}`);
        process.exit(0);
    })
    .catch((reason) => {
        console.log(reason);
        process.exit(1);
    });
