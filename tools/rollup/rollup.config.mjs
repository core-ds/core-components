/* eslint-disable import/no-extraneous-dependencies, no-nested-ternary */

import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import fse from 'fs-extra';
import path from 'node:path';
import { cwd, env } from 'node:process';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import copy from 'rollup-plugin-copy';
import { globSync } from 'tinyglobby';
import ts from 'typescript';

import { readPackagesFileSync } from '../read-packages-file.cjs';

import { coreComponentsResolver, externalsResolver } from './core-components-resolver.mjs';
import { processCss } from './process-css.mjs';
import { transformDeclarations } from './ts-declaration-transformer.mjs';

const { ScriptTarget } = ts;

const dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg = fse.readJsonSync(path.resolve(cwd(), 'package.json'), { encoding: 'utf8' });

const IS_ROOT_PACKAGE = pkg.name === '@alfalab/core-components';

const CSS_PACKAGES = readPackagesFileSync(path.join(dirname, '../.css-packages'));

const externals = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
];

const baseConfig = () =>
    defineConfig({
        cache: false,
        input: globSync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.{test,stories}.{ts,tsx}', 'src/**/*.mdx', 'src/**/*.d.ts'],
        }),
        plugins: [
            json(),
            replace({
                values: { 'process.env.CORE_COMPONENTS_ENV': JSON.stringify('production') },
                preventAssignment: true,
            }),
        ],
    });

const assetsCopyPlugin = (dest) =>
    copy({
        flatten: false,
        targets: [{ src: ['src/**/*.{png,svg,jpg,jpeg}', '!**/__image_snapshots__/**'], dest }],
    });

const sourceCopyPlugin = copy({
    flatten: false,
    targets: [
        {
            src: [
                'src/**/*.{ts,tsx,css,json,js,jsx}',
                '!**/{__image_snapshots__,__snapshots__,docs}/**',
                '!src/**/*.test.{ts,tsx}',
            ],
            dest: 'dist/src',
        },
    ],
});

/**
 * Сборка ES5 с commonjs модулями.
 */
const es5 = () => {
    const base = baseConfig();

    return defineConfig({
        ...base,
        output: [
            {
                esModule: true,
                dir: IS_ROOT_PACKAGE ? 'dist/es5' : 'dist',
                format: 'cjs',
                interop: 'compat',
                dynamicImportInCjs: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: !IS_ROOT_PACKAGE,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            externalsResolver(externals),
            typescript({
                tsconfig: 'tsconfig.build.json',
                target: ScriptTarget.ES5,
                outDir: IS_ROOT_PACKAGE ? 'dist/es5' : 'dist',
                declarationDir: IS_ROOT_PACKAGE ? 'dist/es5' : 'dist',
                outputToFilesystem: false,
            }),
            processCss(),
            assetsCopyPlugin('dist'),
            !IS_ROOT_PACKAGE && sourceCopyPlugin,
        ],
    });
};

/**
 * Сборка ES5 с commonjs модулями и динамическими миксинами.
 */
const dynamicMixins = () => {
    const base = baseConfig();

    return defineConfig({
        ...base,
        output: [
            {
                esModule: true,
                dir: 'dist/dynamic-mixins',
                format: 'cjs',
                interop: 'compat',
                dynamicImportInCjs: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: true,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            externalsResolver(externals),
            typescript({
                tsconfig: 'tsconfig.build.json',
                target: ScriptTarget.ES5,
                outDir: 'dist/dynamic-mixins',
                declarationDir: 'dist/dynamic-mixins',
                outputToFilesystem: false,
            }),
            processCss({ preserveDynamicMixins: true }),
            assetsCopyPlugin('dist/dynamic-mixins'),
        ],
    });
};

/**
 * Сборка ES5 с commonjs модулями.
 * Css-модули поставляются как есть, не компилируются.
 */
const cssm = () => {
    const base = baseConfig();

    return defineConfig({
        ...base,
        output: [
            {
                esModule: true,
                dir: 'dist/cssm',
                format: 'cjs',
                interop: 'compat',
                dynamicImportInCjs: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: !IS_ROOT_PACKAGE,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('cssm'),
            externalsResolver(externals),
            typescript({
                tsconfig: 'tsconfig.build.json',
                target: ScriptTarget.ES5,
                outDir: 'dist/cssm',
                declarationDir: 'dist/cssm',
                outputToFilesystem: false,
                transformers: transformDeclarations('cssm'),
            }),
            processCss({ modules: false }),
            assetsCopyPlugin('dist/cssm'),
        ],
    });
};

/**
 * Сборка ES2020 с esm модулями.
 */
const modern = () => {
    const base = baseConfig();

    return defineConfig({
        ...base,
        output: [
            {
                dir: 'dist/modern',
                format: 'esm',
                generatedCode: 'es2015',
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: !IS_ROOT_PACKAGE,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('modern'),
            externalsResolver(externals),
            typescript({
                tsconfig: 'tsconfig.build.json',
                target: ScriptTarget.ES2020,
                outDir: 'dist/modern',
                declarationDir: 'dist/modern',
                outputToFilesystem: false,
                transformers: transformDeclarations('modern'),
            }),
            processCss({
                preserveDynamicMixins: env.PRESERVE_DYNAMIC_MIXINS === 'true',
                preserveVars: !(env.BUILD_WITHOUT_CSS_VARS === 'true'),
            }),
            assetsCopyPlugin('dist/modern'),
        ],
    });
};

/**
 * Сборка ES2020 с esm модулями.
 * Css-модули поставляются как есть, не компилируются.
 * Отключен импорт базовых токенов.
 */
const moderncssm = () => {
    const base = baseConfig();

    return defineConfig({
        ...base,
        output: [
            {
                dir: 'dist/moderncssm',
                format: 'esm',
                generatedCode: 'es2015',
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: !IS_ROOT_PACKAGE,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('moderncssm'),
            externalsResolver(externals),
            typescript({
                tsconfig: 'tsconfig.build.json',
                target: ScriptTarget.ES2020,
                outDir: 'dist/moderncssm',
                declaration: 'dist/moderncssm',
                outputToFilesystem: false,
                transformers: transformDeclarations('moderncssm'),
            }),
            processCss({
                noCommonVars: true,
                modules: false,
            }),
            assetsCopyPlugin('dist/moderncssm'),
        ],
    });
};

/**
 * Сборка ES5 с esm модулями.
 */
const esm = () => {
    const base = baseConfig();

    return defineConfig({
        ...base,
        output: [
            {
                dir: 'dist/esm',
                format: 'esm',
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: !IS_ROOT_PACKAGE,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('esm'),
            externalsResolver(externals),
            typescript({
                tsconfig: 'tsconfig.build.json',
                target: ScriptTarget.ES5,
                outDir: 'dist/esm',
                declarationDir: 'dist/esm',
                outputToFilesystem: false,
                transformers: transformDeclarations('esm'),
            }),
            processCss(),
            assetsCopyPlugin('dist/esm'),
        ],
    });
};

export default env.BUILD_MODERN_ONLY === 'true'
    ? modern()
    : [
          es5(),
          modern(),
          esm(),
          !CSS_PACKAGES.includes(pkg.name) && cssm(),
          !CSS_PACKAGES.includes(pkg.name) && moderncssm(),
          dynamicMixins(),
      ].filter(Boolean);
