import fse from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPackages } from '../../tools/monorepo.cjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const IGNORED_PACKAGES = readPackagesFile(path.join(dirname, 'ignored-packages'));

async function main() {
    const { packages } = getPackages();

    const packageSizes = Object.fromEntries(
        await Promise.all(
            packages
                .filter(({ packageJson }) => !IGNORED_PACKAGES.includes(packageJson.name))
                .map(async ({ dir, packageJson }) => [
                    packageJson.name,
                    await fse.readJson(path.join(dir, 'package-size.json'), { encoding: 'utf8' }),
                ]),
        ),
    );

    await fse.writeJson('package-sizes.json', packageSizes, { spaces: 4, encoding: 'utf8' });
}

await main();
