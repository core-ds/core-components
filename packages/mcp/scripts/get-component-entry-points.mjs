import { globSync } from 'tinyglobby';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../../..');

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
                'packages/intl-phone-input/**',
                'packages/loader/**',
                'packages/time-input/**',
            ],
        },
    );

    console.log(`📦  Found ${files.length} components`);

    return files.map((f) => resolve(repoRoot, f));
}
