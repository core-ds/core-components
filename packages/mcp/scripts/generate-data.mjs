import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { Project } from 'ts-morph';

import { createIndexDir } from './create-index-dir.mjs';
import { extractComponentDescription } from './extract-component-description.mjs';
import { generateDemo } from './generate-demo.mjs';
import { generateDoc } from './generate-doc.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import { parseChangelog } from './parse-changelog.mjs';

const { dirname } = import.meta;
const rootChangelogPath = path.resolve(dirname, '../../..', 'CHANGELOG.md');

function toPascalCase(packageName) {
    return packageName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function main() {
    const entryPoints = getComponentEntryPoints();

    const files = entryPoints.reduce((acc, curr) => {
        const { tsConfig, fullPath, folderName } = curr;

        const project = new Project({
            tsConfigFilePath: tsConfig,
        });

        const sourceFile = project.addSourceFileAtPath(fullPath);

        const declarations = sourceFile.getExportedDeclarations().get(toPascalCase(folderName));

        if (declarations?.[0]) {
            const componentPath = declarations[0].getSourceFile().getFilePath();

            console.warn('resolved', componentPath);

            acc.push(componentPath);

            return acc;
        }

        return acc;
    }, []);

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
                1,
            ).replace(/^ +/gm, ''),
        );
    });

    console.log('☑️  Data generation done');
}

main();
