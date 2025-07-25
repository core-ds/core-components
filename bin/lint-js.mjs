#!/usr/bin/env node

import path from 'node:path';
import { cwd, exit } from 'node:process';

import { $ } from '../tools/execa.mjs';
import { readPackagesFile } from '../tools/read-packages-file.cjs';

async function main() {
    const ESLINT_IGNORED_PACKAGES = await readPackagesFile(
        path.resolve(cwd(), 'tools/.eslint-ignored-packages'),
    );

    const exitCodes = (
        await Promise.all([
            $('eslint', ['bin', 'tools', '--ext', '.cjs,.mjs,.js', '--max-warnings', '0'], {
                preferLocal: true,
                stdio: 'inherit',
                reject: false,
            }),
            $(
                'lerna',
                [
                    'exec',
                    '--no-bail',
                    '--stream',
                    ...ESLINT_IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
                    '--',
                    'eslint',
                    'src',
                    '--ext',
                    '.ts,.tsx,.js,.jsx',
                    '--max-warnings',
                    '0',
                    '--config',
                    path.resolve(cwd(), '.eslintrc.cjs'),
                ],
                {
                    preferLocal: true,
                    stdio: 'inherit',
                    reject: false,
                },
            ),
        ])
    ).map(({ exitCode }) => exitCode);

    if (exitCodes.every((exitCode) => exitCode === 0)) {
        return;
    }

    exit(1);
}

await main();
