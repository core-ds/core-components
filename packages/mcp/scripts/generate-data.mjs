import { withCustomConfig } from 'react-docgen-typescript';
import { resolve } from 'node:path';
import { createIndexDir } from './create-index-dir.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';


function main() {
    const files = getComponentEntryPoints();

    const parser = withCustomConfig(
        resolve(process.cwd(), 'tsconfig.react-docgen-typescript.json'), {}
    );

    const docs = parser.parse(files);

    createIndexDir();
}

main();
