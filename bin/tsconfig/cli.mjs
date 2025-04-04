#!/usr/bin/env node

import path from 'node:path';
import fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createRequire } from 'node:module';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import shell from 'shelljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const IGNORED_PACKAGES = ['@balafla/core-components-codemod'];

/**
 * @typedef {Object} PackageInfo
 * @property {string} name
 * @property {string} location
 */

/**
 * @type {PackageInfo[]}
 */
const packages = JSON.parse(
    shell.exec(
        `lerna list ${IGNORED_PACKAGES.map((name) => ['--ignore', name])
            .reduce((a, b) => a.concat(b))
            .join(' ')} --json --all`,
        { silent: true },
    ).stdout,
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
                    choices: packages.map(({ name }) => name),
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
                : packages.filter(({ name }) => args.p?.includes(name));

            packagesToHandle?.forEach((pkg) => {
                fs.writeFileSync(
                    path.join(pkg.location, 'tsconfig.json'),
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
                const packageTsConfig = require(path.join(pkg.location, 'tsconfig.json'));

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
            .filter(({ name }) => packageNames.includes(name))
            .map(({ name, location }) => {
                const relativePackageLocation = normalizePath(path.relative(cwd, location));

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
        .map(({ name }) => name)
        .filter((name) => !(name === '@balafla/core-components'));

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
        .map(({ name }) => name)
        .filter((name) => !(name === '@balafla/core-components'));

    testsTsConfigTemplate.compilerOptions.paths = {
        ...testsTsConfigTemplate.compilerOptions.paths,
        ...generatePaths(atomicPackages),
    };

    return testsTsConfigTemplate;
}

/**
 * @param {PackageInfo} pkg
 * @returns {Object}
 */
function generatePackageTsConfig({ location, name }) {
    const packageTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.package.json'),
    );

    if (name === '@balafla/core-components-mq') {
        const srcIndex = packageTsConfigTemplate.include.findIndex((path) => path === 'src');

        packageTsConfigTemplate.include.splice(srcIndex + 1, 0, 'src/**/*.json');
    }

    const { dependencies, peerDependencies } = require(path.join(location, 'package.json'));

    const corePackages = Object.keys({ ...dependencies, ...peerDependencies }).filter((name) =>
        name.startsWith('@balafla/core-components-'),
    );

    if (name === '@balafla/core-components' || corePackages.length === 0) {
        return packageTsConfigTemplate;
    }

    if (corePackages.length > 0) {
        packageTsConfigTemplate.compilerOptions.paths = generatePaths(corePackages, location);
        packageTsConfigTemplate.references = packages
            .filter(({ name }) => corePackages.includes(name))
            .map((pkg) => ({ path: path.relative(location, pkg.location) }));
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
