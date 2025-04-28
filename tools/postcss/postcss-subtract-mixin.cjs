const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { AtRule, Rule } = require('postcss');

function sha256(str) {
    return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

const postcssSubtractMixin = () => ({
    postcssPlugin: 'postcss-subtract-mixin-plugin',
    prepare: () => {
        const store = [];

        return {
            Once(root) {
                root.walkAtRules((atrule) => {
                    if (atrule.name === 'subtract-mixin') {
                        const mixinNamess = atrule.params.split(',').map((name) => name.trim());

                        const rules = mixinNamess.map(
                            (mixinName) =>
                                new Rule({
                                    selector: `.${sha256(`${mixinName}-${Math.random()}`)}`,
                                    nodes: [new AtRule({ name: 'mixin', params: mixinName })],
                                }),
                        );

                        atrule.replaceWith(rules);
                        store.push(rules);
                    }
                });
            },
            OnceExit: () => {
                while (store.length > 0) {
                    const rules = store.pop();
                    // rules.forEach((rule) => {
                    //     // every rule must have declarations only
                    //     assert(rule.nodes.every((node) => node.type == 'decl'));
                    // });
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

postcssSubtractMixin.postcss = true;

module.exports = postcssSubtractMixin;
