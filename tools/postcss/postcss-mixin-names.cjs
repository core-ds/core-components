/**
 * @typedef Options
 * @property {(names: string[]) => void} [importTo]
 */

/**
 * @param {Options} [options]
 * @returns {import('postcss').AcceptedPlugin}
 */
function postcssMixinNames(options = {}) {
    return {
        postcssPlugin: 'postcss-mixin-names',
        prepare: () => {
            /**
             * @type {string[]}
             */
            const names = [];

            return {
                Once: (root) => {
                    root.walkAtRules('define-mixin', (atRule) => {
                        const [name] = atRule.params.split(/\s/);

                        names.push(name);
                    });
                },
                OnceExit: () => {
                    options.importTo?.(names);
                },
            };
        },
    };
}

module.exports = postcssMixinNames;
