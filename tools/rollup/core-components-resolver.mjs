import path from 'node:path';

import { matchCoreComponentsModule } from './utils.mjs';

/**
 * Заменяет импорты компонентов для сборки modern/cssm/moderncssm/esm
 *
 * @param {string} buildPath путь до сборки
 * @returns {import('rollup').Plugin}
 */
export const coreComponentsResolver = (buildPath) => ({
    name: 'core-components-resolver',
    resolveId: (id) => {
        const match = matchCoreComponentsModule(id);

        if (match) {
            const [, componentName, entryPoint] = match;

            return {
                id: path.join(componentName, buildPath, entryPoint),
                external: true,
            };
        }

        return null;
    },
});

/**
 * Заменяет настройку external. Нужно, чтобы дать возможность отработать плагину {@link coreComponentsResolver}
 *
 * @see {@link https://rollupjs.org/configuration-options/#external}
 * @param {string[]} externals массив внешних зависимостей
 * @returns {import('rollup').Plugin}
 */
export const externalsResolver = (externals) => ({
    name: 'externals-resolver',
    resolveId: (id) => {
        if (externals.some((external) => id.startsWith(external))) {
            return { id, external: true };
        }

        return null;
    },
});
