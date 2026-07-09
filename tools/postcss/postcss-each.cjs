const assert = require('node:assert/strict');
const postcssSimpleVars = require('postcss-simple-vars');

/**
 * @type {import('postcss').PluginCreator}
 */
const postcssEach = () => {
    const separator = /\s+in\s+/;

    return {
        postcssPlugin: 'postcss-each',
        AtRule: {
            each: async (rule, { list, postcss }) => {
                assert(separator.test(rule.params), 'Missed "in" keyword in @each');

                const [variablesPart, valuesPart] = rule.params
                    .split(/\s+in\s+/)
                    .map((s) => s.trim());

                assert(variablesPart.length > 0, 'Missed variable in @each');
                assert(valuesPart.length > 0, 'Missed values list in @each');

                const [variables, valuesList] = [variablesPart, valuesPart].map((s) =>
                    list.comma(s),
                );

                assert(
                    variables.every((variable) => variable.startsWith('$')),
                    'Every variable name must start with "$"',
                );

                const values = valuesList.map((value, i) => {
                    const match = /^\((.*)\)$/.exec(value);

                    return (match ? list.comma(match[1]) : [value]).concat(`${i}`);
                });

                const valueSize = Math.max(...values.map((value) => value.length));

                assert(
                    values.every((value) => value.length === valueSize),
                    'Every value in list must have the same size',
                );

                assert(variables.length <= valueSize, 'Defined more variables than value in list');

                if (variables.length === valueSize - 1) {
                    variables.push('$i');
                }

                await Promise.all(
                    values.map(async (value) => {
                        const context = Object.fromEntries(
                            variables.map((variable, i) => [variable.replace(/^\$/, ''), value[i]]),
                        );

                        const {
                            root: {
                                nodes: [proxy],
                            },
                        } = await postcss(postcssSimpleVars({ only: context })).process(
                            rule.clone(),
                            { from: undefined },
                        );

                        rule.parent.insertBefore(rule, proxy.nodes);
                    }),
                );

                rule.remove();
            },
        },
    };
};

postcssEach.postcss = true;

module.exports = postcssEach;
