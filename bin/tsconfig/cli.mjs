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
const require = createRequire(import.meta.url);

const IGNORED_PACKAGES = ['@alfalab/core-components-codemod'];

const packages = (await getPackages(process.cwd())).packages.filter(
    ({ packageJson: { name } }) => !IGNORED_PACKAGES.includes(name),
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
                    path.join(process.cwd(), '.storybook', 'tsconfig.json'),
                    // TODO prettier format
                    JSON.stringify(generateStorybookTsConfig()),
                    { encoding: 'utf8' },
                );
            }
            if (args.t || args.a) {
                fs.writeFileSync(
                    path.join(process.cwd(), 'tsconfig.test.json'),
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

            const storybookTsConfig = require(path.join(
                process.cwd(),
                '.storybook',
                'tsconfig.json',
            ));

            if (!isDummyEqual(storybookTsConfig, generateStorybookTsConfig())) {
                errors.push('Please generate tsconfig.json via "yarn tsconfig generate -s"');
            }

            const testsTsConfig = require(path.join(process.cwd(), 'tsconfig.test.json'));

            if (!isDummyEqual(testsTsConfig, generateTestsTsConfig())) {
                errors.push('Please generate tsconfig.json via "yarn tsconfig generate -t"');
            }

            const errorPackages = [];

            packages.forEach((pkg) => {
                const packageTsConfig = require(path.join(pkg.dir, 'tsconfig.json'));

                if (!isDummyEqual(packageTsConfig, generatePackageTsConfig(pkg))) {
                    errorPackages.push(pkg.name);
                }
            });

            if (errorPackages.length > 0) {
                const packages = errorPackages.join(' ');

                errors.push(
                    `Please generate packages tsconfig.json via "yarn tsconfig generate -p ${packages}"`,
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
    return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * @param {string[]} packageNames
 * @returns {Record<string, string[]>}
 */
function generatePaths(packageNames, cwd = process.cwd()) {
    return Object.fromEntries(
        packages
            .filter(({ packageJson: { name } }) => packageNames.includes(name))
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

    const atomicPackages = packages
        .map(({ packageJson: { name } }) => name)
        .filter((name) => !(name === '@alfalab/core-components'));

    storybookTsConfigTemplate.compilerOptions.paths = {
        ...storybookTsConfigTemplate.compilerOptions.paths,
        ...generatePaths(atomicPackages, path.join(process.cwd(), '.storybook')),
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

    const atomicPackages = packages
        .map(({ packageJson: { name } }) => name)
        .filter((name) => !(name === '@alfalab/core-components'));

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
    const packageTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.package.json'),
    );

    if (packageJson.name === '@alfalab/core-components-mq') {
        const srcIndex = packageTsConfigTemplate.include.findIndex(
            (includedPath) => includedPath === 'src',
        );

        packageTsConfigTemplate.include.splice(srcIndex + 1, 0, 'src/**/*.json');
    }

    const corePackages = Object.keys({
        ...packageJson.dependencies,
        ...packageJson.peerDependencies,
    }).filter((name) => name.startsWith('@alfalab/core-components-'));

    if (packageJson.name === '@alfalab/core-components' || corePackages.length === 0) {
        return packageTsConfigTemplate;
    }

    if (corePackages.length > 0) {
        packageTsConfigTemplate.compilerOptions.paths = generatePaths(corePackages, dir);
        packageTsConfigTemplate.references = packages
            .filter(({ packageJson: { name } }) => corePackages.includes(name))
            .map((pkg) => ({ path: path.relative(dir, pkg.dir) }));
    }

    return packageTsConfigTemplate;
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
