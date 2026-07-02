import path from 'node:path';
import { globSync } from 'tinyglobby';

import { resolveComponentEntry } from './resolve-component-entry.mjs';

const { dirname } = import.meta;
const repoRoot = path.resolve(dirname, '../../..');

export function getComponentEntryPoints() {
    console.log('🔍  Search for components...');

    const indexFiles = globSync(['packages/*/src/index.ts'], {
        cwd: repoRoot,
        ignore: [
            'packages/*-private/**',
            'packages/*-v1/**',
            'packages/alert/**',
            'packages/badge/**',
            'packages/calendar-input/**',
            'packages/date-input/**',
            'packages/date-range-input/**',
            'packages/date-time-input/**',
            'packages/intl-phone-input/**',
            'packages/loader/**',
            'packages/time-input/**',
        ],
    });

    const files = indexFiles
        .map((indexFile) => {
            const packageDir = path.resolve(repoRoot, indexFile, '..', '..');
            const packageName = path.basename(packageDir);

            return resolveComponentEntry(packageDir, packageName);
        })
        .filter((file) => file !== null);

    console.log(`📦  Found ${files.length} components`);

    return files;
}
