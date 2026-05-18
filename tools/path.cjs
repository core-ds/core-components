const path = require('node:path');
const fs = require('node:fs');

/**
 * @see {@link https://stackoverflow.com/a/77003239}
 * @param {string} a
 * @param {string} b
 */
function isSamePath(a, b) {
    const [realA, realB] = [a, b].map((p) => fs.realpathSync(p, { encoding: 'utf8' }));

    return path.relative(realA, realB) === '';
}

module.exports = { isSamePath };
