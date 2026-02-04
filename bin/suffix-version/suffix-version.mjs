import detectIndent from 'detect-indent';
import fse from 'fs-extra';
import fs from 'node:fs/promises';
import path from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';
import semver from 'semver';
import { hideBin } from 'yargs/helpers';

import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

function suffixVersion(version, suffix) {
    const { major, minor, patch, prerelease } = semver.parse(version.replace(/^[~^]/, ''));

    /**
     * @see https://github.com/npm/node-semver/blob/281055e7716ef0415a8826972471331989ede58c/classes/semver.js#L81
     */
    return `${major}.${minor}.${patch}-${suffix}${prerelease.length ? `-${prerelease.join('.')}` : ''}`;
}

/**
 * @param {string[]} args
 */
async function main([suffix]) {
    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));
    const data = await fs.readFile('package.json', { encoding: 'utf8' });
    /**
     * @type {import('@manypkg/get-packages').Package['packageJson']}
     */
    const pkg = JSON.parse(data);
    const { indent } = detectIndent(data);

    pkg.version = suffixVersion(pkg.version, suffix);

    [pkg.dependencies, pkg.devDependencies, pkg.peerDependencies].forEach((dependencies) => {
        if (dependencies) {
            const nextDependencies = Object.fromEntries(
                Object.entries(dependencies).map(([name, version]) => {
                    const nextVersion =
                        name.startsWith('@alfalab/core-components') &&
                        !IGNORED_PACKAGES.includes(name)
                            ? `${version.replace(/^([~^]?).*/, '$1')}${suffixVersion(version, suffix)}`
                            : version;

                    return [name, nextVersion];
                }),
            );

            Object.assign(dependencies, nextDependencies);
        }
    });

    await fse.writeJson('package.json', pkg, { spaces: indent, encoding: 'utf8' });

    console.log('Done');
}

await main(hideBin(argv));
