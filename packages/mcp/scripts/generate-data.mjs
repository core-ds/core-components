import { resolve, join, dirname } from 'node:path';
import { createIndexDir } from './create-index-dir.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import { writeFileSync } from 'node:fs';
import { generateDoc } from './generate-doc.mjs';
import { extractComponentDescription } from './extract-component-description.mjs';
import { generateDemo } from './generate-demo.mjs';

function main() {
    const files = getComponentEntryPoints();

    const docs = generateDoc(files);

    const versionDir = createIndexDir();

    docs.forEach((doc) => {
        const { packageName, displayName, props, filePath } = doc;

        const description = extractComponentDescription(
            join(dirname(filePath), 'docs', 'Component.docs.mdx'),
        );

        const demos = generateDemo(join(dirname(filePath), 'docs', 'description.mdx'));

        writeFileSync(
            resolve(versionDir, `${packageName}.json`),
            JSON.stringify(
                {
                    packageName,
                    displayName,
                    description,
                    props,
                    demos,
                },
                null,
                2,
            ),
        );
    });
}

main();
