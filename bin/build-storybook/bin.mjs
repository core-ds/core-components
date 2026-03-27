import path from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const BUILD_MODERN_ONLY = process.env.BUILD_MODERN_ONLY ?? 'true';
    const BUILD_STORYBOOK_FROM_DIST = process.env.BUILD_STORYBOOK_FROM_DIST ?? 'true';

    const COPY_PREVIEW_IGNORED_PACKAGES = await readPackagesFile(
        path.resolve(dirname, '.copy-preview-ignored-packages'),
    );

    await $('yarn', ['build'], {
        env: { ...process.env, BUILD_MODERN_ONLY },
        preferLocal: true,
        stdio: 'inherit',
    });

    await $('yarn', [
        'workspaces',
        'foreach',
        '-Ap',
        ...COPY_PREVIEW_IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
        'exec',
        'node',
        path.join(dirname, 'copy-package-preview.mjs'),
        '--to',
        path.resolve(process.cwd(), '.storybook/public/images'),
    ]);

    await $('storybook', ['build', '-o', 'build', '--quiet'], {
        env: { ...process.env, BUILD_STORYBOOK_FROM_DIST },
        preferLocal: true,
        stdio: 'inherit',
    });
}

await main();
