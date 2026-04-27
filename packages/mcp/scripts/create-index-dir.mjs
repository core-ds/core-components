import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const rootPackageJson = JSON.parse(
    readFileSync(resolve(process.cwd(), 'packages/root/package.json'), 'utf-8'),
);

const version = rootPackageJson.version;

export function createIndexDir() {
    const indexDir = `v${version}`;
    const versionDir = resolve(process.cwd(), 'packages/mcp/src/data', indexDir);

    rmSync(versionDir, { recursive: true, force: true });
    mkdirSync(versionDir, { recursive: true });

    writeFileSync(
        resolve(process.cwd(), 'packages/mcp/src/version.ts'),
        `export const DATA_VERSION = 'v${version}';\n`,
    );

    console.log(`📁  Created directory: ${indexDir}`);

    return versionDir;
}
