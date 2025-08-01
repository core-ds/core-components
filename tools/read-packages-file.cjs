const { readFileSync } = require('node:fs');
const { readFile } = require('node:fs/promises');

/**
 * @param {string} content
 */
function process(content) {
    return content
        .split('\n')
        .map((line) => line.trim())
        .filter((str) => str.length > 0);
}

/**
 * @param {import('node:fs').PathLike | import('node:fs/promises').FileHandle} path
 */
async function readPackagesFile(path) {
    return process(await readFile(path, { encoding: 'utf8' }));
}

/**
 * @param {import('node:fs').PathOrFileDescriptor} path
 */
function readPackagesFileSync(path) {
    return process(readFileSync(path, { encoding: 'utf8' }));
}

module.exports = { readPackagesFile, readPackagesFileSync };
