/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('node:assert/strict');
const { getPackages } = require('@manypkg/get-packages');

const CORE_COMPONENTS_REGEXP = /^@alfalab\/core-components-/;

function getScopes({ packages }: import('@manypkg/get-packages').Packages) {
    return packages.map(({ packageJson: { name } }) => {
        if (name === '@alfalab/core-components') {
            return 'root';
        }

        assert(CORE_COMPONENTS_REGEXP.test(name), name);

        return name.replace(CORE_COMPONENTS_REGEXP, '');
    });
}

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': async () => [2, 'always', getScopes(await getPackages(__dirname))] as const,
    },
};
