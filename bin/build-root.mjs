/* eslint-disable @typescript-eslint/no-shadow */
import dedent from 'dedent';
import fse from 'fs-extra';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import slash from 'slash';
import { glob } from 'tinyglobby';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { getPackages } from '../tools/monorepo.cjs';
import { readPackagesFile } from '../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const EXTENTIONS = ['ts', 'tsx', 'json'];
const BUILDS = ['es5', 'modern', 'esm', 'cssm', 'moderncssm'];
const CSS_PACKAGES = await readPackagesFile(path.join(dirname, '../tools/.css-packages'));

yargs(hideBin(argv))
    .command(
        'generate',
        'Generate source',
        (yargs) => yargs,
        async () => {
            const pkg = await fse.readJson('package.json', { encoding: 'utf8' });
            const dependencies = Object.keys(pkg.dependencies);
            const { packages } = getPackages();

            for (const {
                dir,
                packageJson: { name },
            } of packages) {
                if (dependencies.includes(name)) {
                    const entryPoints = await handlePackage(name, dir);

                    await Promise.all(
                        entryPoints.map(async ([entryPoint, content]) => {
                            const rootEntryPoint = path.join(cwd(), entryPoint);

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
            const dist = path.join(cwd(), 'dist');

            for (const build of BUILDS) {
                const buildDir = path.join(dist, build);
                const dirs = existsSync(buildDir)
                    ? await glob('*', { cwd: buildDir, onlyDirectories: true })
                    : [];

                for (const dir of dirs) {
                    const source = path.join(buildDir, dir);
                    const destination = path.join(
                        dist,
                        path.basename(dir),
                        build === 'es5' ? '' : build,
                    );

                    await fs.cp(source, destination, { recursive: true });
                }
            }

            await Promise.all(
                BUILDS.map((build) =>
                    fs.rm(path.join(dist, build), { recursive: true, force: true }),
                ),
            );
        },
    )
    .demandCommand()
    .strict()
    .help()
    .parse();

async function handlePackage(name, dir) {
    const files = await glob(
        [
            `src/*.{${EXTENTIONS.join(',')}}`,
            `src/**/*.{${EXTENTIONS.join(',')}}`,
            ...(CSS_PACKAGES.includes(name) ? ['dist/*.css', 'dist/**/*.css'] : []),
        ],
        {
            ignore: [`src/**/*.{test,stories}.{${EXTENTIONS.join(',')}}`, 'src/**/*.d.ts'],
            cwd: dir,
        },
    );

    return (
        await Promise.all(
            files.map(async (file) => {
                const [fileDir, ...restFilePath] = file.split(path.sep);
                const rootEntryPoint = path.join(fileDir, pkgToEntryPoint(name), ...restFilePath);
                const pkgEntryPoint = slash(file).replace(fileDir, name);

                if (/\.css$/.test(file)) {
                    return [rootEntryPoint, `@import '${pkgEntryPoint}';`];
                }

                if (/\.json$/.test(file)) {
                    return [`${rootEntryPoint}.ts`, `export { default } from '${pkgEntryPoint}';`];
                }

                const content = await fs.readFile(path.join(dir, file), { encoding: 'utf8' });

                return [
                    rootEntryPoint.replace(new RegExp(`(${EXTENTIONS.join('|')})$`), 'ts'),
                    tsGenerate(
                        content,
                        pkgEntryPoint.replace(
                            new RegExp(`(\\/index)?\\.(${EXTENTIONS.join('|')})$`),
                            '',
                        ),
                    ),
                ];
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
