const fs = require('node:fs');
const path = require('node:path');
const resolve = require('resolve');

/**
 * @param {string} id
 * @param {boolean} [root]
 * @returns {string}
 */
function resolveInternal(id, root = true) {
    const resolveOptions = {
        basedir: path.resolve(__dirname, '..'),
    };

    const resolved = fs.realpathSync(
        resolve.sync(root ? `${id}/package.json` : id, resolveOptions),
        { encoding: 'utf8' },
    );

    return root ? path.dirname(resolved) : resolved;
}

/**
 * @param {string} pkg
 * @returns {boolean}
 */
function isInternal(pkg) {
    return pkg.startsWith('@alfalab/core-components-');
}

module.exports = { resolveInternal, isInternal };
