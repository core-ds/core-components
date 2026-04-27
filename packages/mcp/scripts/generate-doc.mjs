import { withCustomConfig } from 'react-docgen-typescript';
import { resolve } from 'node:path';
import { isInheritedFromExternalTypes } from './is-inherited-from-external-types.mjs';

// todo привести работу пропов к poc версии
// todo в package json не должно быть оступов чтобы беречь контекст
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

        // if (packageName === 'accordion') {
        //     console.warn(
        //         Object.entries(props).filter(([key, prop]) => !isInheritedFromExternalTypes(prop)),
        //     );
        // }

        const props = Object.fromEntries(
            Object.entries(_props).filter(([_, prop]) => !isInheritedFromExternalTypes(prop)),
        );

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
