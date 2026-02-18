#!/usr/bin/env node

import path from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));

    const exitCodes = (
        await Promise.all([
            $(
                'yarn',
                [
                    'workspaces',
                    'foreach',
                    '-Ap',
                    ...IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
                    'exec',
                    'node',
                    path.join(dirname, 'lint-package-deps.mjs'),
                ],
                { preferLocal: true, stdio: 'inherit', reject: false },
            ),
            $(
                'yarn',
                [
                    'workspaces',
                    'foreach',
                    '-Ap',
                    'exec',
                    'node',
                    path.join(dirname, 'lint-versions.mjs'),
                ],
                { preferLocal: true, stdio: 'inherit', reject: false },
            ),
        ])
    ).map(({ exitCode }) => exitCode);

    if (exitCodes.some((exitCode) => exitCode !== 0)) {
        process.exit(1);
    }
}

await main();
