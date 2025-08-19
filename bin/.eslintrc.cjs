/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'no-console': 'off',
    },
};

module.exports = config;
