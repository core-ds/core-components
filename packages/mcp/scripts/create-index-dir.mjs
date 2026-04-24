import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rootPackageJson = JSON.parse(
    readFileSync(resolve(__dirname, '../../../packages/root/package.json'), 'utf-8'),
);

const version = rootPackageJson.version;

export function createIndexDir() {
    const indexDir = `v${version}`;
    const versionDir = resolve(__dirname, '../src/data', indexDir);

    rmSync(versionDir, { recursive: true, force: true });
    mkdirSync(versionDir, { recursive: true });

    writeFileSync(
        resolve(__dirname, '../', 'src/version.ts'),
        `export const DATA_VERSION = 'v${version}';\n`,
    );

    console.log(`📁  Created directory: ${indexDir}`);

    return versionDir;
}
