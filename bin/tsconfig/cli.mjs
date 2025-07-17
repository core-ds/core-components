#!/usr/bin/env node

import fse from 'fs-extra';
import path from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { getPackages } from '../../tools/monorepo.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const storybookPath = path.join(process.cwd(), '.storybook');

const IGNORED_PACKAGES = ['@alfalab/core-components-codemod'];

const TEST_PACKAGES = [
    '@alfalab/core-components-screenshot-utils',
    '@alfalab/core-components-test-utils',
];

const DEV_PACKAGES = ['@alfalab/core-components-env'];

const packages = getPackages().packages.filter(
    ({ packageJson }) => !IGNORED_PACKAGES.includes(packageJson.name),
);

yargs(hideBin(process.argv))
    .command(
        'generate',
        'Generate tsconfig.json',
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (yargs) =>
            yargs
                .option('a', {
                    alias: 'all',
                    desc: 'Generate all tsconfig.json',
                    type: 'boolean',
                    default: false,
                })
                .option('s', {
                    alias: 'storybook',
                    desc: 'Generate tsconfig.json for Storybook',
                    type: 'boolean',
                })
                .option('t', {
                    alias: 'test',
                    desc: 'Generate tsconfig.json for tests',
                    type: 'boolean',
                })
                .option('p', {
                    alias: 'package',
                    desc: 'Generate tsconfig.json for specified package',
                    type: 'array',
                    string: true,
                    choices: packages.map(({ packageJson: { name } }) => name),
                }),
        async (args) => {
            if (args.s || args.a) {
                await fse.writeJson(
                    path.join(storybookPath, 'tsconfig.json'),
                    generateStorybookTsConfig(),
                    { spaces: 4, encoding: 'utf8' },
                );
            }
            if (args.t || args.a) {
                await fse.writeJson(
                    path.join(process.cwd(), 'tsconfig.test.json'),
                    generateTestsTsConfig(),
                    { spaces: 4, encoding: 'utf8' },
                );
            }

            const packagesToHandle = args.a
                ? packages
                : packages.filter(({ packageJson: { name } }) => args.p?.includes(name));

            await Promise.all(
                packagesToHandle.map((pkg) =>
                    fse.writeJson(
                        path.join(pkg.dir, 'tsconfig.json'),
                        generatePackageTsConfig(pkg),
                        { spaces: 4, encoding: 'utf8' },
                    ),
                ),
            );
        },
    )
    .command(
        'check',
        'Check tsconfig.json',
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (yargs) => yargs,
        async () => {
            const errors = [];

            const storybookTsConfig = await fse.readJson(
                path.join(storybookPath, 'tsconfig.json'),
                { encoding: 'utf8' },
            );

            if (!isDummyEqual(storybookTsConfig, generateStorybookTsConfig())) {
                errors.push('Please generate tsconfig.json via `yarn tsconfig generate -s`');
            }

            const testsTsConfig = await fse.readJson(
                path.join(process.cwd(), 'tsconfig.test.json'),
                { encoding: 'utf8' },
            );

            if (!isDummyEqual(testsTsConfig, generateTestsTsConfig())) {
                errors.push('Please generate tsconfig.json via `yarn tsconfig generate -t`');
            }

            const errorPackages = [];

            packages.forEach((pkg) => {
                const packageTsConfig = fse.readJsonSync(path.join(pkg.dir, 'tsconfig.json'), {
                    encoding: 'utf8',
                });

                if (!isDummyEqual(packageTsConfig, generatePackageTsConfig(pkg))) {
                    errorPackages.push(pkg.packageJson.name);
                }
            });

            if (errorPackages.length > 0) {
                const packagesList = errorPackages.join(' ');

                errors.push(
                    `Please generate packages tsconfig.json via \`yarn tsconfig generate -p ${packagesList}\``,
                );
            }

            if (errors.length === 0) {
                return;
            }

            console.error(errors.join('\n'));
            process.exit(1);
        },
    )
    .demandCommand()
    .help()
    .parse();

/**
 * @param {string} relativePath
 * @returns {string}
 */
