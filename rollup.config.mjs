import multiInput from 'rollup-plugin-multi-input';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import {
    coreComponentsResolver,
    externalsResolver,
} from './tools/rollup/core-components-resolver.mjs';
import { processCss } from './tools/rollup/process-css.mjs';
import { pkg, currentComponentName } from './tools/rollup/common.mjs';
import { externalsWithEntryPoints } from './tools/rollup/external-with-entry-points.mjs';

const externals = [
    ...externalsWithEntryPoints(Object.keys(pkg.dependencies || {})),
    ...Object.keys(pkg.peerDependencies || {}),
];

/**
 * @type {Partial<import('rollup').RollupOptions>}
 */
const baseConfig = {
    cache: false,
    input: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.{test,stories}.{ts,tsx}',
        '!src/**/*.mdx',
        '!src/**/*.d.ts',
    ],
    plugins: [json()],
};

const multiInputPlugin = multiInput();

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
            transform: (contents, name) => {
                if (name.endsWith('.css')) {
                    return contents
                        .toString()
                        .replaceAll(
                            /@import.*\/(.*)\/src\/(.*)\.css['"];/g,
                            "@import '@alfalab/core-components-$1/src/$2.css';",
                        );
                }

                return contents;
            },
        },
    ],
});

/**
 * Сборка ES5 с commonjs модулями.
 * @type {import('rollup').RollupOptions}
 */
const es5 = {
    ...baseConfig,
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
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        externalsResolver(externals),
        typescript({
            baseUrl: '.',
            rootDir: 'src',
            outDir: 'dist',
            declarationDir: 'dist',
            tsconfig: './tsconfig.json',
            tsBuildInfoFile: 'tsconfig.tsbuildinfo',
        }),
        processCss(),
        assetsCopyPlugin('dist'),
        copy({ flatten: true, targets: [{ src: ['**/package.json'], dest: 'dist' }] }),
        sourceCopyPlugin,
    ],
};

/**
 * Сборка ES5 с commonjs модулями.
 * Css-модули поставляются как есть, не компилируются.
 * @type {import('rollup').RollupOptions}
 */
const cssm = {
    ...baseConfig,
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
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        coreComponentsResolver('cssm'),
        externalsResolver(externals),
        typescript({
            baseUrl: '.',
            rootDir: 'src',
            outDir: 'dist/cssm',
            declarationDir: 'dist/cssm',
            tsconfig: './tsconfig.json',
            tsBuildInfoFile: 'tsconfig.tsbuildinfo',
        }),
        processCss({ modules: false }),
        assetsCopyPlugin('dist/cssm'),
    ],
};

/**
 * Сборка ES2020 с esm модулями.
 * @type {import('rollup').RollupOptions}
 */
const modern = {
    ...baseConfig,
    output: [
        {
            dir: 'dist/modern',
            format: 'esm',
            generatedCode: 'es2015',
            hoistTransitiveImports: false,
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        coreComponentsResolver('modern'),
        externalsResolver(externals),
        typescript({
            baseUrl: '.',
            rootDir: 'src',
            outDir: 'dist/modern',
            declarationDir: 'dist/modern',
            tsconfig: './tsconfig.json',
            tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            target: 'es2020',
        }),
        processCss(),
        assetsCopyPlugin('dist/modern'),
    ],
};

/**
 * Сборка ES2020 с esm модулями.
 * Css-модули поставляются как есть, не компилируются.
 * Отключен импорт базовых токенов.
 * @type {import('rollup').RollupOptions}
 */
const moderncssm = {
    ...baseConfig,
    output: [
        {
            dir: 'dist/moderncssm',
            format: 'esm',
            generatedCode: 'es2015',
            hoistTransitiveImports: false,
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        coreComponentsResolver('moderncssm'),
        externalsResolver(externals),
        typescript({
            baseUrl: '.',
            rootDir: 'src',
            outDir: 'dist/moderncssm',
            declarationDir: 'dist/moderncssm',
            tsconfig: './tsconfig.json',
            tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            target: 'es2020',
        }),
        processCss({
            noCommonVars: true,
            modules: false,
        }),
        assetsCopyPlugin('dist/moderncssm'),
    ],
};

/**
 * Сборка ES5 с esm модулями.
 * @type {import('rollup').RollupOptions}
 */
const esm = {
    ...baseConfig,
    output: [
        {
            dir: 'dist/esm',
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src',
            hoistTransitiveImports: false,
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        coreComponentsResolver('esm'),
        externalsResolver(externals),
        multiInputPlugin,
        typescript({
            baseUrl: '.',
            rootDir: 'src',
            outDir: 'dist/esm',
            declarationDir: 'dist/esm',
            tsconfig: './tsconfig.json',
            tsBuildInfoFile: 'tsconfig.tsbuildinfo',
        }),
        processCss(),
        assetsCopyPlugin('dist'),
    ],
};

/**
 * @type {import('rollup').RollupOptions}
 */
const root = {
    input: 'postinstall.js',
    plugins: [
        copy({
            targets: [
                {
                    src: 'package.json',
                    dest: 'dist',
                    transform: (contents) => {
                        const json = JSON.parse(contents.toString('utf8'));

                        json.scripts = {
                            postinstall: 'node postinstall.js',
                        };

                        return `${JSON.stringify(json, null, 2)}\n`;
                    },
                },
            ],
        }),
    ],
    output: { dir: 'dist' },
};

const configs =
    currentComponentName === 'root'
        ? [root]
        : process.env.BUILD_MODERN_ONLY === 'true'
        ? [modern]
        : [
              es5,
              modern,
              esm,
              currentComponentName !== 'themes' && cssm,
              currentComponentName !== 'themes' && moderncssm,
          ].filter(Boolean);

export default configs;
