import path from 'node:path';
import { argv, cwd } from 'node:process';
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

    const CSS_PACKAGES = await readPackagesFile(path.join(cwd(), 'tools/.css-packages'));

    await $('yarn', [
        'workspaces',
        'foreach',
        '-A',
        ...CSS_PACKAGES.flatMap((pkg) => ['--include', pkg]),
        'exec',
        'node',
        path.join(dirname, 'copy-css-files.mjs'),
        '--to',
        'dist',
    ]);

    await Promise.all(
        CSS_PACKAGES.map((pkg) =>
            $('yarn', [
                'workspace',
                pkg,
                'exec',
                'node',
                path.resolve(
                    cwd(),
                    `bin/build-${pkg.replace('@alfalab/core-components-', '')}.mjs`,
                ),
            ]),
        ),
    );

    await $('yarn', [
        'workspace',
        '@alfalab/core-components',
        'exec',
        'node',
        path.resolve(cwd(), 'bin/build-root.mjs'),
        'generate',
    ]);

    const BUILD_IGNORED_PACKAGES = await readPackagesFile(
        path.resolve(cwd(), 'tools/.build-ignored-packages'),
    );

    await $('yarn', [
        'workspaces',
        'foreach',
        '-Ap',
        ...BUILD_IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
        ...args,
        'exec',
        'tsc',
        '-b',
        'tsconfig.build.json',
    ]);

    await $('yarn', [
        'workspaces',
        'foreach',
        '-Ap',
        ...BUILD_IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
        ...args,
        'exec',
        'rollup',
        '-c',
        path.resolve(cwd(), 'tools/rollup/rollup.config.mjs'),
        '--silent',
    ]);

    await $('yarn', [
        'workspace',
        '@alfalab/core-components',
        'exec',
        'node',
        path.resolve(cwd(), 'bin/build-root.mjs'),
        'link',
    ]);
}

await main(hideBin(argv));
