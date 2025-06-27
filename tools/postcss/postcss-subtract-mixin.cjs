const assert = require('node:assert/strict');
const crypto = require('node:crypto');

function sha256(str) {
    return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssSubtractMixin = () => ({
    postcssPlugin: 'postcss-subtract-mixin',
    prepare: () => {
        const store = [];

        return {
            Once(root, { AtRule, Rule }) {
                root.walkAtRules((atRule) => {
                    if (atRule.name === 'subtract-mixin') {
                        const mixinNames = atRule.params.split(',').map((name) => name.trim());

                        const rules = mixinNames.map(
                            (mixinName) =>
                                new Rule({
                                    selector: `.${sha256(`${mixinName}-${Math.random()}`)}`,
                                    nodes: [new AtRule({ name: 'mixin', params: mixinName })],
                                }),
                        );

                        atRule.replaceWith(rules);
                        store.push(rules);
                    }
                });
            },
            OnceExit: () => {
                while (store.length > 0) {
                    const rules = store.pop();
                    rules.forEach((rule) => {
                        assert(
                            rule.nodes.every((node) => node.type == 'decl'),
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
                    rules.forEach((rule) => rule.remove());
                }
            },
        };
    },
});

module.exports = postcssSubtractMixin;
