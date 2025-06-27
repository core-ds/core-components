import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPackages } from '@manypkg/get-packages';
import { convertPathToPattern } from 'globby';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ESLINT_IGNORED_PACKAGES = [
    '@alfalab/core-components-codemod',
    '@alfalab/core-components-themes',
    '@alfalab/core-components-vars',
];

const { packages } = await getPackages(__dirname);

export default {
    ...Object.fromEntries(
        packages
            .filter(({ packageJson: { name } }) => !ESLINT_IGNORED_PACKAGES.includes(name))
            .map(({ dir, relativeDir, packageJson: { name } }) => [
                `${convertPathToPattern(relativeDir)}/src/{*,**/*}.{js,jsx,ts,tsx,cjs,mjs}`,
                (filenames) => {
                    const files = filenames
                        .map((file) => `'${path.relative(dir, file)}'`)
                        .join(' ');
                    const config = path.relative(dir, path.join(__dirname, '.eslintrc.cjs'));

                    return `lerna exec --scope ${name} -- "eslint ${files} --config ${config}"`;
                },
            ]),
    ),
    ...Object.fromEntries(
        packages.map(({ relativeDir }) => [
            `${convertPathToPattern(relativeDir)}/{package,tsconfig}.json`,
            'yarn tsconfig check',
        ]),
    ),
    '*.{js,jsx,ts,tsx,cjs,mjs,json,yml}': 'prettier --write',
    'bin/tsconfig/templates/tsconfig*.json': 'yarn tsconfig check',
    '*.css': ['prettier --write', 'stylelint'],
};
