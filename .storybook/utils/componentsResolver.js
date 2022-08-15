const path = require('path');

const componentsPrefix = '@alfalab/core-components-';
const packagesDir = path.resolve(__dirname, '../../packages');
const distDir = path.resolve(__dirname, '../../dist');

/**
 * Локально резолвит импорт @alfalab/core-components.
 * Ищет эти модули не в node_modules, а в папке `packagesDir`, либо в `distDir`.
 */
class ComponentResolverPlugin {
    constructor(source, target) {
        this.source = source || 'resolve';
        this.target = target || 'resolve';
    }

    apply(resolver) {
        const target = resolver.ensureHook(this.target);
        resolver
            .getHook(this.source)
            .tapAsync('ComponentResolverPlugin', (init, resolveContext, callback) => {
                if (init.request.startsWith(componentsPrefix)) {
                    const [componentName, entrypoint] = init.request
                        .replace(componentsPrefix, '')
                        .split('/');

                    const request = (process.env.BUILD_FROM_DIST === 'true'
                        ? [distDir, componentName, 'esm', entrypoint]
                        : [packagesDir, componentName, 'src', entrypoint]
                    )
                        .filter(Boolean)
                        .join('/');

                    return resolver.doResolve(
                        target,
                        {
                            ...init,
                            request,
                        },
                        null,
                        resolveContext,
                        callback,
                    );
                }

                callback();
            });
    }
}

module.exports = ComponentResolverPlugin;
