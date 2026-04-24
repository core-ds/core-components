import { readFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const rootPackageJson = JSON.parse(
    readFileSync(resolve(process.cwd(), 'packages/root/package.json'), 'utf-8'),
);

const version = rootPackageJson.version;

export function createIndexDir() {
    const indexDir = `v${version}`;
    const versionDir = resolve(process.cwd(), 'packages/mcp/data', indexDir);

    rmSync(versionDir, { recursive: true, force: true });
    mkdirSync(versionDir, { recursive: true });

    console.log(`📁  Created directory: ${indexDir}`);
}
