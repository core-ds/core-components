import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const currentPackageDir = process.cwd();
export const pkg = require(path.join(currentPackageDir, 'package.json'));
export const currentComponentName =
    pkg.name === '@alfalab/core-components'
        ? 'root'
        : pkg.name.replace('@alfalab/core-components-', '');
