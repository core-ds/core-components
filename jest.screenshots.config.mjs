// @ts-check

/* eslint-disable import/no-extraneous-dependencies */
import fse from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJsWithTsLegacyPreset, pathsToModuleNameMapper } from 'ts-jest';

import decodePkg from './tools/decode-base-64.js';

const { decodeBase64 } = decodePkg;
const dirname = path.dirname(fileURLToPath(import.meta.url));

const tsconfig = fse.readJsonSync(path.join(dirname, 'tsconfig.test.json'), { encoding: 'utf8' });

const tsJestPreset = createJsWithTsLegacyPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

process.env.CDN_ENV = decodeBase64('YWxmYWJhbmsuc2VydmljZWNkbi5ydQ==');

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
