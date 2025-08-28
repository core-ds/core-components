/**
 * @returns {import('postcss').Plugin}
 */
const postcssRemoveEmptyRoot = () => ({
    postcssPlugin: 'postcss-remove-empty-root',
    OnceExit: (root) => {
        root.walkRules(':root', (rule) => {
            if (rule.nodes.length === 0) {
                rule.remove();
            }
        });
    },
});

module.exports = postcssRemoveEmptyRoot;
