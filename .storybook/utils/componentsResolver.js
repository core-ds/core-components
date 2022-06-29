const path = require('path');

const componentsPrefix = '@alfalab/core-components-';
const componentsDir = path.resolve(__dirname, '../../packages');

/**
 * Локально резолвит импорт @alfalab/core-components.
 * Ищет эти модули не в node_modules, а в папке `componentsDir`
 */
module.exports = componentResolver = {
    apply(resolver) {
        resolver.plugin('module', function(init, callback) {
            if (init.request.startsWith(componentsPrefix)) {
                const [componentName, entrypoint] = init.request
                    .replace(componentsPrefix, '')
                    .split('/');

                this.doResolve(
                    'resolve',
                    {
                        ...init,
                        request: [componentsDir, componentName, 'src', entrypoint]
                            .filter(Boolean)
                            .join('/'),
                    },
                    `Resolve ${init.request}`,
                    callback,
                );
            } else {
                callback();
            }
        });
    },
};
