/* eslint-disable @typescript-eslint/no-var-requires, global-require */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const componentsResolver = require('../.storybook/utils/componentsResolver');

const cssModuleRegex = /\.module\.css$/;

const config = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    devtool: 'source-map',
    module: {
        rules: [
            {
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
            },
            {
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
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules/,
                options: {
                    presets: [
                        [
                            require.resolve('@babel/preset-env'),
                            {
                                targets: {
                                    ie: '11',
                                },
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.(bmp|gif|jpe?g|png)$/,
                loader: require.resolve('url-loader'),
                options: { limit: 10000, name: 'media/[name].[hash:8].[ext]' },
            },
        ],
    },
    resolve: {
        alias: {
            storybook: path.resolve(__dirname, '../.storybook'),
        },
        plugins: [componentsResolver],
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
        modules: ['node_modules', 'packages', 'src'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: false,
                    annotation: true,
                },
            },
            cssProcessorPluginOptions: {
                preset: {
                    plugins: [
                        require('postcss-discard-duplicates'),
                        require('postcss-custom-properties').bind(null, { preserve: false }),
                    ],
                },
            },
        }),
        new HTMLWebpackPlugin({
            template: './test-stand/assets/index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        hot: true,
        liveReload: true,
        open: true,
        port: 3000,
        disableHostCheck: true,
    },
};

module.exports = config;
