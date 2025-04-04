/**
 * Заменяет импорты компонентов для сборки modern/cssm/moderncssm/esm
 */
export const coreComponentsResolver = (buildPath) => ({
    name: 'core-components-resolver',
    resolveId: (id) => {
        if (id.includes('@balafla/core-components')) {
            const m = /(@balafla\/core-components-[^/]+)(.*)?$/.exec(id);
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

/**
 * Заменяет импорты типов в d.ts с packages/{packageName}/src/* на @balafla/core-components-{packageName}/*
 */
export const packagesTypingResolver = () => ({
    name: 'packages-typings-resolver',
    generateBundle: (_, bundles) => {
        Object.keys(bundles).forEach((bundleName) => {
            if (bundleName.endsWith('.d.ts')) {
                let source = bundles[bundleName].source;
                if (source) {
                    const re = /import\((['"])packages\/(.+)\/src(\/.*?)?(['"])\)/g;

                    if (!re.test(source)) {
                        return;
                    }

                    bundles[bundleName].source = source.replaceAll(
                        re,
                        'import($1@balafla/core-components-$2$3$4)',
                    );
                }
            }
        });

        return bundles;
    },
});
