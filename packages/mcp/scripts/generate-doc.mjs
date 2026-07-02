import { withCustomConfig } from 'react-docgen-typescript';
import path from 'node:path';

import { isInheritedFromExternalTypes } from './is-inherited-from-external-types.mjs';

const { dirname } = import.meta;

export function generateDoc(files) {
    const parser = withCustomConfig(
        path.resolve(dirname, '../../../tsconfig.react-docgen-typescript.json'),
        {},
    );

    const docsMap = new Map();

    /**
     * react-docgen-typescript строит один общий ts.Program на весь список файлов,
     * переданных в parse(). Typechecker внутри такого общего Program резолвит символы
     * с учётом всего батча, и данные по конкретному файлу (например defaultValue
     * пропсов) начинают зависеть от состава остальных файлов — у неизменившегося
     * компонента результат может "плыть" при любом изменении набора остальных пакетов.
     * Поэтому парсим каждый файл отдельным вызовом parse(): react-docgen-typescript
     * создаёт под него отдельный Program, и результат перестаёт зависеть от остальных
     * файлов в списке.
     */
    files.forEach((file) => {
        const docs = parser.parse([file]);

        console.log('parsed', file);

        docs.forEach((doc) => {
            const { filePath, displayName, props: componentProps } = doc;
            const [packageName] = filePath.split('packages/')[1].split('/');

            const props = Object.fromEntries(
                Object.entries(componentProps)
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
    });

    console.log('⚙️  Props extraction completed');

    return docsMap;
}
