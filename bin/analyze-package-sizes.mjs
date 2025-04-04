import * as esbuild from 'esbuild';
import globby from 'globby';
import shell from 'shelljs';
import fs from 'node:fs/promises';
import path from 'node:path';

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

const packages = JSON.parse(
    shell.exec(
        `lerna list \\
        --ignore @balafla/core-components \\
        --ignore @balafla/core-components-codemod \\
        --ignore @balafla/core-components-themes \\
        --ignore @balafla/core-components-vars \\
        --json
        --all`,
        { silent: true },
    ).stdout,
);

const packageSizes = Object.fromEntries(
    await Promise.all(
        packages.map(async ({ name, location }) => [name, await calculateBundleSize(location)]),
    ),
);

await fs.writeFile('package-sizes.json', JSON.stringify(packageSizes), { encoding: 'utf8' });
