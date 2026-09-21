#!/usr/bin/env node

import path from 'node:path';

import { $ } from '../../tools/execa.mjs';
import { NON_EXISTENT_CSS_VARS_IGNORED_PACKAGES } from '../../tools/non-existent-css-vars.mjs';

async function main() {
    const result = await $(
        'yarn',
        [
            'workspaces',
            'foreach',
            '-Ap',
            ...NON_EXISTENT_CSS_VARS_IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
            '--',
            'node',
            path.join(process.cwd(), 'bin/non-existent-css-vars.mjs'),
            'src/**/*.css',
        ],
        { preferLocal: true, stdio: 'inherit', reject: false },
    );

    process.exit(result.exitCode);
}

await main();
