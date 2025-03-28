/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const resolvePkg = require('resolve-package-path');
const pkgJSON = require('./package.json');

Object.keys(pkgJSON.dependencies)
    .filter((pkg) => pkg.startsWith('@alfalab/core-components-'))
    .forEach((pkg) => {
        const targetPath = path.join(__dirname, pkg.replace('@alfalab/core-components-', ''));
        const pkgPath = path.dirname(resolvePkg(pkg, __dirname));

        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3 });
        }

        fs.symlinkSync(pkgPath, targetPath);
    });
