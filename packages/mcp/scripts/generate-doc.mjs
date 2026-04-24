import { withCustomConfig } from 'react-docgen-typescript';
import { resolve } from 'node:path';

export function generateDoc(files) {
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

    console.log('⚙️  Props extraction completed');

    return docsMap;
}
