import { globSync } from 'tinyglobby';
import { readFileSync } from 'node:fs';
import { withCustomConfig } from 'react-docgen-typescript';
import { resolve } from 'node:path';


function main() {
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

    const parser = withCustomConfig(
        resolve(process.cwd(), 'tsconfig.react-docgen-typescript.json'), {}
    );

    const docs = parser.parse(files);

    console.log(docs.length);
}

main();
