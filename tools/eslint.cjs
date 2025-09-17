const path = require('node:path');
const { readPackagesFileSync } = require('./read-packages-file.cjs');

const ESLINT_IGNORED_PACKAGES = readPackagesFileSync(
    path.join(__dirname, '.eslint-ignored-packages'),
);

module.exports = { ESLINT_IGNORED_PACKAGES };
