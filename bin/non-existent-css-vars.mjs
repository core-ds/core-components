import * as fs from 'node:fs/promises';
import globby from 'globby';
import path from 'node:path';
import shell from 'shelljs';
import * as process from 'node:process';

const IGNORED_PACKAGES = [
    '@balafla/core-components-bank-card',
    '@balafla/core-components-themes',
    '@balafla/core-components-vars',
];

const packages = JSON.parse(
    shell.exec(
        `lerna list ${IGNORED_PACKAGES.map((name) => ['--ignore', name])
            .reduce((a, b) => a.concat(b))
            .join(' ')} --json --all`,
        { silent: true },
    ).stdout,
);

const files = await globby(
    packages
        .map(({ location }) => location.replace(`${process.cwd()}/`, ''))
        .map((relativeLocation) => path.join(relativeLocation, 'dist/**/*.css')),
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

if (nonExistentVarsEntries.length > 0) {
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
