import path from 'node:path';
import { argv, cwd } from 'node:process';
import { hideBin } from 'yargs/helpers';

import { $ } from '../tools/execa.mjs';

/**
 *
 * @param {string[]} args
 */
async function main(args) {
    await $('yarn', ['clean']);

    await $('lerna', [
        'exec',
        '--scope',
        '@alfalab/core-components-vars',
        '--',
        'node',
        path.resolve(cwd(), 'bin/build-vars.mjs'),
    ]);

    await $('jest', ['--watchAll=false', ...args]);
}

await main(hideBin(argv));
