const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { patchWebpackConfig } = require('storybook-addon-live-examples/dist/cjs/utils');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ComponentResolverPlugin = require('./utils/componentsResolver');
const DefinePlugin = require('webpack').DefinePlugin;
const cssModuleRegex = /\.module\.css$/;
const cssRegex = /\.css$/;

const addDirsForTranspile = (config) => {
    config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
            rule.oneOf.forEach((nestedRule) => {
                if (
                    nestedRule.loader &&
                    nestedRule.test.test('.tsx') &&
                    nestedRule.loader.includes('babel-loader')
                ) {
                    const paths = [path.resolve(__dirname, '../packages')];
                    nestedRule.include.push(...paths);
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
        test: /\.css$/,
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
                        localIdentName: '[local]_[hash:base64:5]',
                    },
                    importLoaders: 1,
                    sourceMap: true,
                },
            },
            'postcss-loader',
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
            plugins: [...config.resolve.plugins, new ComponentResolverPlugin()],
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
