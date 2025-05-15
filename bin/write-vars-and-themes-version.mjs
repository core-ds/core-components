import fs from 'node:fs/promises';
import path from 'node:path';
import detectIndent from 'detect-indent';
import * as process from 'node:process';
import { getPackages } from '@manypkg/get-packages';

const IGNORED_PACKAGES = [
    '@alfalab/core-components',
    '@alfalab/core-components-codemod',
    '@alfalab/core-components-env',
    '@alfalab/core-components-config',
    '@alfalab/core-components-screenshot-utils',
    '@alfalab/core-components-stack-context',
    '@alfalab/core-components-test-utils',
    '@alfalab/core-components-themes',
    '@alfalab/core-components-types',
    '@alfalab/core-components-vars',
];

async function main() {
    async function getPackage(name) {
        return (await getPackages(process.cwd())).packages.find(
            ({ packageJson }) => packageJson.name === name,
        );
    }

    const packages = (await getPackages(process.cwd())).packages.filter(
        ({ packageJson: { name } }) => !IGNORED_PACKAGES.includes(name),
    );

    const themes = await getPackage('@alfalab/core-components-themes');
    const vars = await getPackage('@alfalab/core-components-vars');

    for (const { packageJson, dir } of packages) {
        const { name, version } = packageJson;
        console.log(`=> Processing ${name}@${version}`);

        const packageJsonLocation = path.join(dir, 'package.json');
        const { indent } = detectIndent(
            await fs.readFile(packageJsonLocation, { encoding: 'utf8' }),
        );
        const pkg = JSON.parse(JSON.stringify(packageJson));

        pkg.themesVersion = themes.packageJson.version;
        pkg.varsVersion = vars.packageJson.version;

        await fs.writeFile(packageJsonLocation, `${JSON.stringify(pkg, null, indent)}\n`, {
            encoding: 'utf8',
        });

        console.log(`=> Done\n`);
    }
}

await main();
