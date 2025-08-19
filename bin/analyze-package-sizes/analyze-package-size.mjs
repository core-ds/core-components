import { build } from 'esbuild';
import fse from 'fs-extra';
import { globby } from 'globby';
import { EOL } from 'node:os';
import { cwd, stdout } from 'node:process';

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

const EXTENTIONS = ['js', 'jsx', 'ts', 'tsx'];

async function main() {
    const pkg = await fse.readJson('package.json', { encoding: 'utf8' });
    const entryPoints = await globby([
        `src/index.{${EXTENTIONS.join(',')}}`,
        `src/{${ENTRY_POINTS.join(',')}}/index.{${EXTENTIONS.join(',')}}`,
    ]);
    const result = await build({
        entryPoints,
        bundle: true,
        write: false,
        legalComments: 'none',
        outdir: cwd(),
        minify: true,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        sourcemap: false,
        treeShaking: true,
        target: 'esnext',
        format: 'esm',
        external: [...Object.keys(pkg.peerDependencies ?? {}), '*.css'],
        metafile: true,
    });
    const sizes = Object.fromEntries(
        Object.entries(result.metafile.outputs).map(([file, { bytes }]) => [
            file,
            Number((bytes / 1024).toFixed(1)),
        ]),
    );

    stdout.write(`${JSON.stringify(sizes, null, 4)}${EOL}`);
}

await main();
