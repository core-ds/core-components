// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
import { toPlatformPath } from '@actions/core';
import path from 'node:path';
import slash from 'slash';
import { convertPathToPattern } from 'tinyglobby';

import { ESLINT_IGNORED_PACKAGES } from './tools/eslint.cjs';
import { getPackages } from './tools/monorepo.cjs';

const { packages } = getPackages();

const nonExistentVarsBin = path.resolve(
    import.meta.dirname,
    toPlatformPath('bin/non-existent-css-vars.mjs'),
);

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
    '{package,tsconfig*}.json': () => 'yarn tsconfig check',
    '*.{ts,tsx,js,jsx,mjs,mts,cjs,cts,css,json,yaml,yml,md}': 'prettier --write --list-different',
    './*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}': 'eslint --fix --max-warnings 0',
    './{bin,tools}/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}': 'eslint --fix --max-warnings 0',
    '*.css': 'stylelint --fix',
    '**/package.json': 'sort-package-json',
    ...packages
        .filter(({ packageJson }) => !ESLINT_IGNORED_PACKAGES.includes(packageJson.name))
        .reduce(
            (packagesConfig, { dir, relativeDir, packageJson }) => ({
                ...packagesConfig,
                [`./${convertPathToPattern(relativeDir)}/**/*.css`]: `yarn workspace ${packageJson.name} exec node ${slash(path.relative(dir, nonExistentVarsBin))}`,
                [`./${convertPathToPattern(relativeDir)}/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}`]: `yarn workspace ${packageJson.name} exec eslint --fix --max-warnings 0`,
            }),
            {},
        ),
};

export default config;
