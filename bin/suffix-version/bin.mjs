#!/usr/bin/env node

import path from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const CORE_COMPONENTS_VARIANT = process.env.CORE_COMPONENTS_VARIANT || 'default';

    if (CORE_COMPONENTS_VARIANT === 'default') {
        return;
    }

    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));

    await $('lerna', [
        'exec',
        '--stream',
        ...IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
        '--',
        'node',
        path.join(dirname, 'suffix-version.mjs'),
        CORE_COMPONENTS_VARIANT,
    ]);
}

await main();
