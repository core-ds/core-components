// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const fs = require('node:fs');
const path = require('node:path');
const resolve = require('resolve');

const ignored = ['.eslintignore', '.gitignore']
    .map((file) => path.join(process.cwd(), file))
    .filter((file) => fs.existsSync(file))
    .map((file) => fs.readFileSync(file, { encoding: 'utf8' }))
    .flatMap((content) => content.split('\n'))
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((pattern) =>
        /**
         * ./src/foo.ts -> src/foo.ts
         * /src/bar.ts -> src/bar.ts
         */
        pattern.replace(/^\.?\/(.*)/, '$1'),
    );

/**
 * @type {import('eslint').Linter.LegacyConfig}
 */
const config = {
    root: true,
    parserOptions: {
        project: [path.join(process.cwd(), 'tsconfig.json')],
    },
    ignorePatterns: ['**/*.test.*', '**/*.stories.*', ...ignored],
    extends: resolve.sync('@alfalab/lint-preset/eslint', { basedir: __dirname }),
    overrides: [
        {
            files: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
                'unicorn/filename-case': 'off',
                'react/no-unused-prop-types': 'off',
                'dirnames/match-kebab-case': 'off',
                'import/no-relative-packages': 'off',
            },
        },
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_',
            },
        ],
        'multiline-comment-style': ['error', 'starred-block'],
        '@typescript-eslint/default-param-last': 'off',
        'max-lines': 'off',
        'max-params': 'off',
    },
};

module.exports = config;
