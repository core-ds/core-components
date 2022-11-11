const fs = require('fs');
const glob = require('glob');
const path = require('path');
const shell = require('shelljs');

const distDir = '/dist/';

const IGNORE_PATTERNS = ['**/themes/**/*.css', '**/vars/**/*.css', '**/bank-card/**/*.css'];

glob(
    path.join(path.resolve(__dirname, `..${distDir}`), '**/*.css'),
    { ignore: IGNORE_PATTERNS },
    (err, files) => {
        const nonExistentVars = {};

        files.forEach((file) => {
            const re = /(?<=var\().+?(?=\))/g;
            const data = fs.readFileSync(file).toString();
            let result;

            const pathSlice = file.slice(file.indexOf(distDir) + distDir.length);

            while ((result = re.exec(data)) !== null) {
                if (!nonExistentVars[pathSlice]) {
                    nonExistentVars[pathSlice] = [];
                }
                nonExistentVars[pathSlice].push(result[0]);
            }
        });

        shell.exec(
            `echo ::set-output name=has-non-existent-vars::${
                Object.keys(nonExistentVars).length > 0
            }`,
        );
        shell.exec(
            `echo ::set-output name=non-existent-css-vars::${JSON.stringify(
                JSON.stringify(nonExistentVars),
            )}`,
        );
    },
);
