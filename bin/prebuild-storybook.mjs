import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import * as process from 'node:process';

if (!(process.env.BUILD_STORYBOOK_FROM_DIST === 'true')) {
    process.exit(0);
}

const require = createRequire(import.meta.url);

const rootPkg = require(path.resolve('packages', 'root', 'package.json'));

fs.mkdirSync('dist');

Object.keys(rootPkg.dependencies)
    .filter((pkg) => pkg.startsWith('@alfalab/core-components-'))
    .map((pkg) => pkg.replace('@alfalab/core-components-', ''))
    .forEach((componentName) => {
        const dist = path.join('packages', componentName, 'dist');
        const entrypoint = path.join('dist', componentName);

        fs.cpSync(dist, entrypoint, { recursive: true });
    });
