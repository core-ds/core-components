import { decodeBase64 } from '../base64';

/**
 * /cards-images/cards/
 */
export function getCardImages() {
    return decodeBase64('aHR0cHM6Ly9vbmxpbmUuYWxmYWJhbmsucnUvY2FyZHMtaW1hZ2VzL2NhcmRzLw==');
}

/**
 * cdn/icons
 */
export function getCDNIcons() {
    return decodeBase64('aHR0cHM6Ly9hbGZhYmFuay5zZXJ2aWNlY2RuLnJ1L2ljb25z');
}
