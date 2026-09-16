import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const { dirname } = import.meta;

const rootPackageJson = JSON.parse(
    readFileSync(path.resolve(dirname, '../../../packages/root/package.json'), 'utf-8'),
);

const { version } = rootPackageJson;

export function createIndexDir() {
    const indexDir = `v${version}`;
    const versionDir = path.resolve(dirname, '..', 'src', 'data', indexDir);

    rmSync(versionDir, { recursive: true, force: true });
    mkdirSync(versionDir, { recursive: true });

    writeFileSync(
        path.resolve(dirname, '..', 'src/version.mts'),
        `export const DATA_VERSION = 'v${version}';\n`,
    );

    console.log(`📁 Created directory: ${indexDir}`);

    return versionDir;
}
