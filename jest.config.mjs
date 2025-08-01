/* eslint-disable import/no-extraneous-dependencies */

import fse from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJsWithTsLegacyPreset, pathsToModuleNameMapper } from 'ts-jest';

import { resolveInternal } from './tools/resolve-internal.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const tsconfig = fse.readJsonSync(path.join(dirname, 'tsconfig.test.json'), { encoding: 'utf8' });

const IGNORED_PACKAGES = ['@alfalab/core-components-codemod'];
const IGNORED_MODULES = ['@alfalab/hooks', 'simplebar', 'uuid'];

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

/**
 * @type {import('ts-jest').JestConfigWithTsJest['projects']}
 */
const [initialProjectOptions] = [
    {
        ...tsJestPreset,
        globalSetup: '<rootDir>/tools/jest/globalSetup.ts',
        setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.ts'],
        modulePathIgnorePatterns: ['/dist/'],
        moduleNameMapper: {
            ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
            '\\.css$': 'identity-obj-proxy',
        },
        testPathIgnorePatterns: IGNORED_PACKAGES.map(
            (pkg) => `<rootDir>/${path.relative(dirname, resolveInternal(pkg))}`,
        ),
        transformIgnorePatterns: [`/node_modules/(?!(${IGNORED_MODULES.join('|')}))/`],
        // see https://jestjs.io/blog/2022/08/25/jest-29
        snapshotFormat: {
            escapeString: true,
            printBasicPrototype: true,
        },
    },
];

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
