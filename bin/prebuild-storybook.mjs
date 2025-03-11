import path from 'node:path';
import fs from 'node:fs/promises';
import * as process from 'node:process';

if (!(process.env.BUILD_STORYBOOK_FROM_DIST === 'true')) {
    process.exit(0);
}

await fs.mkdir('dist');

const { default: rootPkg } = await import(path.resolve('packages/root/package.json'), {
    assert: { type: 'json' },
});

await Promise.all(
    Object.keys({ ...rootPkg.dependencies, ...rootPkg.peerDependencies })
        .filter((pkg) => pkg.startsWith('@alfalab/core-components-'))
        .map((pkg) => pkg.replace('@alfalab/core-components-', ''))
        .map((componentName) => {
            const dist = path.join('packages', componentName, 'dist');
            const entrypoint = path.join('dist', componentName);

            return fs.cp(dist, entrypoint, { recursive: true });
        }),
);
