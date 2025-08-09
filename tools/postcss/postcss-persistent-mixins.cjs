/**
 * @returns {import('postcss').AcceptedPlugin}
 */
function postcssPersistentMixins() {
    return {
        postcssPlugin: 'postcss-persistent-mixins',
        Once: (root, helpers) => {
            root.walkAtRules((atRule) => {
                if (atRule.name === 'persistent-mixin') {
                    atRule.replaceWith(
                        helpers.postcss.atRule({ name: 'mixin', params: atRule.params }),
                    );
                }
            });
        },
    };
}

module.exports = postcssPersistentMixins;
