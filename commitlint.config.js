const assert = require('assert');
const {
    utils: { getPackages },
} = require('@commitlint/config-lerna-scopes');

const PACKAGE_NAME_PREFIX_REG_EXP = /^core-components-/;

function getScopes(packages) {
    return packages.map((packageName) => {
        if (packageName === 'core-components') {
            return 'root';
        }

        assert(PACKAGE_NAME_PREFIX_REG_EXP.test(packageName));

        return packageName.replace(PACKAGE_NAME_PREFIX_REG_EXP, '');
    });
}

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': async (ctx) => [2, 'always', getScopes(await getPackages(ctx))],
    },
};
