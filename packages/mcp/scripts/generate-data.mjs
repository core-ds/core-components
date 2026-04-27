import { resolve, join, dirname } from 'node:path';
import { createIndexDir } from './create-index-dir.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import { writeFileSync } from 'node:fs';
import { generateDoc } from './generate-doc.mjs';
import { extractComponentDescription } from './extract-component-description.mjs';

function main() {
    const files = getComponentEntryPoints();

    const docs = generateDoc(files);

    const versionDir = createIndexDir();

    docs.forEach((doc) => {
        const { packageName, displayName, props, filePath } = doc;

        const description = extractComponentDescription(
            join(dirname(filePath), 'docs', 'Component.docs.mdx'),
        );

        writeFileSync(
            resolve(versionDir, `${packageName}.json`),
            JSON.stringify(
                {
                    packageName,
                    displayName,
                    description,
                    props,
                },
                null,
                2,
            ),
        );
    });
}

main();
