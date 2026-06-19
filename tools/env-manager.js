const { decodeBase64 } = require('./decode-base-64');

const envManager = {
    SERVICE_CDN: decodeBase64('YWxmYWJhbmsuc2VydmljZWNkbi5ydQ=='),
    CORE_COMPONENTS_CDN_ICON_BASE_URL: decodeBase64(
        'aHR0cHM6Ly9hbGZhYmFuay5zZXJ2aWNlY2RuLnJ1L2ljb25z',
    ),
    CORE_COMPONENTS_CARD_IMAGE_BASE_URL: decodeBase64(
        'aHR0cHM6Ly9vbmxpbmUuYWxmYWJhbmsucnUvY2FyZHMtaW1hZ2VzL2NhcmRzLw==',
    ),
    CORE_COMPONENTS_CARD_IMAGE_BASE_URL_JEST: decodeBase64(
        'aHR0cHM6Ly9leGFtcGxlLmNvbS9jYXJkcy1pbWFnZXMvY2FyZHMv',
    ),
};

module.exports = { envManager };
