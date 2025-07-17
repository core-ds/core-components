#!/usr/bin/env node

import { $ } from 'execa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const TS_GENERATE_PACKAGES = await readPackagesFile(
        path.join(dirname, '.ts-generate-packages'),
    );

    await Promise.all([
        $('rimraf', [
            'dist',
            'build',
            'coverage',
            'package-sizes.json',
            '.storybook/public/images/*-preview-snap.png',
        ]),
        $('lerna', [
            'exec',
            '--',
            'rimraf',
            '*.tsbuildinfo',
            'dist',
            '.rollup.cache',
            '**/__diff_output__',
            'package-size.json',
        ]),
        $('lerna', [
            'exec',
            ...TS_GENERATE_PACKAGES.flatMap((pkg) => ['--scope', pkg]),
            '--',
            'rimraf',
            'src/*.ts',
        ]),
    ]);
}

await main();
