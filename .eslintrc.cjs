const fs = require('node:fs');
const path = require('node:path');
const resolve = require('resolve/sync');

const presets = path.dirname(resolve('arui-presets-lint/package.json', { basedir: __dirname }));

const ignored = ['.eslintignore', '.gitignore']
    .map((file) => path.join(process.cwd(), file))
    .filter((file) => fs.existsSync(file))
    .map((file) => fs.readFileSync(file, { encoding: 'utf8' }))
    .map((content) => content.split('\n').filter((line) => !(line.trim() === '')))
    .reduce((a, b) => a.concat(b), []);

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
    ignorePatterns: ['**/*.test*', '**/*.stories*'].concat(ignored),
    extends: path.join(presets, 'eslint'),
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
