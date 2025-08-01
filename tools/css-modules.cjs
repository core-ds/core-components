const path = require('node:path');

const { readPackagesFileSync } = require('./read-packages-file.cjs');

const CSS_PACKAGES = readPackagesFileSync(path.join(__dirname, '.css-packages'));

/**
 * @param {string} id
 */
function isCssModulesAvailable(id) {
    return !CSS_PACKAGES.includes(id);
}

module.exports = { isCssModulesAvailable };
