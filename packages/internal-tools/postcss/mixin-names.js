/**
 * @typedef MixinNamesPluginOptions
 * @property {(names: string[]) => void} [importTo]
 */

/**
 * @type {import('postcss').PluginCreator<MixinNamesPluginOptions>}
 */
export const postcssMixinNames = (options) => ({
    postcssPlugin: 'postcss-mixin-names',
    prepare: () => {
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
});

postcssMixinNames.postcss = true;
