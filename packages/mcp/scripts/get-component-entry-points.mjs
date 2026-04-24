import { globSync } from 'tinyglobby';

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
            ignore: [
                'packages/*-private/**',
                'packages/modal/**',
                'packages/side-panel/**',
                'packages/with-suffix/**',
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

    return files;
}
