/**
 * @type {import('postcss').PluginCreator<undefined>}
 */
export const postcssRemoveEmptyRoot = () => ({
    postcssPlugin: 'postcss-remove-empty-root',
    OnceExit: (root) => {
        root.walkRules(':root', (rule) => {
            if (rule.nodes.length === 0) {
                rule.remove();
            }
        });
    },
});

postcssRemoveEmptyRoot.postcss = true;
