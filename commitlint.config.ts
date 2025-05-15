import { getPackages, Packages } from '@manypkg/get-packages';
import assert from 'node:assert';

const PACKAGE_NAME_PREFIX_REG_EXP = /^@alfalab\/core-components-/;

function getScopes({ packages }: Packages) {
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
        'scope-enum': async (): Promise<[number, string, string[]]> => [
            2,
            'always',
            getScopes(await getPackages(__dirname)),
        ],
    },
};
