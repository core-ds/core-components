import path from 'node:path';
import { globSync } from 'tinyglobby';

const { dirname } = import.meta;
const repoRoot = path.resolve(dirname, '../../..');

export function getComponentEntryPoints() {
    console.log('🔍  Search for components...');

    const files = globSync(
        [
            'packages/*/src/Component.tsx',
            'packages/*/src/Component.ts',
            'packages/*/src/component.tsx',
            'packages/*/src/Component.responsive.tsx',
            'packages/*/src/component.responsive.tsx',
        ],
        {
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
        },
    );

    console.log(`📦  Found ${files.length} components`);

    return files.map((f) => path.resolve(repoRoot, f));
}
