import replace from '@rollup/plugin-replace';
import webpack from 'webpack';

const { DefinePlugin } = webpack;

const decode = (value) => Buffer.from(value, 'base64').toString('utf-8');

const envManager = {
    CORE_COMPONENTS_SERVICE_CDN: decode('YWxmYWJhbmsuc2VydmljZWNkbi5ydQ=='),
    CORE_COMPONENTS_METRICS: decode('bWV0cmljcy5hbGZhYmFuay5ydQ=='),
    CORE_COMPONENTS_CDN_ICON_BASE_URL: decode('aHR0cHM6Ly9hbGZhYmFuay5zZXJ2aWNlY2RuLnJ1L2ljb25z'),
    CORE_COMPONENTS_CARD_IMAGE_BASE_URL: decode(
        'aHR0cHM6Ly9vbmxpbmUuYWxmYWJhbmsucnUvY2FyZHMtaW1hZ2VzL2NhcmRzLw==',
    ),
};

const jestEnv = {
    CORE_COMPONENTS_CARD_IMAGE_BASE_URL: decode(
        'aHR0cHM6Ly9leGFtcGxlLmNvbS9jYXJkcy1pbWFnZXMvY2FyZHMv',
    ),
};

const createWebpackPlugin = (mode) =>
    new DefinePlugin({
        'process.env.BUILD_STORYBOOK_FROM_DIST': JSON.stringify(
            process.env.BUILD_STORYBOOK_FROM_DIST,
        ),
        'process.env.CORE_COMPONENTS_ENV': JSON.stringify(
            mode /* 'DEVELOPMENT' | 'PRODUCTION' */
                .toLowerCase(),
        ),
        'process.env.CORE_COMPONENTS_VARIANT': JSON.stringify(process.env.CORE_COMPONENTS_VARIANT),
        'process.env.CORE_COMPONENTS_SERVICE_CDN': JSON.stringify(
            envManager.CORE_COMPONENTS_SERVICE_CDN,
        ),
        'process.env.CORE_COMPONENTS_CDN_ICON_BASE_URL': JSON.stringify(
            envManager.CORE_COMPONENTS_CDN_ICON_BASE_URL,
        ),
        'process.env.CORE_COMPONENTS_CARD_IMAGE_BASE_URL': JSON.stringify(
            envManager.CORE_COMPONENTS_CARD_IMAGE_BASE_URL,
        ),
    });

const createManagerEnv = (config) => ({
    ...config,
    CORE_COMPONENTS_METRICS: envManager.CORE_COMPONENTS_METRICS,
});

const createRollupPlugin = () =>
    replace({
        values: {
            'process.env.CORE_COMPONENTS_ENV': JSON.stringify('production'),
            'process.env.CORE_COMPONENTS_CDN_ICON_BASE_URL': JSON.stringify(
                envManager.CORE_COMPONENTS_CDN_ICON_BASE_URL,
            ),
            'process.env.CORE_COMPONENTS_CARD_IMAGE_BASE_URL': JSON.stringify(
                envManager.CORE_COMPONENTS_CARD_IMAGE_BASE_URL,
            ),
        },
        preventAssignment: true,
    });

export { envManager, jestEnv, createWebpackPlugin, createManagerEnv, createRollupPlugin };
