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
};

module.exports = config;
