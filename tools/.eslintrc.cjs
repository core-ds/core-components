/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'no-console': 'off',
    },
    // TODO: fix eslint errors
    ignorePatterns: [
        'unused-colors.js',
        'update-colors.js',
        'update-flags.js',
        'update-typography.js',
        'update-usages.js',
    ],
};

module.exports = config;
