const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const camelCase = require('lodash/camelcase');
const upperfirst = require('lodash/upperfirst');
const findComponentPath = require('../tools/storybook/findComponentPath');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const excludedPackages = [
    'codemod',
    'screenshot-utils',
    'themes',
    'utils',
    'vars',
    'global-store',
    'types',
];

const isComponent = (dir) => !excludedPackages.includes(dir) && !dir.includes('.');

const packagesDir = path.join(process.cwd(), 'packages');
const buildDir = path.join(process.cwd(), process.env.STORYBOOK_BUILD_DIR || 'build');

async function main() {
    const packagesNames = (await readDir(packagesDir)).filter(isComponent);

    const packagesInfos = await Promise.all(
        packagesNames.map((packageName) =>
            readFile(path.join(packagesDir, packageName, 'package.json'), 'utf-8').then((str) =>
                JSON.parse(str),
            ),
        ),
    );

    const components = packagesInfos
        .map((packageInfo) => {
            const packageName = packageInfo.name.replace('@alfalab/core-components-', '');
            const componentName = upperfirst(camelCase(packageName));
            const cPath = findComponentPath(componentName, packageName);

            if (cPath.url) {
                const groupSegments = cPath.group?.split('/') || [];
                const group =
                    groupSegments.length > 1 ? groupSegments.slice(1).join('/') : undefined;

                return {
                    group,
                    name: componentName,
                    docsUrl: `/iframe.html?id=${cPath.url}--${packageName}&viewMode=docs`,
                };
            }

            return null;
        })
        .filter(Boolean);

    const json = {
        components,
        breakPoints: {
            group: 'Instructions',
            name: 'Брейкпоинты',
            docsUrl: '/iframe.html?viewMode=docs&id=instructions-breakpoints--docs',
        },
        gaps: {
            group: 'Guidelines',
            name: 'Отступы',
            docsUrl: '/iframe.html?viewMode=docs&id=guidelines-gaps--docs',
        },
        cssVars: {
            group: 'Guidelines',
            name: 'CSS-переменные',
            docsUrl: '/iframe.html?viewMode=docs&id=guidelines-css-vars--docs',
        },
    };

    await writeFile(path.join(buildDir, 'docs-urls.json'), JSON.stringify(json));
}

main()
    .then(() => {
        console.log('DONE');
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
