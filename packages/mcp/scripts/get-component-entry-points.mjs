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
            ignore: ['packages/*-v1/**', 'packages/*-private/**'],
        },
    );

    console.log(`📦  Found ${files.length} components`);

    return files;
}
