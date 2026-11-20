/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
    rules: {
        'no-param-reassign': 'off',
    },
    ignorePatterns: ['*/__testfixtures__/*'],
};

module.exports = config;
