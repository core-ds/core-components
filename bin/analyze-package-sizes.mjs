import * as esbuild from 'esbuild';
import globby from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';
import * as process from 'node:process';
import { getPackages } from '@manypkg/get-packages';

const IGNORED_PACKAGES = [
    '@alfalab/core-components',
    '@alfalab/core-components-codemod',
    '@alfalab/core-components-env',
    '@alfalab/core-components-screenshot-utils',
    '@alfalab/core-components-test-utils',
    '@alfalab/core-components-themes',
    '@alfalab/core-components-vars',
];

const ENTRY_POINTS = [
    'desktop',
    'mobile',
    'responsive',
    'circle',
    'super-ellipse',
    'rectangle',
    'no-shape',
    'shared',
    'collapsible',
];

async function calculateBundleSize(location) {
    const entryPoints = await globby([
        path.join(location, `src/{${ENTRY_POINTS.join(',')}}/index.ts`),
        path.join(location, 'src/index.ts'),
    ]);

    const result = await esbuild.build({
        entryPoints,
        bundle: true,
        write: false,
        legalComments: 'none',
        outdir: location,
        minify: true,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        sourcemap: false,
        treeShaking: true,
        target: 'esnext',
        format: 'esm',
        external: ['react', 'react-dom', '*.css'],
        metafile: true,
    });

    const entries = Object.entries(result.metafile.outputs).map(([file, { bytes }]) => [
        path.relative(location, file),
        Number((bytes / 1024).toFixed(1)),
    ]);

    return Object.fromEntries(entries);
}

async function main() {
    const packages = (await getPackages(process.cwd())).packages.filter(
        ({ packageJson: { name } }) => !IGNORED_PACKAGES.includes(name),
    );

    const packageSizes = Object.fromEntries(
        await Promise.all(
            packages.map(async ({ dir, packageJson: { name } }) => [
                name,
                await calculateBundleSize(dir),
            ]),
        ),
    );

    await fs.writeFile('package-sizes.json', JSON.stringify(packageSizes), { encoding: 'utf8' });
}

await main();
