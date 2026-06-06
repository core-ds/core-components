// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'jest';
import { createJsWithTsLegacyPreset, pathsToModuleNameMapper } from 'ts-jest';

import tsconfig from './tsconfig.test.json' with { type: 'json' };

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

export default defineConfig({
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
    reporters:
        process.env.CI === 'true'
            ? [['github-actions', { silent: false }], 'summary']
            : ['default'],
});
