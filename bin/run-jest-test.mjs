import path from 'node:path';
import { argv, cwd } from 'node:process';
import { hideBin } from 'yargs/helpers';

import { $ } from '../tools/execa.mjs';

async function main() {
    await $('yarn', ['clean']);

    await $('lerna', [
        'exec',
        '--scope',
        '@alfalab/core-components-vars',
        '--',
        'node',
        path.resolve(cwd(), 'bin/build-vars.mjs'),
    ]);

    await $('jest', ['--watchAll=false']);
}

await main(hideBin(argv));
