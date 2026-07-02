import { withCustomConfig } from 'react-docgen-typescript';
import path from 'node:path';

import { isInheritedFromExternalTypes } from './is-inherited-from-external-types.mjs';

const { dirname } = import.meta;

const PROGRESS_BAR_WIDTH = 30;

function renderProgressBar(current, total) {
    const filled = Math.round((current / total) * PROGRESS_BAR_WIDTH);
    const bar = `${'='.repeat(Math.max(filled - 1, 0))}>${' '.repeat(Math.max(PROGRESS_BAR_WIDTH - filled, 0))}`;

    return `[${bar}]`;
}

export function generateDoc(entries) {
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
    entries.forEach(({ file, sourceName, componentName }, index) => {
        const docs = parser.parse([file]);

        /**
         * `\x1b[0K` стирает остаток строки после курсора — без этого при переходе на
         * более короткий кадр (например короче имя файла) хвост предыдущего кадра
         * остаётся на экране
         */
        const relativeFile = `packages/${file.split('packages/')[1]}`;

        process.stdout.write(
            `\r${renderProgressBar(index + 1, entries.length)} ${relativeFile}\x1b[0K`,
        );

        /**
         * Один файл может экспортировать сразу несколько компонентов (например
         * Component.responsive.tsx с подкомпонентами вроде Header/Controls), и
         * react-docgen-typescript возвращает их в произвольном порядке — поэтому
         * явно ищем doc с именем, под которым компонент реально объявлен в файле
         * (sourceName), а не берём первый попавшийся из массива.
         *
         * Два фолбэка на случай, если docgen репортит другое имя, чем в AST:
         * 1. `${sourceName}Component` — паттерн компаунд-компонентов вида
         *    `const XComponent = forwardRef(...); XComponent.displayName = 'XComponent';
         *    export const X = Object.assign(XComponent, {...})` — docgen идёт по
         *    forwardRef и берёт displayName внутренней XComponent, а не обёртки X.
         * 2. Если в файле всего один doc — берём его, даже если имя не совпало
         *    (например явный `Component.displayName = '...'`, отличающийся от AST-имени)
         */
        const doc =
            docs.find(({ displayName }) => displayName === sourceName) ??
            docs.find(({ displayName }) => displayName === `${sourceName}Component`) ??
            (docs.length === 1 ? docs[0] : undefined);

        if (!doc) {
            return;
        }

        const { filePath, props: componentProps } = doc;
        const [packageName] = filePath.split('packages/')[1].split('/');

        const props = Object.fromEntries(
            Object.entries(componentProps)
                .filter(([, prop]) => !isInheritedFromExternalTypes(prop))
                .map(([key, prop]) => {
                    const { defaultValue, description, name, required, type } = prop;

                    return [key, { defaultValue, description, name, required, type }];
                }),
        );

        docsMap.set(packageName, {
            /**
             * публичное имя компонента (из имени папки пакета), а не sourceName —
             * внутреннее имя объявления часто отличается суффиксом Responsive/Component
             */
            displayName: componentName,
            packageName,
            props,
            filePath,
        });
    });

    process.stdout.write('\n');
    console.log('⚙️  Props extraction completed');

    return docsMap;
}
