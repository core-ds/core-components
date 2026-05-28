// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
import { exec } from '@actions/exec';
import { convertPathToPattern } from 'tinyglobby';

import { ESLINT_IGNORED_PACKAGES } from './tools/eslint.cjs';
import { getPackages } from './tools/monorepo.cjs';

const { packages } = getPackages();

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
            (packagesConfig, { relativeDir, packageJson }) => ({
                ...packagesConfig,
                [`./${convertPathToPattern(relativeDir)}/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}`]: {
                    title: `eslint in ${relativeDir}`,
                    task: async () => {
                        await exec('yarn', [
                            'workspace',
                            packageJson.name,
                            'exec',
                            'eslint',
                            'src',
                            '--fix',
                            '--max-warnings',
                            '0',
                        ]);
                    },
                },
            }),
            {},
        ),
};

export default config;
