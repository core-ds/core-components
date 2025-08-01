const { getPackagesSync } = require('@manypkg/get-packages');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function getPackages() {
    return getPackagesSync(root);
}

module.exports = { getPackages };
