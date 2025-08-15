/**
 * @returns {import('postcss').AcceptedPlugin}
 */
function postcssPersistentMixins() {
    return {
        postcssPlugin: 'postcss-persistent-mixins',
        Once: (root, helpers) => {
            root.walkAtRules('persistent-mixin', (atRule) => {
                atRule.replaceWith(
                    helpers.postcss.atRule({ name: 'mixin', params: atRule.params }),
                );
            });
        },
    };
}

module.exports = postcssPersistentMixins;
