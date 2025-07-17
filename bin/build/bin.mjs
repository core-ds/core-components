import path from 'node:path';
import { argv, cwd, env } from 'node:process';
import { fileURLToPath } from 'node:url';
import { hideBin } from 'yargs/helpers';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 *
 * @param {string[]} args
 */
async function main(args) {
    await $('yarn', ['clean']);

    const CSS_PACKAGES = await readPackagesFile(path.join(dirname, '.css-packages'));

    await $('lerna', [
        'exec',
        ...CSS_PACKAGES.flatMap((pkg) => ['--scope', pkg]),
        '--',
        'node',
        path.join(dirname, 'copy-css-files.mjs'),
        '--to',
        'dist',
    ]);

    await Promise.all([
        $('lerna', [
            'exec',
            '--scope',
            '@alfalab/core-components-themes',
            '--',
            'node',
            path.resolve(cwd(), 'bin/build-themes.mjs'),
        ]),
        $('lerna', [
            'exec',
            '--scope',
            '@alfalab/core-components-vars',
            '--',
            'node',
            path.resolve(cwd(), 'bin/build-vars.mjs'),
        ]),
    ]);

    const BUILD_IGNORED_PACKAGES = await readPackagesFile(
        path.resolve(cwd(), 'tools/.build-ignored-packages'),
    );

    await $('lerna', [
        'exec',
        '--concurrency',
        env.BUILD_CONCURRENCY ?? '10',
        ...BUILD_IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
        ...args,
        '--',
        'rollup',
        '-c',
        path.resolve(cwd(), 'tools/rollup/rollup.config.mjs'),
        '--silent',
    ]);

    const PURGECSS_IGNORED_PACKAGES = await readPackagesFile(
        path.join(dirname, '.purgecss-ignored-packages'),
    );

    await $('lerna', [
        'exec',
        '--stream',
        ...PURGECSS_IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
        '--',
        'node',
        path.resolve(cwd(), 'bin/purgecss.mjs'),
    ]);
}

await main(hideBin(argv));
