import { resolve } from 'node:path';
import { createIndexDir } from './create-index-dir.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import * as fs from 'node:fs';
import { generateDoc } from './generate-doc.mjs';

function main() {
    const files = getComponentEntryPoints();

    const docs = generateDoc(files);

    const versionDir = createIndexDir();


    docs.forEach((doc) => {
        const { packageName, displayName, props } = doc;

        fs.writeFileSync(
            resolve(versionDir, `${packageName}.json`),
            JSON.stringify(
                {
                    packageName,
                    displayName,
                    props,
                },
                null,
                2,
            ),
        );
    });
}

main();
