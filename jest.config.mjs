/* eslint-disable import/no-extraneous-dependencies */
import { getPackagesSync } from '@manypkg/get-packages';
import { cwd } from 'node:process';
import { createJsWithTsLegacyPreset } from 'ts-jest';

const { packages } = getPackagesSync(cwd());

const ignoredModules = ['@alfalab/hooks', 'simplebar', 'uuid'];

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

/**
 * @type {NonNullable<import('ts-jest').JestConfigWithTsJest['projects']>[number]}
 */
const initialProjectOptions = {
    ...tsJestPreset,
    globalSetup: '<rootDir>/tools/jest/globalSetup.ts',
    setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.ts'],
    modulePathIgnorePatterns: ['/dist/'],
    moduleNameMapper: packages.reduce(
        (map, { relativeDir, packageJson: { name } }) =>
            Object.assign(map, {
                [`${name}$`]: `<rootDir>/${relativeDir}/src`,
                [`${name}/(.*)$`]: `<rootDir>/${relativeDir}/src/$1`,
            }),
        { '\\.css$': 'identity-obj-proxy' },
    ),
    testPathIgnorePatterns: packages
        .filter(({ packageJson: { name } }) => name === '@alfalab/core-components-codemod')
        .map(({ relativeDir }) => `<rootDir>/${relativeDir}`),
    transformIgnorePatterns: [`/node_modules/(?!(${ignoredModules.join('|')}))/`],
    // see https://jestjs.io/blog/2022/08/25/jest-29
    snapshotFormat: {
        escapeString: true,
        printBasicPrototype: true,
    },
};

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
    projects: [
        {
            ...initialProjectOptions,
            displayName: 'csr' /* client side rendering */,
            testEnvironment: 'jsdom',
            testMatch: ['**/*.test.ts?(x)', '!**/*.{screenshots,ssr}.test.ts?(x)'],
            coveragePathIgnorePatterns: ['/index.tsx?$'],
        },
        {
            ...initialProjectOptions,
            displayName: 'ssr' /* server side rendering */,
            testEnvironment: 'node',
            testMatch: ['**/*.ssr.test.ts?(x)'],
            coveragePathIgnorePatterns: ['/index.tsx?$'],
        },
    ],
    coverageReporters: ['lcov', 'text', 'text-summary', 'clover'],
};

export default config;
