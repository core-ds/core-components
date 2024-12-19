#!/usr/bin/env node

const path = require('node:path');
const fs = require('node:fs');
const process = require('node:process');

const IGNORED_PACKAGES = ['codemod'];

const IGNORED_DEPENDENCIES = ['ui-primitives'];

const packagesDir = path.join(process.cwd(), 'packages');

const packageDirnames = fs
    .readdirSync(packagesDir, { encoding: 'utf8', withFileTypes: false })
    .filter((packageDirname) => !IGNORED_PACKAGES.includes(packageDirname))
    .filter((packageDirname) => {
        try {
            const { name } = require(path.join(packagesDir, packageDirname, 'package.json'));

            return name === `@alfalab/core-components-${packageDirname}`;
        } catch {
            return false;
        }
    })
    .sort((a, b) => a.localeCompare(b));

const rootPackageJsonPath = path.join(process.cwd(), 'package.json');

const {
    dependencies: rootPackageDependencies = {},
    peerDependencies: rootPackagePeerDependencies = {},
} = require(rootPackageJsonPath);

let hasError = false;

packageDirnames.forEach((packageDirname) => {
    const packageJsonPath = path.join(packagesDir, packageDirname, 'package.json');

    const { dependencies = {} } = require(packageJsonPath);

    Object.entries(dependencies).forEach(([dependency, version]) => {
        if (isMonorepoDependency(dependency)) {
            const dependencyDir = dependency.replace(/^@alfalab\/core-components-(.*)$/, '$1');
            const { version: latestVersion } = require(path.join(
                packagesDir,
                dependencyDir,
                'package.json',
            ));

            if (new RegExp(`[^~]?${latestVersion.replaceAll(/\./g, '\\.')}`).test(version)) {
                return;
            }

            if (!hasError) {
                hasError = true;
            }

            console.error(
                `Missmatched dependency in ${packageJsonPath}: ${dependency}@${version} is used but the latest version is ${dependency}@^${latestVersion}\n`,
            );
        } else {
            const rootVersion = rootPackageDependencies[dependency];

            if (rootVersion === undefined) {
                if (!hasError) {
                    hasError = true;
                }
                console.error(
                    `Missed dependency in ${packageJsonPath}: ${dependency}@${version} is used but it is not specified in root ${rootPackageJsonPath}\n`,
                );
                return;
            }

            if (rootVersion === version) {
                return;
            }

            if (!hasError) {
                hasError = true;
            }

            console.error(
                `Missmatched dependency in ${packageJsonPath}: ${dependency}@${version} is used but the root version is ${dependency}@${rootVersion}\n`,
            );
        }
    });
});

const dependenciesFromPackages = new Set(
    packageDirnames
        .map((packageDirname) => {
            const packageJsonPath = path.join(packagesDir, packageDirname, 'package.json');
            const { dependencies = {} } = require(packageJsonPath);

            return Object.keys(dependencies);
        })
        .reduce((a, b) => a.concat(b)),
);

Object.entries(rootPackageDependencies)
    .filter(([dependency]) => !IGNORED_DEPENDENCIES.includes(dependency))
    .forEach(([dependency, version]) => {
        if (dependenciesFromPackages.has(dependency)) {
            return;
        }

        if (!hasError) {
            hasError = true;
        }

        console.error(`Non-used dependency in ${rootPackageJsonPath}: ${dependency}@${version}\n`);
    });

const peerDependenciesFromPackages = new Set(
    packageDirnames
        .map((packageDirname) => {
            const packageJsonPath = path.join(packagesDir, packageDirname, 'package.json');
            const { peerDependencies = {} } = require(packageJsonPath);

            return Object.keys(peerDependencies);
        })
        .reduce((a, b) => a.concat(b)),
);

Object.entries(rootPackagePeerDependencies).forEach(([peerDependency, version]) => {
    if (peerDependenciesFromPackages.has(peerDependency)) {
        return;
    }

    if (!hasError) {
        hasError = true;
    }

    console.error(
        `Non-used peer dependency in ${rootPackageJsonPath}: ${peerDependency}@${version}\n`,
    );
});

if (hasError) {
    process.exit(-1);
}

/**
 *
 * @param {string} dependency Dependency name
 * @returns {boolean}
 */
function isMonorepoDependency(dependency) {
    return /^@alfalab\/core-components-(.*)$/.test(dependency);
}
