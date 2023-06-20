import * as esbuild from 'esbuild';
import globby from 'globby';
import shell from 'shelljs';
import fs from 'node:fs';
import { ENTRY_POINTS } from '../entry-points.mjs';

const packages = shell.exec(
    `lerna list \\
        --ignore @alfalab/core-components-codemod \\
        --ignore @alfalab/core-components-vars \\
        --ignore @alfalab/core-components-themes \\
        --all`,
    { silent: true },
).stdout;

const packageList = packages
    .split('\n')
    .map((pkg) => pkg.trim())
    .filter(Boolean)
    .map((pkg) => pkg.replace('@alfalab/core-components-', ''));

async function calculateBundleSize(packageName) {
    const entryPoints = await globby(
        `./packages/${packageName}/src/{${ENTRY_POINTS.join(',')}}.ts`,
    );

    const result = await esbuild.build({
        entryPoints,
        bundle: true,
        write: false,
        legalComments: 'none',
        outdir: `packages/${packageName}`,
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

    // Debug, показывает размер всех зависимостей пакета
    // if (packageName === 'date-range-input') {
    //     console.log(await esbuild.analyzeMetafile(result.metafile));
    // }

    return Object.keys(result.metafile.outputs).reduce((acc, path) => {
        acc[path.split('/').pop()] = +(result.metafile.outputs[path].bytes / 1024).toFixed(2);

        return acc;
    }, {});
}

async function run() {
    const bundleSizeMap = {};
    while (packageList.length > 0) {
        const pkgName = packageList.pop();

        bundleSizeMap[pkgName] = await calculateBundleSize(pkgName);
    }

    await fs.promises.writeFile(
        './.storybook/package-sizes.json',
        JSON.stringify(bundleSizeMap, null, 4),
    );
}

run()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
