// @ts-check

/* eslint-disable import/no-extraneous-dependencies */

import fse from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJsWithTsLegacyPreset, pathsToModuleNameMapper } from 'ts-jest';

import { resolveInternal } from './tools/resolve-internal.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const tsconfig = fse.readJsonSync(path.join(dirname, 'tsconfig.test.json'), { encoding: 'utf8' });

const IGNORED_PACKAGES = ['@alfalab/core-components-codemod'];

/**
 * Список пакетов которые нужно трансформировать, так как react-markdown@7.0.0 ESM-only
 * @see https://github.com/remarkjs/react-markdown/blob/main/changelog.md#700---2021-08-13
 */
const REACT_MARKDOWN_IGNORED_MODULES = [
    'react-markdown',
    'remark-.*',
    'unist-util-.*',
    'vfile.*',
    'unified',
    'bail',
    'is-plain-obj',
    'trough',
    'mdast-.*',
    'micromark.*',
    'decode-named-character-reference',
    'trim-lines',
    'property-information',
    'hast-util-.*',
    '.*-separated-tokens',
    'devlop',
    'estree-util-is-identifier-name',
    'html-url-attributes',
];

const IGNORED_MODULES = ['@alfalab/hooks', 'simplebar', 'uuid', ...REACT_MARKDOWN_IGNORED_MODULES];

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
        transformIgnorePatterns: [`/node_modules/(?!(${IGNORED_MODULES.join('|')})/)`],
    },
];

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
    projects: [
        {
            ...initialProjectOptions,
            displayName: 'jsdom',
            testEnvironment: 'jsdom',
            testMatch: ['**/*.test.ts?(x)', '!**/*.{node,screenshots,ssr}.test.ts?(x)'],
            coveragePathIgnorePatterns: ['/index.tsx?$'],
        },
        {
            ...initialProjectOptions,
            displayName: 'node',
            testEnvironment: 'node',
            testMatch: ['**/*.{node,ssr}.test.ts?(x)'],
            coveragePathIgnorePatterns: ['/index.tsx?$'],
        },
    ],
    coverageReporters: ['lcov', 'text', 'text-summary', 'clover'],
};

export default config;
