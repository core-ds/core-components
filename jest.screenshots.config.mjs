/* eslint-disable import/no-extraneous-dependencies */
import { getPackagesSync } from '@manypkg/get-packages';
import { cwd } from 'node:process';
import { createJsWithTsLegacyPreset } from 'ts-jest';

const { packages } = getPackagesSync(cwd());

/**
 * @type {import('ts-jest').JestConfigWithTsJest['moduleNameMapper']}
 */
const moduleNameMapper = packages.reduce(
    (map, { relativeDir, packageJson: { name } }) =>
        Object.assign(map, {
            [`${name}$`]: `<rootDir>/${relativeDir}/src`,
            [`${name}/(.*)$`]: `<rootDir>/${relativeDir}/src/$1`,
        }),
    { '\\.css$': 'identity-obj-proxy' },
);

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
    ...tsJestPreset,
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tools/jest/setupScreenshotsTests.ts'],
    modulePathIgnorePatterns: ['dist'],
    moduleNameMapper,
    testMatch: ['**/*.screenshots.test.ts?(x)'],
    maxWorkers: 5,
    testTimeout: 200000,
};

export default config;
