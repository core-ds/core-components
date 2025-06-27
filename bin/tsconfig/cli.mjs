#!/usr/bin/env node

import path from 'node:path';
import fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createRequire } from 'node:module';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import { getPackages } from '@manypkg/get-packages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.join(__dirname, '../..');
const require = createRequire(import.meta.url);
const storybookPath = path.join(repositoryRoot, '.storybook');

const IGNORED_PACKAGES = ['@alfalab/core-components-codemod'];

const TEST_PACKAGES = [
    '@alfalab/core-components-screenshot-utils',
    '@alfalab/core-components-test-utils',
];

const DEV_PACKAGES = ['@alfalab/core-components-env'];

const packages = (await getPackages(repositoryRoot)).packages.filter(
    ({ packageJson }) => !IGNORED_PACKAGES.includes(packageJson.name),
);

yargs(hideBin(process.argv))
    .command(
        'generate',
        'Generate tsconfig.json',
        function builder(yargs) {
            return yargs
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
                });
        },
        function handler(args) {
            if (args.s || args.a) {
                fs.writeFileSync(
                    path.join(storybookPath, 'tsconfig.json'),
                    // TODO prettier format
                    JSON.stringify(generateStorybookTsConfig()),
                    { encoding: 'utf8' },
                );
            }
            if (args.t || args.a) {
                fs.writeFileSync(
                    path.join(repositoryRoot, 'tsconfig.test.json'),
                    // TODO prettier format
                    JSON.stringify(generateTestsTsConfig()),
                    { encoding: 'utf8' },
                );
            }

            const packagesToHandle = args.a
                ? packages
                : packages.filter(({ packageJson: { name } }) => args.p?.includes(name));

            packagesToHandle?.forEach((pkg) => {
                fs.writeFileSync(
                    path.join(pkg.dir, 'tsconfig.json'),
                    // TODO prettier format
                    JSON.stringify(generatePackageTsConfig(pkg)),
                    { encoding: 'utf8' },
                );
            });
        },
    )
    .command(
        'check',
        'Check tsconfig.json',
        function builder(yargs) {
            return yargs;
        },
        function handler() {
            let errors = [];

            const storybookTsConfig = require(path.join(storybookPath, 'tsconfig.json'));

            if (!isDummyEqual(storybookTsConfig, generateStorybookTsConfig())) {
                errors.push('Please generate tsconfig.json via `yarn tsconfig generate -s`');
            }

            const testsTsConfig = require(path.join(repositoryRoot, 'tsconfig.test.json'));

            if (!isDummyEqual(testsTsConfig, generateTestsTsConfig())) {
                errors.push('Please generate tsconfig.json via `yarn tsconfig generate -t`');
            }

            const errorPackages = [];

            packages.forEach((pkg) => {
                const packageTsConfig = require(path.join(pkg.dir, 'tsconfig.json'));

                if (!isDummyEqual(packageTsConfig, generatePackageTsConfig(pkg))) {
                    errorPackages.push(pkg.packageJson.name);
                }
            });

            if (errorPackages.length > 0) {
                const packages = errorPackages.join(' ');

                errors.push(
                    `Please generate packages tsconfig.json via \`yarn tsconfig generate -p ${packages}\``,
                );
            }

            if (errors.length === 0) {
                return;
            }

            console.error(errors.join('\n'));
            process.exit(-1);
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
function generatePaths(forPackages, cwd = repositoryRoot) {
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
    const storybookTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.storybook.json'),
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
    const testsTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.test.json'),
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
function generatePackageTsConfig(pkg) {
    const { dir, packageJson } = pkg;
    const packageTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.package.json'),
    );

    const coreDependencies = Object.keys({
        ...packageJson.dependencies,
        ...packageJson.peerDependencies,
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

/**
 * @param {string} path
 * @returns {Object}
 */
function readTsConfig(path) {
    // read and parse for mutation
    return JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
}
