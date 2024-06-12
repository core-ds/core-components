const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const varsVersion = require('../packages/vars/package.json').version;
const themesVersion = require('../packages/themes/package.json').version;

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

async function run() {
    let result = null;

    while (packageList.length > 0) {
        const pkgName = packageList.pop();
        const pkg = require(`../packages/${pkgName}/package.json`);
        pkg['themesVersion'] = themesVersion;
        pkg['varsVersion'] = varsVersion;

        await fs.promises.writeFile(
            path.resolve(__dirname, `../packages/${pkgName}/package.json`),
            JSON.stringify(pkg, null, 4) + '\n',
            { encoding: 'utf-8' },
        );
    }

    return result;
}

run()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
