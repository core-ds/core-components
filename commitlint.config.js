// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const { RuleConfigSeverity } = require('@commitlint/types');
const assert = require('node:assert/strict');
const { getPackages } = require('./tools/monorepo.cjs');

const CORE_COMPONENTS_REGEXP = /^@alfalab\/core-components-/;

function getScopes() {
    const { packages } = getPackages();

    return packages.map(({ packageJson: { name } }) => {
        if (name === '@alfalab/core-components') {
            return 'root';
        }

        assert(CORE_COMPONENTS_REGEXP.test(name), name);

        return name.replace(CORE_COMPONENTS_REGEXP, '');
    });
}

/**
 * @type {import('@commitlint/types').UserConfig}
 */
const config = {
    extends: '@alfalab/lint-preset/commitlint',
    rules: {
        'scope-empty': [RuleConfigSeverity.Disabled],
        'scope-enum': () => [RuleConfigSeverity.Error, 'always', getScopes()],
    },
};

module.exports = config;
