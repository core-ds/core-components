const path = require('path');
const componentsResolver = require('./utils/componentsResolver');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cssModuleRegex = /\.module\.css$/;
const cssRegex = /\.css$/;
const storiesRegex = /(stories|story)\.mdx$/;

const isIeMode = process.env.STORYBOOK_IE_MODE === 'true';

const babelPresetEnvOptions = {
    shippedProposals: true,
    modules: false,
    targets: 'defaults',
};

const babelPresetEnvPreset = require.resolve('@babel/preset-env');

const addPackagesDir = config => {
    config.module.rules.forEach(rule => {
        if (rule.oneOf) {
            rule.oneOf.forEach(nestedRule => {
                if (nestedRule.loader && nestedRule.loader.includes('babel-loader')) {
                    nestedRule.include.push(path.resolve(__dirname, '../packages'));

                    if (isIeMode && nestedRule.options && nestedRule.options.presets) {
                        nestedRule.options.sourceType = 'unambiguous';
                        nestedRule.options.presets.unshift([
                            babelPresetEnvPreset,
                            { ...babelPresetEnvOptions, loose: true },
                        ]);
                    }
                }
            });
        }
    });
};

const addPresetEnvToMdxLoader = config => {
    config.module.rules.forEach(rule => {
        if (String(rule.test) === String(storiesRegex)) {
            if (rule.use) {
                rule.use.forEach(nestedRule => {
                    if (nestedRule.loader && nestedRule.loader.includes('babel-loader')) {
                        nestedRule.options.presets.unshift([
                            babelPresetEnvPreset,
                            babelPresetEnvOptions,
                        ]);
                    }
                });
            }
        }
    });
};

const es6Transpiler = () => {
    const nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = [
        'acorn-jsx',
        'regexpu-core',
        'd3',
        'internmap',
        'slash',
        'prettier',
        'unicode-match-property-ecmascript',
        'unicode-match-property-value-ecmascript',
        'strip-ansi',
        'react-github-btn',
    ].map(n => new RegExp(`[\\\\/]node_modules[\\\\/]${n}`));

    const include = input => {
        return !!nodeModulesThatNeedToBeParsedBecauseTheyExposeES6.find(p => input.match(p));
    };

    return {
        test: /\.js$/,
        use: [
            {
                loader: require.resolve('babel-loader'),
                options: {
                    sourceType: 'unambiguous',
                    presets: [
                        [babelPresetEnvPreset, babelPresetEnvOptions],
                        require.resolve('@babel/preset-react'),
                    ],
                },
            },
        ],
        include,
    };
};

module.exports = {
    stories: ['../packages/**/*.stories.@(ts|md)x', '../docs/**/*.stories.@(ts|md)x'],
    addons: [
        '@storybook/addon-knobs',
        {
            name: '@storybook/addon-docs',
            options: { transcludeMarkdown: true },
        },
        'storybook-addon-live-examples',
        '@storybook/preset-create-react-app',
        './addons/theme-switcher/register.js',
        './addons/mode-switcher/register.js',
    ],
    webpackFinal: async config => {
        addPackagesDir(config);

        config.resolve = {
            plugins: [componentsResolver],
            alias: {
                storybook: path.resolve(__dirname),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        };

        config.performance.hints = false;

        const group = config.module.rules.find(rule => rule.oneOf !== undefined);

        const cssRuleIndex = group.oneOf.findIndex(
            rule => rule.test.toString() === cssRegex.toString(),
        );

        const cssModuleRuleIndex = group.oneOf.findIndex(
            rule => rule.test.toString() === cssModuleRegex.toString(),
        );

        group.oneOf[cssRuleIndex] = {
            test: /\.css$/,
            exclude: cssModuleRegex,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                    },
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
                    options: {
                        hmr: true,
                    },
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

        if (isIeMode) {
            config.module.rules.push(es6Transpiler());
            addPresetEnvToMdxLoader(config);
        }

        config.plugins.push(
            new MiniCssExtractPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
                cssProcessorPluginOptions: {
                    preset: () => ({
                        plugins: [
                            require('postcss-discard-duplicates'),
                            ...(isIeMode
                                ? [require('postcss-custom-properties').bind({ preserve: false })]
                                : []),
                        ],
                    }),
                },
            }),
        );

        return config;
    },
};
