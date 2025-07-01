/* eslint-disable import/no-extraneous-dependencies */

import fse from 'fs-extra';
import { convertPathToPattern } from 'globby';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPackages } from './tools/monorepo.cjs';
import { readPackagesFile } from './tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const tsconfig = fse.readJsonSync(path.join(dirname, 'tsconfig.json'), { encoding: 'utf8' });

const ESLINT_IGNORED_PACKAGES = readPackagesFile(
    path.join(dirname, 'tools/eslint/ignored-packages'),
);

const EXTENSIONS = ['js', 'ts', 'cjs', 'mjs'];
const DIRS = ['bin', 'tools'];
const FILES_REGEXP = new RegExp(`^(?!(${DIRS.join('|')})\\/).*\\.(${EXTENSIONS.join('|')})$`);

const { packages } = getPackages();

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
    ...packages
        .filter(({ packageJson: { name } }) => !ESLINT_IGNORED_PACKAGES.includes(name))
        .reduce((patterns, { dir, relativeDir, packageJson: { name } }) => {
            const pattern = `./${convertPathToPattern(
                relativeDir,
            )}/src/**/*.{js,jsx,ts,tsx,cjs,mjs}`;

            return {
                ...patterns,
                [pattern]: (filenames) => {
                    const files = filenames
                        .map((file) => `'${path.relative(dir, file)}'`)
                        .join(' ');
                    const eslintConfig = path.relative(dir, path.join(dirname, '.eslintrc.cjs'));

                    return `lerna exec --scope ${name} -- "eslint ${files} --max-warnings 0 --config '${eslintConfig}'"`;
                },
            };
        }, {}),
    ...packages.reduce((patterns, { relativeDir }) => {
        const pattern = `./${convertPathToPattern(relativeDir)}/{package,tsconfig}.json`;

        return {
            ...patterns,
            [pattern]: 'yarn tsconfig check',
        };
    }, {}),
    ...tsconfig.include
        .filter((included) => FILES_REGEXP.test(included))
        .reduce(
            (patterns, file) => ({
                ...patterns,
                [`./${convertPathToPattern(file)}`]: 'eslint --max-warnings 0',
            }),
            {},
        ),
    [`./{${DIRS.join(',')}}/**/*.{${EXTENSIONS.join(',')}}`]: 'eslint --max-warnings 0',
    './bin/tsconfig/templates/tsconfig*.json': 'yarn tsconfig check',
    '*.{js,jsx,ts,tsx,cjs,mjs,json,yml}': 'prettier --write',
    '*.css': ['prettier --write', 'stylelint'],
};

export default config;
