#!/usr/bin/env node

import path from 'node:path';
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));

    const result = await $(
        'lerna',
        [
            'exec',
            '--no-bail',
            '--stream',
            ...IGNORED_PACKAGES.flatMap((pkg) => ['--ignore', pkg]),
            '--',
            'node',
            path.join(dirname, 'lint-package-deps.mjs'),
        ],
        { preferLocal: true, stdio: 'inherit', reject: false },
    );

    exit(result.exitCode);
}

await main();
