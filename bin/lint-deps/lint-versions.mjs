import dedent from 'dedent';
import fse from 'fs-extra';
import path from 'node:path';
import { cwd, exit } from 'node:process';
import semver from 'semver';

import { getPackages } from '../../tools/monorepo.cjs';
import { isNonNullable } from '../../tools/utils.cjs';

async function main() {
    const { packages } = getPackages();
    const INTERNAL_PACKAGES = packages.map(({ packageJson: { name } }) => name);
    const { dependencies, devDependencies, peerDependencies } = await fse.readJson('package.json', {
        encoding: 'utf8',
    });
    const missmatched = Object.entries({ ...dependencies, ...devDependencies, ...peerDependencies })
        .filter(([pkg]) => INTERNAL_PACKAGES.includes(pkg))
        .map(([pkg, actualVersion]) => {
            const {
                packageJson: { version },
            } = packages.find(({ packageJson: { name } }) => name === pkg);
            const expectedVersion = isNonNullable(semver.prerelease(version))
                ? version
                : `^${version}`;

            return actualVersion === expectedVersion ? null : [pkg, actualVersion, expectedVersion];
        })
        .filter(isNonNullable);

    if (missmatched.length === 0) {
        return;
    }

    console.error(dedent`
        The following packages have mismatched versions
          ${missmatched.map(
              ([pkg, actualVersion, expectedVersion]) =>
                  `${pkg}: ${actualVersion} (expected: ${expectedVersion})`,
          ).join(`
          `)}
        Please update your ${path.join(cwd(), 'package.json')} to match the expected versions.
    `);

    exit(1);
}

await main();
