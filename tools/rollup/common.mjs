import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const readDir = promisify(fs.readdir);
export const mkDir = promisify(fs.mkdir);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

export async function checkOrCreateDir(dir) {
    try {
        await readDir(dir, 'utf-8');
    } catch (error) {
        await mkDir(dir, { recursive: true });
    }
}

export const requireRegExp = new RegExp(
    /(\b(?:require\(|import |from )['"])@alfalab\/core-components-(.*?)(['"])/,
);


export const currentPackageDir = process.cwd();
export const currentPkg = path.join(currentPackageDir, 'package.json');
export const rootPkg = require(path.resolve(currentPackageDir, '../../package.json'));
export const pkg = require(currentPkg);
export const currentComponentName = pkg.name.replace('@alfalab/core-components-', '');
export const rootDir = `../../dist/${currentComponentName}`;
