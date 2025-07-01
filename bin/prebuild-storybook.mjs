import fs from 'fs/promises';

import path from 'node:path';
import * as process from 'node:process';

import { getPackages } from '../tools/monorepo.cjs';

async function main() {
    if (!(process.env.BUILD_STORYBOOK_FROM_DIST === 'true')) {
        return;
    }

    const { packages } = getPackages();
    const rootPkg = packages.find(
        ({ packageJson: { name } }) => name === '@alfalab/core-components',
    );
    const rootPkgDependencies = Object.keys({
        ...rootPkg.packageJson.dependencies,
        ...rootPkg.packageJson.peerDependencies,
    }).filter((name) => name.startsWith('@alfalab/core-components-'));

    await fs.mkdir('dist', { recursive: true });

    await Promise.all(
        packages
            .filter(({ packageJson }) => rootPkgDependencies.includes(packageJson.name))
            .map(({ dir, packageJson: { name } }) => {
                const componentName = name.replace('@alfalab/core-components-', '');
                const dist = path.join(dir, 'dist');
                const entrypoint = path.join('dist', componentName);

                return fs.cp(dist, entrypoint, { recursive: true });
            }),
    );
}

await main();
