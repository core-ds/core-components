const assert = require('node:assert/strict');
const stringHash = require('string-hash');

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssSubtractMixin = () => ({
    postcssPlugin: 'postcss-subtract-mixin',
    prepare: () => {
        const store = [];

        return {
            Once(root, { AtRule, Rule }) {
                root.walkAtRules('subtract-mixin', (atRule) => {
                    const mixinNames = atRule.params.split(',').map((name) => name.trim());

                    const rules = mixinNames.map((mixinName) => {
                        const selector = `.${stringHash(`${mixinName}-${Math.random()}`).toString(
                            36,
                        )}`;

                        return new Rule({
                            selector,
                            nodes: [new AtRule({ name: 'mixin', params: mixinName })],
                        });
                    });

                    atRule.replaceWith(rules);
                    store.push(rules);
                });
            },
            OnceExit: () => {
                while (store.length > 0) {
                    const rules = store.pop();

                    rules.forEach((rule) => {
                        assert(
                            rule.nodes.every((node) => node.type === 'decl'),
                            'Every rule must have declarations only',
                        );
                    });
                    const [source, ...rest] = rules;
                    const subtracts = rest.map(({ nodes }) => nodes).reduce((a, b) => a.concat(b));

                    const result = source.nodes.filter(
                        (sourceNode) =>
                            !subtracts.some(
                                (node) =>
                                    node.prop === sourceNode.prop &&
                                    node.value === sourceNode.value,
                            ),
                    );

                    source.parent.append(result);
                    rules.forEach((rule) => {
                        rule.remove();
                    });
                }
            },
        };
    },
});

module.exports = postcssSubtractMixin;
