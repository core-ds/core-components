/* eslint-disable import/no-extraneous-dependencies */
import { createRequire } from 'node:module';
import { createJsWithTsLegacyPreset, pathsToModuleNameMapper } from 'ts-jest';

const require = createRequire(import.meta.url);
const tsconfig = require('./tsconfig.test.json');

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
    ...tsJestPreset,
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tools/jest/setupScreenshotsTests.ts'],
    modulePathIgnorePatterns: ['/dist/'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
        '\\.css$': 'identity-obj-proxy',
    },
    testMatch: ['**/*.screenshots.test.ts?(x)'],
    maxWorkers: 5,
    testTimeout: 200000,
};

export default config;
