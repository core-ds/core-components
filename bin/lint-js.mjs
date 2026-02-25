#!/usr/bin/env node

import path from 'node:path';
import * as process from 'node:process';

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
                'yarn',
                [
                    'workspaces',
                    'foreach',
                    '-Ap',
                    ...ESLINT_IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
                    'exec',
                    'eslint',
                    'src',
                    '--ext',
                    '.js,.jsx,.ts,.tsx,.mjs,.mts,.cjs,.cts',
                    '--max-warnings',
                    '0',
                    '--config',
                    path.resolve(process.cwd(), '.eslintrc.cjs'),
                ],
                {
                    preferLocal: true,
                    stdio: 'inherit',
                    reject: false,
                },
            ),
        ])
    ).map(({ exitCode }) => exitCode);

    if (exitCodes.every((exitCode) => exitCode !== 0)) {
        process.exit(1);
    }
}

await main();
