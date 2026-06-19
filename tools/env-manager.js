const { decodeBase64 } = require('./decode-base-64');

const AO_DOMAIN = decodeBase64('b25saW5lLmFsZmFiYW5rLnJ1');
const AO_DOMAIN_JEST = 'example.com';

function getAOCards(domain) {
    return `https://${domain}/cards-images/cards/`;
}

const envManager = {
    SERVICE_CDN: decodeBase64('YWxmYWJhbmsuc2VydmljZWNkbi5ydQ=='),
    CDN_ICONS: decodeBase64('aHR0cHM6Ly9hbGZhYmFuay5zZXJ2aWNlY2RuLnJ1L2ljb25z'),
    AO_CARDS: getAOCards(AO_DOMAIN),
    AO_CARDS_JEST: getAOCards(AO_DOMAIN_JEST),
};

module.exports = { envManager };
