/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const resolveFrom = require('resolve-from');
const pkgJSON = require('./package.json');

Object.keys(pkgJSON.dependencies)
    .filter((pkg) => pkg.startsWith('@balafla/core-components-'))
    .forEach((pkg) => {
        const targetPath = path.join(__dirname, pkg.replace('@balafla/core-components-', ''));
        const pkgPath = path.dirname(resolveFrom(__dirname, `${pkg}/package.json`));

        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3 });
        }

        fs.symlinkSync(pkgPath, targetPath);
    });
