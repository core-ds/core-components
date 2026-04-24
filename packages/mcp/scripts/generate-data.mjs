import { withCustomConfig } from 'react-docgen-typescript';
import path, { resolve } from 'node:path';
import { createIndexDir } from './create-index-dir.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import * as fs from 'node:fs';

function main() {
    const files = getComponentEntryPoints();

    const versionDir = createIndexDir();

    const parser = withCustomConfig(
        resolve(process.cwd(), 'tsconfig.react-docgen-typescript.json'),
        {},
    );

    const docs = parser.parse(files);
    const docsMap = new Map();

    docs.forEach((doc) => {
        const { filePath, displayName, props } = doc;
        const packageName = filePath.split('packages/')[1].split('/')[0];

        if (!docsMap.has(packageName)) {
            docsMap.set(packageName, {
                displayName,
                packageName,
                props,
            });
        }
    });

    docsMap.forEach((doc) => {
        const { packageName, displayName } = doc;

        fs.writeFileSync(
            resolve(versionDir, `${packageName}.json`),
            JSON.stringify(
                {
                    packageName,
                    displayName,
                },
                null,
                2,
            ),
        );
    });
}

main();
