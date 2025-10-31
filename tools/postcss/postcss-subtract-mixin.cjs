const assert = require('node:assert/strict');
const stringHash = require('string-hash');

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssSubtractMixin = () => ({
    postcssPlugin: 'postcss-subtract-mixin',
    prepare: () => {
        /**
         * @type {Array<Array<import('postcss').Rule>>}
         */
        const rulesets = [];

        return {
            AtRule: {
                'subtract-mixin': (atRule, helpers) => {
                    const mixinNames = atRule.params.split(',').map((name) => name.trim());

                    const rules = mixinNames.map((mixinName) => {
                        const selector = `.${stringHash(`${mixinName}-${Math.random()}`).toString(
                            36,
                        )}`;

                        return helpers.postcss.rule({
                            selector,
                            nodes: [helpers.postcss.atRule({ name: 'mixin', params: mixinName })],
                        });
                    });

                    atRule.replaceWith(rules);
                    rulesets.push(rules);
                },
            },
            OnceExit: () => {
                while (rulesets.length > 0) {
                    const ruleset = rulesets.pop();

                    ruleset.forEach((rule) => {
                        assert(
                            rule.nodes.every((node) => node.type === 'decl'),
                            'Every rule must have declarations only',
                        );
                    });
                    const [source, ...rest] = ruleset;
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
                    ruleset.forEach((rule) => {
                        rule.remove();
                    });
                }
            },
        };
    },
});

module.exports = postcssSubtractMixin;
