// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { UserConfig } from '@commitlint/types';
import assert from 'node:assert/strict';

import { getPackages } from './tools/monorepo.cjs';

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

const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': () => [2, 'always', getScopes()],
    },
};

export default config;
