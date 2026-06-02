import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { createIndexDir } from './create-index-dir.mjs';
import { extractComponentDescription } from './extract-component-description.mjs';
import { generateDemo } from './generate-demo.mjs';
import { generateDoc } from './generate-doc.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import { parseChangelog } from './parse-changelog.mjs';

const { dirname } = import.meta;
const rootChangelogPath = path.resolve(dirname, '../../..', 'CHANGELOG.md');

function main() {
    const files = getComponentEntryPoints();

    const docs = generateDoc(files);

    const versionDir = createIndexDir();

    docs.forEach((doc) => {
        const { packageName, displayName, props, filePath } = doc;

        const description = extractComponentDescription(
            path.join(path.dirname(filePath), 'docs', 'Component.docs.mdx'),
        );

        const demos = generateDemo(path.join(path.dirname(filePath), 'docs', 'description.mdx'));

        const changelog = parseChangelog(rootChangelogPath, displayName);

        writeFileSync(
            path.resolve(versionDir, `${packageName}.json`),
            JSON.stringify(
                {
                    packageName,
                    displayName,
                    description,
                    props,
                    demos,
                    changelog,
                },
                null,
                4,
            ),
        );
    });

    console.log('☑️  Data generation done');
}

main();
