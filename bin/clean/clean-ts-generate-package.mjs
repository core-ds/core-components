import { glob } from 'tinyglobby';

import { $ } from '../../tools/execa.mjs';

async function main() {
    const files = await glob(['src/*.ts', 'src/**/*.ts'], {
        ignore: ['src/*.test.ts', 'src/**/*.test.ts'],
    });

    if (files.length === 0) {
        return;
    }

    await $('rimraf', files);
}

await main();
