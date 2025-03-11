/**
 * Заменяет импорты компонентов для сборки modern/cssm/moderncssm/esm
 */
export const coreComponentsResolver = (buildPath) => ({
    name: 'core-components-resolver',
    resolveId: (id) => {
        if (id.includes('@alfalab/core-components')) {
            const m = /(@alfalab\/core-components-[^/]+)(.*)?$/.exec(id);
            if (m) {
                const componentName = m[1];
                const emtryPoint = m[2] ?? '';

                return { id: `${componentName}/${buildPath}${emtryPoint}`, external: true };
            }
        }
    },
});

/**
 * Заменяет настройку external. Нужно, чтобы дать возможность отработать плагину coreComponentsResolver
 */
export const externalsResolver = (externals) => ({
    name: 'externals-resolver',
    resolveId: (id) => {
        if (externals.includes(id)) {
            return { id, external: true };
        }
    },
});
