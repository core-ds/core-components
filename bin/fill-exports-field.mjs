import shell from 'shelljs';
import fs from 'node:fs';
import { createRequire } from 'module';
import { ENTRY_POINTS } from '../entry-points.mjs';

const require = createRequire(import.meta.url);

const packages = shell.exec(
    `lerna list \\
        --ignore @alfalab/core-components-codemod \\
        --ignore @alfalab/core-components-vars \\
        --ignore @alfalab/core-components-themes \\
        --all`,
    { silent: true },
).stdout;

const packageList = packages
    .split('\n')
    .map((pkg) => pkg.trim())
    .filter(Boolean)
    .map((pkg) => pkg.replace('@alfalab/core-components-', ''));

function fillExportsField() {
    const exports = {
        './vars': './vars/index.js',
        './vars/*': './vars/*',
        './themes/*': './themes/*',
    };

    while (packageList.length) {
        const pkgName = packageList.pop();
        const pkgPath = `./packages/${pkgName}/src`;

        ENTRY_POINTS.forEach((entry) => {
            const hasEntry = fs.existsSync(`${pkgPath}/${entry}.ts`);

            if (entry === 'index' && hasEntry) {
                exports[`./${pkgName}/modern`] = `./${pkgName}/modern/index.js`;
                exports[`./${pkgName}/esm`] = `./${pkgName}/esm/index.js`;
                exports[`./${pkgName}/cssm`] = `./${pkgName}/cssm/index.js`;
            }

            if (hasEntry) {
                exports[`./${pkgName}${entry === 'index' ? '' : `/${entry}`}`] = {
                    import: `./${pkgName}/esm/${entry}.js`,
                    require: `./${pkgName}/${entry}.js`,
                };
            }
        });

        exports[`./${pkgName}/modern/*`] = `./${pkgName}/modern/*`;
        exports[`./${pkgName}/esm/*`] = `./${pkgName}/esm/*`;
        exports[`./${pkgName}/cssm/*`] = `./${pkgName}/cssm/*`;
    }

    const packageJson = require('../dist/package.json');
    packageJson.exports = exports;

    fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 4));
}

fillExportsField();
