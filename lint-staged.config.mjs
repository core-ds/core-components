// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
import { toPlatformPath } from '@actions/core';
import { ESLint } from 'eslint';
import path from 'node:path';
import slash from 'slash';
import { convertPathToPattern } from 'tinyglobby';

import { ESLINT_IGNORED_PACKAGES } from './tools/eslint.cjs';
import { getPackages } from './tools/monorepo.cjs';
import { NON_EXISTENT_CSS_VARS_IGNORED_PACKAGES } from './tools/non-existent-css-vars.mjs';

const { packages } = getPackages();

const nonExistentVarsBin = path.resolve(
    import.meta.dirname,
    toPlatformPath('bin/non-existent-css-vars.mjs'),
);

/**
 * @param {string} cwd
 * @param {string} command
 */
function createEslintTask(cwd, command) {
    /** @type {ESLint | undefined} */
    let eslint;

    /** @param {string[]} files */
    return async (files) => {
        eslint ??= new ESLint({ cwd });
        const ignored = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
        const paths = files
            .filter((_, index) => !ignored[index])
            .map((file) => JSON.stringify(slash(file)));

        return paths.length ? `${command} ${paths.join(' ')}` : [];
    };
}

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
    '{package,tsconfig*}.json': () => 'yarn tsconfig check',
    '*.{ts,tsx,js,jsx,mjs,mts,cjs,cts,css,json,yaml,yml,md}': 'prettier --write --list-different',
    './*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}': createEslintTask(
        import.meta.dirname,
        'eslint --fix --max-warnings 0',
    ),
    './{bin,tools}/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}': createEslintTask(
        import.meta.dirname,
        'eslint --fix --max-warnings 0',
    ),
    '*.css': 'stylelint --fix',
    '**/package.json': 'sort-package-json',
    ...packages
        .filter(({ packageJson }) => !ESLINT_IGNORED_PACKAGES.includes(packageJson.name))
        .reduce(
            (packagesConfig, { dir, relativeDir, packageJson }) => ({
                ...packagesConfig,
                [`./${convertPathToPattern(relativeDir)}/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}`]:
                    createEslintTask(
                        dir,
                        `yarn workspace ${packageJson.name} exec eslint --fix --max-warnings 0`,
                    ),
            }),
            {},
        ),
    ...packages
        .filter(
            ({ packageJson }) => !NON_EXISTENT_CSS_VARS_IGNORED_PACKAGES.includes(packageJson.name),
        )
        .reduce(
            (packagesConfig, { dir, relativeDir, packageJson }) => ({
                ...packagesConfig,
                [`./${convertPathToPattern(relativeDir)}/**/*.css`]: `yarn workspace ${packageJson.name} exec node ${slash(path.relative(dir, nonExistentVarsBin))}`,
            }),
            {},
        ),
};

export default config;
