import path from 'node:path';
import { argv, cwd, env } from 'node:process';
import { fileURLToPath } from 'node:url';
import { hideBin } from 'yargs/helpers';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {string[]} args
 */
async function main(args) {
    const CSS_PACKAGES = await readPackagesFile(path.join(cwd(), 'tools/.css-packages'));
    const THEME_PACKAGES = await readPackagesFile(path.join(cwd(), 'tools/.theme-packages'));

    await $('yarn', ['clean']);

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

    await $('lerna', [
        'exec',
        '--scope',
        '@alfalab/core-components',
        '--',
        'node',
        path.resolve(cwd(), 'bin/build-root.mjs'),
        'generate',
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
        'tsc',
        '-b',
        'tsconfig.build.json',
    ]);

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
    ]);

    await $('lerna', [
        'exec',
        ...THEME_PACKAGES.flatMap((pkg) => ['--scope', pkg]),
        '--',
        'node',
        path.resolve(cwd(), 'bin/build-theme.mjs'),
    ]);

    await $('lerna', [
        'exec',
        '--scope',
        '@alfalab/core-components',
        '--',
        'node',
        path.resolve(cwd(), 'bin/build-root.mjs'),
        'link',
    ]);
}

await main(hideBin(argv));
