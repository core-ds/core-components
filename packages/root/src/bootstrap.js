#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const resolve = require('resolve/sync');
const pkg = require('./package.json');

const CORE_COMPONENTS_REGEXP = /^@alfalab\/core-components-/;

Object.keys(pkg.dependencies)
    .filter((name) => CORE_COMPONENTS_REGEXP.test(name))
    .forEach((name) => {
        const targetPath = path.join(__dirname, name.replace(CORE_COMPONENTS_REGEXP, ''));
        const pkgPath = path.dirname(resolve(`${name}/package.json`, { basedir: __dirname }));

        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3 });
        }

        fs.symlinkSync(pkgPath, targetPath);
    });
