const fs = require('node:fs');

/**
 * @param {import('node:fs').PathOrFileDescriptor} path
 */
function readPackagesFile(path) {
    return fs
        .readFileSync(path, { encoding: 'utf8' })
        .split('\n')
        .map((line) => line.trim())
        .filter((str) => str.length > 0);
}

module.exports = { readPackagesFile };
