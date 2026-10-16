import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const { dirname } = import.meta;

const rootPackageJson = JSON.parse(
    readFileSync(path.resolve(dirname, '../../../packages/root/package.json'), 'utf-8'),
);

const { version } = rootPackageJson;

export function createDataDir() {
    const dataDir = path.resolve(dirname, '..', 'src', 'data');

    rmSync(dataDir, { recursive: true, force: true });
    mkdirSync(dataDir, { recursive: true });

    writeFileSync(
        path.resolve(dirname, '..', 'src/version.mts'),
        `export const DATA_VERSION = 'v${version}';\n`,
    );

    console.log(`📁 Recreated data directory for v${version}`);

    return dataDir;
}
