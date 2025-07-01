import * as esbuild from 'esbuild';
import fse from 'fs-extra';
import { globby } from 'globby';
import path from 'node:path';
import * as process from 'node:process';

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

async function main() {
    const entryPoints = await globby([`src/{${ENTRY_POINTS.join(',')}}/index.ts`, 'src/index.ts']);

    const result = await esbuild.build({
        entryPoints,
        bundle: true,
        write: false,
        legalComments: 'none',
        outdir: process.cwd(),
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

    const sizes = Object.fromEntries(
        Object.entries(result.metafile.outputs).map(([file, { bytes }]) => [
            path.relative(process.cwd(), file),
            Number((bytes / 1024).toFixed(1)),
        ]),
    );

    await fse.writeJson('package-size.json', sizes, { spaces: 4, encoding: 'utf8' });
}

await main();
