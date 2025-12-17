#!/usr/bin/env node

import path from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';
import { hideBin } from 'yargs/helpers';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {string[]} args
 */
async function main([suffix]) {
    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));

    await $('lerna', [
        'exec',
        '--stream',
        ...IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
        '--',
        'node',
        path.join(dirname, 'suffix-version.mjs'),
        suffix,
    ]);
}

await main(hideBin(argv));
