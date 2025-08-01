import dedent from 'dedent';
import fse from 'fs-extra';
import path from 'node:path';
import { cwd, exit } from 'node:process';
import semver from 'semver';

import { isInternal, resolveInternal } from '../../tools/resolve-internal.cjs';
import { isNonNullable } from '../../tools/utils.cjs';

async function main() {
    const { dependencies, devDependencies, peerDependencies } = await fse.readJson('package.json', {
        encoding: 'utf8',
    });

    const missmatched = (
        await Promise.all(
            Object.entries({ ...dependencies, ...devDependencies, ...peerDependencies })
                .filter(([pkg]) => isInternal(pkg))
                .map(async ([pkg, actualVersion]) => {
                    const { version } = await fse.readJson(
                        resolveInternal(`${pkg}/package.json`, false),
                        { encoding: 'utf8' },
                    );
                    const expectedVersion = isNonNullable(semver.prerelease(version))
                        ? version
                        : `^${version}`;

                    return actualVersion === expectedVersion
                        ? null
                        : [pkg, actualVersion, expectedVersion];
                }),
        )
    ).filter(isNonNullable);

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
