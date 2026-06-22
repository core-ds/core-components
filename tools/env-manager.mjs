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

export { envManager, jestEnv };
