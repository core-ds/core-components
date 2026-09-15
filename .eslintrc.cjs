// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const fs = require('node:fs');
const path = require('node:path');
const resolve = require('resolve');
const { getPackages } = require('./tools/monorepo.cjs');
const { isSamePath } = require('./tools/path.cjs');

const lottiePkg = getPackages().packages.find(
    ({ packageJson: { name } }) => name === '@alfalab/core-components-lottie',
);

/**
 * @type {import('eslint').Linter.LegacyConfig}
 */
const config = {
    root: true,
    parserOptions: {
        project: ['tsconfig.json', 'tsconfig.eslint.json']
            .map((tsConfigFile) => path.join(process.cwd(), tsConfigFile))
            .filter((tsConfigPath) => fs.existsSync(tsConfigPath)),
    },
    ignorePatterns: ['**/*.test.*', '**/*.stories.*', '**/dist/**', '**/node_modules/**'],
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
        {
            files: '*.d.{ts,cts,mts}',
            rules: {
                // ts backport capability
                'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
                '@typescript-eslint/consistent-type-imports': 'off',
                'import/no-useless-path-segments': 'off',
                'import/no-named-default': 'off',
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
        'react-hooks/exhaustive-deps':
            lottiePkg && isSamePath(process.cwd(), lottiePkg.dir)
                ? ['warn', { additionalHooks: ['useLayoutEffect_SAFE_FOR_SSR'].join('|') }]
                : 'warn',
    },
};

module.exports = config;