function normalizePath(relativePath) {
    if (relativePath === '') {
        return '.';
    }

    return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * @param {Array<import('@manypkg/get-packages').Package>} forPackages
 * @param {string} [cwd]
 * @returns {Record<string, string[]>}
 */
function generatePaths(forPackages, cwd = process.cwd()) {
    return Object.fromEntries(
        forPackages
            .map(({ packageJson: { name }, dir }) => {
                const relativePackageLocation = normalizePath(path.relative(cwd, dir));

                return [
                    [name, [`${relativePackageLocation}/src`]],
                    [`${name}/*`, [`${relativePackageLocation}/src/*`]],
                ];
            })
            .reduce((a, b) => a.concat(b)),
    );
}

/**
 * @returns {Object}
 */
function generateStorybookTsConfig() {
    const storybookTsConfigTemplate = fse.readJsonSync(
        path.join(dirname, 'templates', 'tsconfig.storybook.json'),
        { encoding: 'utf8' },
    );

    const atomicPackages = packages.filter(
        ({ packageJson: { name } }) =>
            !(name === '@alfalab/core-components') && !DEV_PACKAGES.includes(name),
    );

    storybookTsConfigTemplate.compilerOptions.paths = {
        ...storybookTsConfigTemplate.compilerOptions.paths,
        ...generatePaths(atomicPackages, storybookPath),
    };

    return storybookTsConfigTemplate;
}

/**
 * @returns {Object}
 */
function generateTestsTsConfig() {
    const testsTsConfigTemplate = fse.readJsonSync(
        path.join(dirname, 'templates', 'tsconfig.test.json'),
        { encoding: 'utf8' },
    );

    const atomicPackages = packages.filter(
        ({ packageJson: { name } }) =>
            !(name === '@alfalab/core-components') && !DEV_PACKAGES.includes(name),
    );

    testsTsConfigTemplate.compilerOptions.paths = {
        ...testsTsConfigTemplate.compilerOptions.paths,
        ...generatePaths(atomicPackages),
    };

    return testsTsConfigTemplate;
}

/**
 * @param {import('@manypkg/get-packages').Package} pkg
 * @returns {Object}
 */
function generatePackageTsConfig({ dir, packageJson }) {
    const packageTsConfigTemplate = fse.readJsonSync(
        path.join(dirname, 'templates', 'tsconfig.package.json'),
        { encoding: 'utf8' },
    );

    const coreDependencies = Object.keys({
        ...packageJson.dependencies,
        ...packageJson.peerDependencies,
        ...packageJson.devDependencies,
    }).filter((name) => name.startsWith('@alfalab/core-components-'));
    const devDependencies = TEST_PACKAGES;

    switch (packageJson.name) {
        case '@alfalab/core-components': {
            return packageTsConfigTemplate;
        }
        case '@alfalab/core-components-screenshot-utils': {
            const relativeStorybookPath = path.relative(dir, storybookPath);

            packageTsConfigTemplate.compilerOptions.types = [
                '@alfalab/core-components-env',
                '@testing-library/jest-dom',
                '@types/webpack-env',
            ];

            const packagesOfPackage = packages.filter(({ packageJson: { name } }) =>
                devDependencies.includes(name),
            );

            packageTsConfigTemplate.compilerOptions.paths = {
                'storybook/*': [`${relativeStorybookPath}/*`],
                ...generatePaths(packagesOfPackage, dir),
            };
            packageTsConfigTemplate.references = [
                { path: relativeStorybookPath },
                ...packagesOfPackage
                    .filter(({ packageJson: { name } }) => !(name === packageJson.name))
                    .map((pkg) => ({ path: path.relative(dir, pkg.dir) })),
            ];

            return packageTsConfigTemplate;
        }
        default: {
            const packagesOfPackage = packages.filter(
                ({ packageJson: { name } }) =>
                    name === packageJson.name ||
                    coreDependencies.includes(name) ||
                    devDependencies.includes(name),
            );

            if (packagesOfPackage.length > 0) {
                packageTsConfigTemplate.compilerOptions.paths = generatePaths(
                    packagesOfPackage,
                    dir,
                );

                packageTsConfigTemplate.references = packagesOfPackage
                    .filter(({ packageJson: { name } }) => !(name === packageJson.name))
                    .map((pkg) => ({ path: path.relative(dir, pkg.dir) }));
            }

            if (packageTsConfigTemplate.references.length === 0) {
                packageTsConfigTemplate.references = undefined;
            }

            return packageTsConfigTemplate;
        }
    }
}

/**
 * @function
 * @template T
 * @param {T} a
 * @param {T} b
 * @returns {boolean}
 */
function isDummyEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
