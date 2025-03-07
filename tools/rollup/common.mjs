import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const currentPackageDir = process.cwd();
export const currentPkg = path.join(currentPackageDir, 'package.json');
export const rootPkg = require(path.resolve(currentPackageDir, '../root/package.json'));
export const pkg = require(currentPkg);
export const currentComponentName =
    pkg.name === '@alfalab/core-components'
        ? 'root'
        : pkg.name.replace('@alfalab/core-components-', '');
