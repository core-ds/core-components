#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));

    await $('yarn', [
        'workspaces',
        'foreach',
        '-Ap',
        ...IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
        'exec',
        'node',
        path.join(dirname, 'write-vars-and-themes-version.mjs'),
    ]);
}

await main();
