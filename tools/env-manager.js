const { decodeBase64 } = require('./decode-base-64');

const CDN_DOMAIN = decodeBase64('YWxmYWJhbmsuc2VydmljZWNkbi5ydQ==');
const AO_DOMAIN = decodeBase64('b25saW5lLmFsZmFiYW5rLnJ1');
const AO_DOMAIN_JEST = 'example.com';

function getAOCards(domain) {
    return `https://${domain}/cards-images/cards/`;
}

const envManager = {
    CDN_DOMAIN,
    CDN_ICONS: `https://${CDN_DOMAIN}/icons`,
    AO_CARDS: getAOCards(AO_DOMAIN),
    AO_CARDS_JEST: getAOCards(AO_DOMAIN_JEST),
};

module.exports = { envManager };
