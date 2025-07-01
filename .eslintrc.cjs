/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const fs = require('node:fs');
const path = require('node:path');
const resolve = require('resolve/sync');

const ignored = ['.eslintignore', '.gitignore']
    .map((file) => path.join(process.cwd(), file))
    .filter((file) => fs.existsSync(file))
    .map((file) => fs.readFileSync(file, { encoding: 'utf8' }))
    .flatMap((content) => content.split('\n'))
    .map((line) => line.trim())
    .filter((str) => str.length > 0)
    .map((pattern) =>
        /**
         * ./src/foo.ts -> src/foo.ts
         * /src/bar.ts -> src/bar.ts
         */
        pattern.replace(/^\.?\/(.*)/, '$1'),
    );

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
    root: true,
    env: {
        es2023: true,
    },
    parserOptions: {
        project: [path.join(process.cwd(), 'tsconfig.json')],
    },
    ignorePatterns: ['**/*.test*', '**/*.stories*', ...ignored],
    extends: resolve('arui-presets-lint/eslint', { basedir: __dirname }),
    overrides: [
        {
            files: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
            rules: {
                'import/no-extraneous-dependencies': 0,
                'unicorn/filename-case': 0,
                'react/no-unused-prop-types': 0,
                'dirnames/match-kebab-case': 0,
                'import/no-relative-packages': 0,
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
    },
};

module.exports = config;
