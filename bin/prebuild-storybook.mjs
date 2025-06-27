import { globby } from 'globby';
import path from 'node:path';
import fs from 'fs/promises';
import * as process from 'node:process';
import { getPackages } from '@manypkg/get-packages';

async function main() {
    const { packages } = await getPackages(process.cwd());

    const previews = (
        await Promise.all(packages.map(({ dir }) => globby(`${dir}/src/**/*-preview-snap.png`)))
    ).reduce((a, b) => a.concat(b));

    await Promise.all(
        previews.map((previewPath) => {
            const targetPath = path.join('.storybook/public/images', path.basename(previewPath));

            return fs.cp(previewPath, targetPath);
        }),
    );

    if (!(process.env.BUILD_STORYBOOK_FROM_DIST === 'true')) {
        return;
    }

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
            .map(({ relativeDir, packageJson: { name } }) => {
                const componentName = name.replace('@alfalab/core-components-', '');
                const dist = path.join(relativeDir, 'dist');
                const entrypoint = path.join('dist', componentName);

                return fs.cp(dist, entrypoint, { recursive: true });
            }),
    );
}

await main();
