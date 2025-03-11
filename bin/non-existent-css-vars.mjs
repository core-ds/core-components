import fs from 'node:fs/promises';
import globby from 'globby';
import path from 'node:path';
import * as process from 'node:process';
import { getPackages } from '@manypkg/get-packages';

const IGNORED_PACKAGES = [
    '@alfalab/core-components-bank-card',
    '@alfalab/core-components-screenshot-utils',
    '@alfalab/core-components-test-utils',
    '@alfalab/core-components-themes',
    '@alfalab/core-components-vars',
];

async function main() {
    const packages = (await getPackages(process.cwd())).packages.filter(
        ({ packageJson: { name } }) => !IGNORED_PACKAGES.includes(name),
    );

    const files = await globby(
        packages.map(({ relativeDir }) => path.join(relativeDir, 'dist/**/*.css')),
    );

    const nonExistentVarsEntries = (
        await Promise.all(
            files.map(async (file) => {
                const content = await fs.readFile(file, { encoding: 'utf8' });
                const re = /(?<=var\().+?(?=\))/g;
                let match = null;
                const result = [];

                while ((match = re.exec(content)) != null) {
                    result.push(match[0]);
                }

                return [file, result];
            }),
        )
    ).filter(([, vars]) => vars.length > 0);

    if (nonExistentVarsEntries.length === 0) {
        return;
    }

    console.log(
        [
            'Found non-existent css vars:',
            ...nonExistentVarsEntries.map(([file, vars]) =>
                [
                    ' '.repeat(4).concat(file),
                    ...vars.map((varName) => ' '.repeat(8).concat(varName)),
                ].join('\n'),
            ),
        ].join('\n\n'),
    );

    process.exit(-1);
}

await main();
