// @ts-check

/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'jest';
import path from 'node:path';
import * as process from 'node:process';
import slash from 'slash';
import { createJsWithTsEsmPreset, pathsToModuleNameMapper } from 'ts-jest';

import { resolveInternal } from './tools/resolve-internal.cjs';
import tsconfig from './tsconfig.test.json' with { type: 'json' };

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

const IGNORED_MODULES = [
    '@alfalab/hooks',
    'simplebar',
    'uuid',
    'swiper',
    ...REACT_MARKDOWN_IGNORED_MODULES,
];

const tsJestPreset = createJsWithTsEsmPreset({ tsconfig: '<rootDir>/tsconfig.test.json' });

/**
 * @type {import('ts-jest').JestConfigWithTsJest['projects']}
 */
const [initialProjectOptions] = [
    {
        ...tsJestPreset,
        globalSetup: '<rootDir>/tools/jest/globalSetup.ts',
        setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.ts'],
        modulePathIgnorePatterns: ['/dist/', '/ts-dist/'],
        moduleNameMapper: {
            ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
            '^.+\\.css$': 'identity-obj-proxy',
        },
        testPathIgnorePatterns: IGNORED_PACKAGES.map((pkg) => {
            const relativeDir = path.relative(import.meta.dirname, resolveInternal(pkg));

            return `<rootDir>/${slash(relativeDir)}`;
        }),
        transformIgnorePatterns: [`/node_modules/(?!(${IGNORED_MODULES.join('|')})/)`],
    },
];

export default defineConfig({
    projects: [
        {
            ...initialProjectOptions,
            displayName: 'jsdom',
            testEnvironment: 'jsdom',
            testMatch: [
                '**/*.{spec,test}.ts?(x)',
                '!**/*.{node,screenshots,ssr}.{spec,test}.ts?(x)',
            ],
            coveragePathIgnorePatterns: ['/index.tsx?$'],
        },
        {
            ...initialProjectOptions,
            displayName: 'node',
            testEnvironment: 'node',
            testMatch: ['**/*.{node,ssr}.{spec,test}.ts?(x)'],
            coveragePathIgnorePatterns: ['/index.tsx?$'],
        },
    ],
    coverageReporters: ['lcov', 'text', 'text-summary', 'clover'],
    reporters:
        process.env.CI === 'true'
            ? [['github-actions', { silent: false }], 'summary']
            : ['default'],
});
