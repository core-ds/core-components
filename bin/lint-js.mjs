#!/usr/bin/env node

import path from 'node:path';
import { cwd, exit } from 'node:process';

import { ESLINT_IGNORED_PACKAGES } from '../tools/eslint.cjs';
import { $ } from '../tools/execa.mjs';

async function main() {
    const exitCodes = (
        await Promise.all([
            $(
                'eslint',
                [
                    'bin',
                    'tools',
                    '--ext',
                    '.js,.jsx,.ts,.tsx,.mjs,.mts,.cjs,.cts',
                    '--max-warnings',
                    '0',
                ],
                {
                    preferLocal: true,
                    stdio: 'inherit',
                    reject: false,
                },
            ),
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
                    '.js,.jsx,.ts,.tsx,.mjs,.mts,.cjs,.cts',
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
