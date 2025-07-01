/* eslint-disable import/no-extraneous-dependencies, no-nested-ternary */

import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import detectIndent from 'detect-indent';
import fse from 'fs-extra';
import { globbySync } from 'globby';
import path from 'node:path';
import { cwd } from 'node:process';
import { defineConfig } from 'rollup';
import copy from 'rollup-plugin-copy';
import ts from 'typescript';

import {
    coreComponentsResolver,
    externalsResolver,
} from './tools/rollup/core-components-resolver.mjs';
import { processCss } from './tools/rollup/process-css.mjs';

const { ScriptTarget } = ts;

const pkg = fse.readJsonSync(path.join(cwd(), 'package.json'), { encoding: 'utf8' });

const externals = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
];

const baseConfig = () =>
    defineConfig({
        cache: false,
        input: globbySync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.{test,stories}.{ts,tsx}', 'src/**/*.mdx', 'src/**/*.d.ts'],
        }),
        plugins: [
            json(),
            replace({ 'process.env.CORE_COMPONENTS_ENV': JSON.stringify('production') }),
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
                dir: 'dist',
                format: 'cjs',
                interop: 'compat',
                dynamicImportInCjs: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                hoistTransitiveImports: false,
                sourcemap: true,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            externalsResolver(externals),
            typescript({
                exclude: ['**/*.stories*', '**/*.test*'],
                target: ScriptTarget.ES5,
                outDir: 'dist',
                declarationDir: 'dist',
                tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            }),
            processCss(),
            assetsCopyPlugin('dist'),
            copy({ flatten: false, targets: [{ src: '**/package.json', dest: 'dist' }] }),
            sourceCopyPlugin,
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
                hoistTransitiveImports: false,
                sourcemap: true,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('cssm'),
            externalsResolver(externals),
            typescript({
                exclude: ['**/*.stories*', '**/*.test*'],
                target: ScriptTarget.ES5,
                outDir: 'dist/cssm',
                declarationDir: 'dist/cssm',
                tsBuildInfoFile: 'tsconfig.cssm.tsbuildinfo',
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
                hoistTransitiveImports: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: true,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('modern'),
            externalsResolver(externals),
            typescript({
                exclude: ['**/*.stories*', '**/*.test*'],
                target: ScriptTarget.ES2020,
                outDir: 'dist/modern',
                declarationDir: 'dist/modern',
                tsBuildInfoFile: 'tsconfig.modern.tsbuildinfo',
            }),
            processCss(),
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
                hoistTransitiveImports: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: true,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('moderncssm'),
            externalsResolver(externals),
            typescript({
                exclude: ['**/*.stories*', '**/*.test*'],
                target: ScriptTarget.ES2020,
                outDir: 'dist/moderncssm',
                declarationDir: 'dist/moderncssm',
                tsBuildInfoFile: 'tsconfig.moderncssm.tsbuildinfo',
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
                hoistTransitiveImports: false,
                sourcemap: true,
                sourcemapPathTransform: (relativeSourcePath) =>
                    path.relative('../..', relativeSourcePath),
            },
        ],
        plugins: [
            ...base.plugins,
            coreComponentsResolver('esm'),
            externalsResolver(externals),
            typescript({
                exclude: ['**/*.stories*', '**/*.test*'],
                target: ScriptTarget.ES5,
                outDir: 'dist/esm',
                declarationDir: 'dist/esm',
                tsBuildInfoFile: 'tsconfig.esm.tsbuildinfo',
            }),
            processCss(),
            assetsCopyPlugin('dist'),
        ],
    });
};

const root = () =>
    defineConfig({
        input: 'src/postinstall.js',
        plugins: [
            copy({
                targets: [
                    {
                        src: 'package.json',
                        dest: 'dist',
                        transform: (contents) => {
                            const content = contents.toString('utf8');
                            const { indent } = detectIndent(content);
                            const pkgJson = JSON.parse(content);

                            pkgJson.scripts.postinstall = 'node postinstall.js';

                            return `${JSON.stringify(pkgJson, null, indent)}\n`;
                        },
                    },
                ],
            }),
        ],
        output: { dir: 'dist' },
    });

export default pkg.name === '@alfalab/core-components'
    ? root()
    : process.env.BUILD_MODERN_ONLY === 'true'
    ? modern()
    : [
          es5(),
          modern(),
          esm(),
          pkg.name !== '@alfalab/core-components-themes' &&
              pkg.name !== '@alfalab/core-components-vars' &&
              cssm(),
          pkg.name !== '@alfalab/core-components-themes' &&
              pkg.name !== '@alfalab/core-components-vars' &&
              moderncssm(),
      ].filter(Boolean);
