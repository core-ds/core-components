import { withCustomConfig } from 'react-docgen-typescript';
import { resolve } from 'node:path';
import { isInheritedFromExternalTypes } from './is-inherited-from-external-types.mjs';

export function generateDoc(files) {
    const parser = withCustomConfig(
        resolve(process.cwd(), 'tsconfig.react-docgen-typescript.json'),
        {},
    );

    const docs = parser.parse(files);
    const docsMap = new Map();

    docs.forEach((doc) => {
        const { filePath, displayName, props: _props } = doc;
        const packageName = filePath.split('packages/')[1].split('/')[0];

        const props = Object.fromEntries(
            Object.entries(_props)
                .filter(([, prop]) => !isInheritedFromExternalTypes(prop))
                .map(([key, prop]) => {
                    const { defaultValue, description, name, required, type } = prop;
                    return [key, { defaultValue, description, name, required, type }];
                }),
        );

        if (!docsMap.has(packageName)) {
            docsMap.set(packageName, {
                displayName,
                packageName,
                props,
                filePath,
            });
        }
    });

    console.log('⚙️  Props extraction completed');

    return docsMap;
}
