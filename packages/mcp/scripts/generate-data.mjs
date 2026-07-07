import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { Project } from 'ts-morph';

import { toPascalCase } from '../utils/to-pascal-case/to-pascal-case.mjs';

import { createIndexDir } from './create-index-dir.mjs';
import { extractComponentDescription } from './extract-component-description.mjs';
import { generateDemo } from './generate-demo.mjs';
import { generateDoc } from './generate-doc.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import { parseChangelog } from './parse-changelog.mjs';

const { dirname } = import.meta;
const rootChangelogPath = path.resolve(dirname, '../../..', 'CHANGELOG.md');

// Части имени пакета, которые нужно писать капсом целиком (CDN, а не Cdn)
const PACKAGE_NAME_ACRONYMS = new Set(['cdn']);

/**
 * entry-файл может лежать не прямо в src (например src/responsive/Component.responsive.tsx),
 * поэтому docs всегда ищем от корня src, а не от папки, где лежит сам entry-файл
 */
function getSrcDir(filePath) {
    const segments = filePath.split(path.sep);
    const srcIndex = segments.lastIndexOf('src');

    return segments.slice(0, srcIndex + 1).join(path.sep);
}

function main() {
    const entryPoints = getComponentEntryPoints();

    const entries = entryPoints.reduce((acc, curr) => {
        const { tsConfig, fullPath, folderName } = curr;
        const componentName = toPascalCase(folderName, PACKAGE_NAME_ACRONYMS);

        const project = new Project({
            tsConfigFilePath: tsConfig,
        });

        const sourceFile = project.addSourceFileAtPath(fullPath);

        const declarations = sourceFile.getExportedDeclarations().get(componentName);
        const declaration = declarations?.[0];

        if (!declaration) {
            return acc;
        }

        const file = declaration.getSourceFile().getFilePath();

        /**
         * Компонент внутри пакета часто объявлен под другим именем, чем публичный
         * экспорт из index.ts (например `export { XResponsive as X } from ...`).
         * react-docgen-typescript репортит именно это внутреннее имя, поэтому нужно
         * знать его заранее, чтобы затем найти нужный doc среди всех экспортов файла
         */
        const sourceName = declaration.getSymbol()?.getName() ?? componentName;

        console.log('[+]', file);

        acc.push({ file, sourceName, componentName });

        return acc;
    }, []);

    console.log('ℹ️ ', entries.length, 'components processed');

    const docs = generateDoc(entries);

    const versionDir = createIndexDir();

    docs.forEach((doc) => {
        const { packageName, displayName, props, filePath } = doc;

        const srcDir = getSrcDir(filePath);

        const description = extractComponentDescription(
            path.join(srcDir, 'docs', 'Component.docs.mdx'),
        );

        const demos = generateDemo(path.join(srcDir, 'docs', 'description.mdx'));

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
