import path from 'node:path';
import { cwd, env } from 'node:process';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const BUILD_MODERN_ONLY = env.BUILD_MODERN_ONLY ?? 'true';

    await $('yarn', ['build'], {
        env: { ...env, BUILD_MODERN_ONLY },
        preferLocal: true,
        stdio: 'inherit',
    });

    await $('lerna', [
        'exec',
        '--',
        'node',
        path.join(dirname, 'copy-package-preview.mjs'),
        '--to',
        path.resolve(cwd(), '.storybook/public/images'),
    ]);

    const BUILD_IGNORED_PACKAGES = await readPackagesFile(
        path.resolve(cwd(), 'tools/.build-ignored-packages'),
    );

    $('lerna', [
        'exec',
        ...BUILD_IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
        '--',
        'node',
        path.join(dirname, 'copy-package-dist.mjs'),
        '--to',
        path.resolve(cwd(), 'dist'),
    ]);

    const BUILD_STORYBOOK_FROM_DIST = env.BUILD_STORYBOOK_FROM_DIST ?? 'true';

    $('storybook', ['build', '-o', 'build', '--quiet'], {
        env: { ...env, BUILD_STORYBOOK_FROM_DIST },
        preferLocal: true,
        stdio: 'inherit',
    });
}

await main();
