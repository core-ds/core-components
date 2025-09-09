// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convertPathToPattern } from 'tinyglobby';

import { ESLINT_IGNORED_PACKAGES } from './tools/eslint.cjs';
import { getPackages } from './tools/monorepo.cjs';

const { packages } = getPackages();

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
    '{package,tsconfig*}.json': () => 'yarn tsconfig check',
    '*.{ts,tsx,js,jsx,mjs,mts,cjs,cts,css,json,md,yaml,yml}': 'prettier --write --list-different',
    './*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}': 'eslint --fix --max-warnings 0',
    './{bin,tools}/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}': 'eslint --fix --max-warnings 0',
    '*.css': 'stylelint --fix',
    ...packages
        .filter(({ packageJson: { name } }) => !ESLINT_IGNORED_PACKAGES.includes(name))
        .reduce(
            (packagesConfig, { dir, relativeDir, packageJson: { name } }) => ({
                ...packagesConfig,
                [`./${convertPathToPattern(relativeDir)}/src/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}`]:
                    () => {
                        const eslintConfig = path.relative(
                            dir,
                            path.join(dirname, '.eslintrc.cjs'),
                        );

                        return `lerna exec --scope ${name} -- "eslint src --max-warnings 0 --config '${eslintConfig}'"`;
                    },
            }),
            {},
        ),
};

export default config;
