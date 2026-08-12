import path from 'node:path';
import { globSync } from 'tinyglobby';

const { dirname } = import.meta;
const repoRoot = path.resolve(dirname, '../../..');

export function getComponentEntryPoints() {
    const files = globSync(['packages/*/src/index.ts'], {
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

    console.log(`🔍  Found ${files.length} packages`);

    return files.map((f) => ({
        fullPath: path.resolve(repoRoot, f),
        folderName: f.split('/')[1],
        tsConfig: path.resolve(repoRoot, `${f.split('/src')[0]}/tsconfig.json`),
    }));
}
