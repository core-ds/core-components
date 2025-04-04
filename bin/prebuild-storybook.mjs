import path from 'node:path';
import fs from 'node:fs/promises';
import * as process from 'node:process';
import shell from 'shelljs';

if (!(process.env.BUILD_STORYBOOK_FROM_DIST === 'true')) {
    process.exit(0);
}

const packages = JSON.parse(shell.exec(`lerna list --json --all`, { silent: true }).stdout);

const rootPkg = packages.find(({ name }) => name === '@balafla/core-components');

const { default: rootPkgJSON } = await import(path.join(rootPkg.location, 'package.json'), {
    with: { type: 'json' },
});

const coreDependencies = Object.keys({
    ...rootPkgJSON.dependencies,
    ...rootPkgJSON.peerDependencies,
}).filter((name) => name.startsWith('@balafla/core-components-'));

await fs.mkdir('dist');

await Promise.all(
    packages
        .filter(({ name }) => coreDependencies.includes(name))
        .map(({ location, name }) => {
            const componentName = name.replace('@balafla/core-components-', '');
            const dist = path.join(location, 'dist');
            const entrypoint = path.join('dist', componentName);

            return fs.cp(dist, entrypoint, { recursive: true });
        }),
);
