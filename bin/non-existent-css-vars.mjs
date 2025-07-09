/* eslint-disable no-cond-assign */
import { globby } from 'globby';
import fs from 'node:fs/promises';
import * as process from 'node:process';

async function main() {
    const files = await globby('dist/**/*.css', { absolute: true });

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
