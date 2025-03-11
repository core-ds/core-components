const assert = require('assert');
const { getPackages } = require('@manypkg/get-packages');

const PACKAGE_NAME_PREFIX_REG_EXP = /^@alfalab\/core-components-/;

/**
 * @param {import('@manypkg/get-packages').Packages} packages
 * @returns {string[]}
 */
function getScopes({ packages }) {
    return packages.map(({ packageJson: { name } }) => {
        if (name === '@alfalab/core-components') {
            return 'root';
        }

        assert(PACKAGE_NAME_PREFIX_REG_EXP.test(name), name);

        return name.replace(PACKAGE_NAME_PREFIX_REG_EXP, '');
    });
}

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': async (ctx) => [
            2,
            'always',
            getScopes(await getPackages(ctx?.cwd ?? process.cwd())),
        ],
    },
};
