#!/usr/bin/env node

import path from 'node:path';
import fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createRequire } from 'node:module';
import * as process from 'node:process';

const require = createRequire(import.meta.url);

const __dirname = import.meta.dirname;
const packagesDir = path.join(process.cwd(), 'packages');

const IGNORED_PACKAGES = ['codemod'];

const packageDirnames = fs
    .readdirSync(packagesDir, { encoding: 'utf8', withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !IGNORED_PACKAGES.includes(dirent.name))
    .map((dirent) => dirent.name)
    .filter((packageDirname) => {
        try {
            const pkg = require(path.join(packagesDir, packageDirname, 'package.json'));

            return (
                pkg.name === '@alfalab/core-components' ||
                pkg.name === `@alfalab/core-components-${packageDirname}`
            );
        } catch {
            return false;
        }
    })
    .sort((a, b) => a.localeCompare(b));

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
                    choices: packageDirnames,
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

            const packageDirnamesToHandle = args.a ? packageDirnames : args.p;

            packageDirnamesToHandle?.forEach((packageDirname) => {
                fs.writeFileSync(
                    path.join(packagesDir, packageDirname, 'tsconfig.json'),
                    // TODO prettier format
                    JSON.stringify(generatePackageTsConfig(packageDirname)),
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

            packageDirnames.forEach((packageDirname) => {
                const packageTsConfig = require(path.join(
                    process.cwd(),
                    'packages',
                    packageDirname,
                    'tsconfig.json',
                ));

                if (!isDummyEqual(packageTsConfig, generatePackageTsConfig(packageDirname))) {
                    errorPackages.push(packageDirname);
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
 * @param {string[]} packageDirnames
 * @returns {Record<string, string[]>}
 */
function generatePaths(packageDirnames, cwd = process.cwd()) {
    const relativePath = path.relative(cwd, packagesDir);
    const normalizedRelativePath = relativePath.startsWith('.')
        ? relativePath
        : `./${relativePath}`;

    return Object.fromEntries([
        ['@alfalab/core-components-*', [`${normalizedRelativePath}/*/src`]],
        ...packageDirnames.map((packageDirname) => [
            `@alfalab/core-components-${packageDirname}/*`,
            [`${normalizedRelativePath}/${packageDirname}/src/*`],
        ]),
    ]);
}

/**
 * @returns {Object}
 */
function generateStorybookTsConfig() {
    const storybookTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.storybook.json'),
    );

    const filteredPackageDirnames = packageDirnames.filter(
        (packageDirname) => !(packageDirname === 'root'),
    );

    storybookTsConfigTemplate.compilerOptions.paths = {
        ...storybookTsConfigTemplate.compilerOptions.paths,
        ...generatePaths(filteredPackageDirnames, path.join(process.cwd(), '.storybook')),
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

    const filteredPackageDirnames = packageDirnames.filter(
        (packageDirname) => !(packageDirname === 'root'),
    );

    testsTsConfigTemplate.compilerOptions.paths = {
        ...testsTsConfigTemplate.compilerOptions.paths,
        ...generatePaths(filteredPackageDirnames),
    };

    return testsTsConfigTemplate;
}

/**
 * @param {string} packageDirname
 * @returns {Object}
 */
function generatePackageTsConfig(packageDirname) {
    const packageTsConfigTemplate = readTsConfig(
        path.join(__dirname, 'templates', 'tsconfig.package.json'),
    );

    const { dependencies = {} } = require(path.join(packagesDir, packageDirname, 'package.json'));

    const coreDependencies = Object.keys(dependencies)
        .map((dependency) => dependency.match(/^@alfalab\/core-components-(.*)$/)?.[1])
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));

    if (packageDirname === 'root' || coreDependencies.length === 0) {
        return packageTsConfigTemplate;
    }

    if (coreDependencies.length > 0) {
        const currentPackageDir = path.join(packagesDir, packageDirname);
        const relativePath = path.relative(currentPackageDir, packagesDir);

        packageTsConfigTemplate.compilerOptions.paths = generatePaths(
            coreDependencies,
            currentPackageDir,
        );

        packageTsConfigTemplate.references = coreDependencies.map((dir) => ({
            path: `${relativePath}/${dir}`,
        }));
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
