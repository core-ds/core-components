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

const ignoredModules = ['@alfalab/hooks', 'simplebar', 'uuid'];

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
    coverageReporters: ['lcov', 'text', 'text-summary', 'clover'],
    projects: [
        {
            ...tsJestPreset,
            displayName: 'csr' /* client side rendering */,
            globalSetup: '<rootDir>/tools/jest/globalSetup.ts',
            testEnvironment: 'jsdom',
            modulePathIgnorePatterns: ['dist'],
            moduleNameMapper,
            setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.ts'],
            testMatch: ['**/*.test.ts?(x)', '!**/*.(screenshots|ssr).test.ts?(x)'],
            testPathIgnorePatterns: ['codemod'],
            transformIgnorePatterns: [`/node_modules/(?!(${ignoredModules.join('|')}))/`],
            snapshotFormat: {
                escapeString: true,
                printBasicPrototype: true,
            },
            coveragePathIgnorePatterns: ['index.ts'],
        },
        {
            ...tsJestPreset,
            displayName: 'ssr' /* server side rendering */,
            globalSetup: '<rootDir>/tools/jest/globalSetup.ts',
            testEnvironment: 'node',
            modulePathIgnorePatterns: ['dist'],
            moduleNameMapper,
            setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.ts'],
            testMatch: ['**/*.ssr.test.ts?(x)'],
            testPathIgnorePatterns: ['codemod'],
            transformIgnorePatterns: [`/node_modules/(?!(${ignoredModules.join('|')}))/`],
            snapshotFormat: {
                escapeString: true,
                printBasicPrototype: true,
            },
        },
    ],
};

export default config;
