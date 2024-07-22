import * as esbuild from 'esbuild';
import globby from 'globby';
import shell from 'shelljs';
import fs from 'node:fs';

const packages = shell.exec(
    `lerna list \\
        --ignore @alfalab/core-components-codemod \\
        --ignore @alfalab/core-components-vars \\
        --ignore @alfalab/core-components-themes \\
        --ignore @loadable/component \\
        --all`,
    { silent: true },
).stdout;

const packageList = packages
    .split('\n')
    .map((pkg) => pkg.trim())
    .filter(Boolean)
    .map((pkg) => pkg.replace('@alfalab/core-components-', ''));

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

async function calculateBundleSize(packageName) {
    const entryPoints = await globby([
        `./packages/${packageName}/src/{${ENTRY_POINTS.join(',')}}/index.ts`,
        `./packages/${packageName}/src/index.ts`,
    ]);

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

    const bundleSizeMap = Object.keys(result.metafile.outputs).reduce((acc, path) => {
        const pathParts = path.split('/');
        const entry =
            pathParts.slice(-2)[0] === packageName
                ? pathParts.slice(-1)[0]
                : pathParts.slice(-2)[0];

        acc[entry.endsWith('.js') ? entry : entry + '.js'] = +(
            result.metafile.outputs[path].bytes / 1024
        ).toFixed(1);

        return acc;
    }, {});

    // Сортируем ключи по алфавиту, иначе выводятся в случайном порядке
    return Object.keys(bundleSizeMap)
        .sort()
        .reduce((obj, key) => {
            obj[key] = bundleSizeMap[key];
            return obj;
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
