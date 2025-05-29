const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { patchWebpackConfig } = require('storybook-addon-live-examples/dist/cjs/utils');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { DefinePlugin, NormalModuleReplacementPlugin } = require('webpack');
const postcssConfig = require('../postcss.config');
const postcssImport = require('postcss-import');
const loadCss = require('postcss-import/lib/load-content');
const { getPackagesSync } = require('@manypkg/get-packages');

const cssModuleRegex = /\.module\.css$/;
const cssRegex = /\.css$/;
const distDir = path.resolve(__dirname, '../dist');
const repositoryRoot = path.resolve(__dirname, '..');
const { packages } = getPackagesSync(repositoryRoot);
const rootPkg = packages.find(({ packageJson }) => packageJson.name === '@alfalab/core-components');
const rootPkgDependencies = Object.keys({
    ...rootPkg.packageJson.dependencies,
    ...rootPkg.packageJson.peerDependencies,
}).filter((name) => name.startsWith('@alfalab/core-components-'));
const vars = packages.find(
    ({ packageJson }) => packageJson.name === '@alfalab/core-components-vars',
);

const addDirsForTranspile = (config) => {
    config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
            rule.oneOf.forEach((nestedRule) => {
                if (
                    nestedRule.loader &&
                    nestedRule.test.test('.tsx') &&
                    nestedRule.loader.includes('babel-loader')
                ) {
                    nestedRule.include = [...nestedRule.include, ...packages.map(({ dir }) => dir)];
                }
            });
        }
    });
};

function modifyCssRules(config) {
    const group = config.module.rules.find((rule) => rule.oneOf !== undefined);
    const cssRuleIndex = group.oneOf.findIndex(
        (rule) => rule.test.toString() === cssRegex.toString(),
    );
    const cssModuleRuleIndex = group.oneOf.findIndex(
        (rule) => rule.test.toString() === cssModuleRegex.toString(),
    );

    group.oneOf[cssRuleIndex] = {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    sourceMap: true,
                },
            },
            'postcss-loader',
        ],
    };
    group.oneOf[cssModuleRuleIndex] = {
        test: cssModuleRegex,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        namedExport: false,
                        exportLocalsConvention: 'as-is',
                        localIdentName: '[local]_[hash:base64:5]',
                    },
                    importLoaders: 1,
                    sourceMap: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        config: process.env.BUILD_STORYBOOK_FROM_DIST === 'true',
                        plugins: [...postcssConfig.plugins].map((plugin) =>
                            plugin.postcssPlugin === 'postcss-import'
                                ? postcssImport({
                                      warnOnEmpty: false,
                                      load: async (filename, importOptions) => {
                                          if (
                                              // check if file the same
                                              path.relative(
                                                  filename,
                                                  path.join(vars.dir, 'src/index.css'),
                                              ) === ''
                                          ) {
                                              // TODO: warnOnEmpty добавлен только в 16й версии postcss-import. Но для нее требуется node >= 18
                                              // В текущей версиии postcss-import импорт пустого файла вызывает ошибку
                                              // https://github.com/postcss/postcss-import/issues/84
                                              return '/* */';
                                          }

                                          return loadCss(filename);
                                      },
                                  })
                                : plugin,
                        ),
                    },
                },
            },
        ],
    };
}

function disableReactRefreshOverlay(config) {
    const reactRefreshPlugin = config.plugins.find(
        (p) => p.constructor.name === 'ReactRefreshPlugin',
    );

    if (reactRefreshPlugin?.options?.overlay) {
        reactRefreshPlugin.options.overlay = false;
    }
}

module.exports = {
    stories: [
        '../packages/**/*.docs.@(ts|md)x',
        '../packages/**/*.stories.@(ts|md)x',
        '../docs/**/*.stories.@(ts|md)x',
    ],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-a11y',
        {
            name: '@storybook/addon-docs',
            options: {
                transcludeMarkdown: true,
            },
        },
        'storybook-addon-live-examples',
        '@storybook/preset-create-react-app',
        './addons/theme-switcher',
        './addons/mode-switcher',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true,
            },
        },
    },
    docs: {
        autodocs: false,
        defaultName: 'Docs',
    },
    staticDirs: ['./public'],
    webpackFinal: async (config, { configType: mode }) => {
        addDirsForTranspile(config);
        patchWebpackConfig(config);
        modifyCssRules(config);
        disableReactRefreshOverlay(config);

        config.devtool = mode === 'PRODUCTION' ? false : 'eval-cheap-module-source-map';

        config.resolve = {
            fallback: {
                ...config.resolve.fallback,
                querystring: require.resolve('querystring-es3'),
            },
            plugins: config.resolve.plugins,
            alias: {
                ...config.resolve.alias,
                storybook: path.resolve(__dirname),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        };

        config.optimization = {
            ...config.optimization,
            usedExports: true,
            splitChunks: {
                cacheGroups: {
                    //Собираем единственный main.css
                    main: {
                        name: 'main',
                        type: 'css/mini-extract',
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        };

        // Выпиливаем ненужные плагины.
        config.plugins = config.plugins.filter((plugin) => {
            return !['ESLintWebpackPlugin', 'MiniCssExtractPlugin'].includes(
                plugin.constructor.name,
            );
        });

        config.plugins.unshift(
            new NormalModuleReplacementPlugin(/^@alfalab\/core-components[-\/]/, function (
                resource,
            ) {
                if (
                    resource.request === '@alfalab/core-components/package.json' ||
                    resource.request === '@alfalab/core-components-vars/src/index.css'
                ) {
                    return;
                }

                resource.request = resource.request.replace(
                    /^@alfalab\/core-components[-/]([^/]+)\/?(.*)/,
                    (_, componentName, entrypoint) => {
                        const pkgName = `@alfalab/core-components-${componentName}`;

                        if (
                            process.env.BUILD_STORYBOOK_FROM_DIST === 'true' &&
                            rootPkgDependencies.includes(pkgName)
                        ) {
                            return path.join(
                                distDir,
                                componentName,
                                entrypoint.startsWith('modern') ? '' : 'modern',
                                entrypoint,
                            );
                        }
                        const pkg = packages.find(({ packageJson: { name } }) => name === pkgName);

                        return path.join(pkg.dir, 'src', entrypoint);
                    },
                );

                if (resource.createData) {
                    resource.createData.request = resource.request;
                }
            }),
        );

        config.plugins.push(
            new MiniCssExtractPlugin({
                ignoreOrder: true,
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: () => ({
                        plugins: [
                            require('postcss-discard-duplicates'),
                            // Минифицируем css для prod сторибука.
                            ...(process.env.BUILD_STORYBOOK_FROM_DIST === 'true'
                                ? require('cssnano-preset-default')().plugins
                                : []),
                        ],
                    }),
                },
            }),
            new DefinePlugin({
                'process.env.BUILD_STORYBOOK_FROM_DIST': JSON.stringify(
                    process.env.BUILD_STORYBOOK_FROM_DIST,
                ),
                'process.env.CORE_COMPONENTS_ENV': JSON.stringify(
                    mode /* 'DEVELOPMENT' | 'PRODUCTION' */
                        .toLowerCase(),
                ),
            }),
        );
        return config;
    },
};
