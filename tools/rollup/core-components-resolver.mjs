import path from 'path';

import { requireRegExp } from './common.mjs';

/**
 * Заменяет все импорты кор-компонентов на относительные пути.
 * Используется для сборки агрегирующего пакета.
 */
export const coreComponentsRootPackageResolver = ({ currentPackageDir }) => ({
    name: 'core-components-root-package-resolver',
    generateBundle: (_, bundles) => {
        Object.keys(bundles).forEach((bundleName) => {
            let code = bundles[bundleName].code;

            let matches;
            while ((matches = requireRegExp.exec(code))) {
                const componentName = matches[2];

                const distDir = path.resolve(currentPackageDir, 'dist');
                const bundleAbsPath = path.join(distDir, bundleName);
                const bundleDir = path.dirname(bundleAbsPath);
                const componentRelativePath = path
                    .relative(bundleDir, componentName)
                    .replace('/dist', ''); // удаляем dist из пути, так как в рут-пакете его нет

                code = code.replace(requireRegExp, `$1${componentRelativePath}$3`);
            }

            bundles[bundleName].code = code;
        });

        return bundles;
    },
});

/**
 * Заменяет импорты компонентов для сборки modern/cssm/moderncssm/esm
 */
export const coreComponentsResolver = (buildPath) => ({
    name: 'core-components-resolver',
    resolveId: (id) => {
        if (id.includes('@alfalab/core-components')) {
            return { id: `${id}/${buildPath}`, external: true };
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
 * Заменяет импорты типов в d.ts с packages/{packageName}/src/* на @alfalab/core-components-{packageName}/*
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
                        'import($1@alfalab/core-components-$2$3$4)',
                    );
                }
            }
        });

        return bundles;
    },
});