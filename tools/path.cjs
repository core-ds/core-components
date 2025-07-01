const path = require('node:path');

/**
 * @see {@link https://stackoverflow.com/a/77003239}
 * @param {string} a
 * @param {string} b
 */
function isSamePath(a, b) {
    return path.relative(a, b) === '';
}

module.exports = { isSamePath };
