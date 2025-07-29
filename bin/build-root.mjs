/* eslint-disable @typescript-eslint/no-shadow */
import dedent from 'dedent';
import { globby } from 'globby';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { argv } from 'node:process';
import slash from 'slash';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { isCssModulesAvailable } from '../tools/css-modules.cjs';
import { getPackages } from '../tools/monorepo.cjs';
import { isInternal } from '../tools/resolve-internal.cjs';

const ENTRY_POINTS = [
    'desktop',
    'mobile',
    'responsive',
    'shared',
    'utils',
    'typings',
    // icon-view
    'circle',
    'super-ellipse',
    'rectangle',
    'no-shape',
    // tabs
    'collapsible',
];

const EXTENTIONS = ['js', 'jsx', 'ts', 'tsx'];

const BUILDS = ['es5', 'modern', 'esm', 'cssm', 'moderncssm'];

const NO_CSS_MODULES_BUILDS = ['es5', 'modern', 'esm'];

yargs(hideBin(argv))
    .command(
        'generate',
        'Generate source',
        (yargs) => yargs,
        async () => {
            const { packages } = getPackages();
            const root = packages.find(
                ({ packageJson: { name } }) => name === '@alfalab/core-components',
            );
            const dependencies = Object.keys(root.packageJson.dependencies);

            for (const {
                dir,
                packageJson: { name },
            } of packages) {
                if (dependencies.includes(name)) {
                    const entryPoints = await handlePackage(name, dir);

                    await Promise.all(
                        entryPoints.map(async ([entryPoint, content]) => {
                            const rootEntryPoint = path.join(root.dir, entryPoint);

                            await fs.mkdir(path.dirname(rootEntryPoint), { recursive: true });

                            return fs.writeFile(rootEntryPoint, content, { encoding: 'utf8' });
                        }),
                    );
                }
            }
        },
    )
    .command(
        'link',
        'Link dist',
        (yargs) => yargs,
        async () => {
            const { packages } = getPackages();
            const root = packages.find(
                ({ packageJson: { name } }) => name === '@alfalab/core-components',
            );
            const dependencies = Object.keys(root.packageJson.dependencies).filter((pkg) =>
                isInternal(pkg),
            );

            for (const pkg of dependencies) {
                for (const build of isCssModulesAvailable(pkg) ? BUILDS : NO_CSS_MODULES_BUILDS) {
                    const source = path.join(root.dir, 'dist', build, pkgToEntryPoint(pkg));

                    if (existsSync(source)) {
                        const destination = path.join(
                            root.dir,
                            'dist',
                            pkgToEntryPoint(pkg),
                            build === 'es5' ? '' : build,
                        );

                        await fs.cp(source, destination, { recursive: true });
                    }
                }
            }

            for (const build of BUILDS) {
                await fs.rm(path.join(root.dir, 'dist', build), { recursive: true, force: true });
            }
        },
    )
    .demandCommand()
    .strict()
    .help()
    .parse();

async function handlePackage(name, dir) {
    const files = await globby(
        name === '@alfalab/core-components-themes' || name === '@alfalab/core-components-vars'
            ? ['src/*.ts', 'dist/*.css', 'dist/**/*.css']
            : [
                  `src/index.{${EXTENTIONS.join(',')}}`,
                  `src/{${ENTRY_POINTS.join(',')}}.{${EXTENTIONS.join(',')}}`,
                  `src/{${ENTRY_POINTS.join(',')}}/index.{${EXTENTIONS.join(',')}}`,
              ],
        { cwd: dir },
    );

    return (
        await Promise.all(
            files.map(async (file) => {
                if (
                    (name === '@alfalab/core-components-themes' ||
                        name === '@alfalab/core-components-vars') &&
                    /\.css$/.test(file)
                ) {
                    return [
                        path.join('dist', pkgToEntryPoint(name), file.replace('dist', '')),
                        `@import '${slash(file).replace('dist', name)}';`,
                    ];
                }

                const content = await fs.readFile(path.join(dir, file), { encoding: 'utf8' });
                const pkgEntryPoint = slash(file)
                    .replace('src', name)
                    .replace(new RegExp(`(\\/index)?\\.(${EXTENTIONS.join('|')})$`), '');
                const rootEntryPoint = path.join(
                    'src',
                    pkgToEntryPoint(name),
                    file.replace('src', ''),
                );

                return [rootEntryPoint, tsGenerate(content, pkgEntryPoint)];
            }),
        )
    ).filter(([, content]) => content.length > 0);
}

/**
 * @param {string} content
 */
function tsGenerate(content, entryPoint) {
    return dedent`
        ${/^export\s+(?!default)/gm.test(content) ? `export * from '${entryPoint}';` : ''}
        ${/^export\s+default/gm.test(content) ? `export { default } from '${entryPoint}';` : ''}
    `;
}

/**
 *
 * @param {string} pkg
 */
function pkgToEntryPoint(pkg) {
    return pkg.replace(/^@alfalab\/core-components-/, '');
}
