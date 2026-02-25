import { Transform } from 'jscodeshift';

import { getKeys } from '../utils';

const REPLACE_MAP = {
    s: 48,
    m: 56,
    l: 64,
    xl: 72,
} as const;

const sizeTransform: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    const componentsNames = ['Select', 'SelectDesktop', 'SelectMobile'];

    componentsNames.forEach((elementName) => {
        source.findJSXElements(elementName).forEach((path) => {
            const { node } = path;
            const { openingElement } = node;

            getKeys(REPLACE_MAP).forEach((from) => {
                const replaceWith = REPLACE_MAP[from];

                j(openingElement)
                    .find(j.JSXAttribute, {
                        name: { name: 'size' },
                        value: (valueNode) => {
                            if (!valueNode) return false;
                            if (valueNode.type === 'StringLiteral' && valueNode.value === from) {
                                return true;
                            }
                            if (
                                valueNode.type === 'JSXExpressionContainer' &&
                                valueNode.expression.type === 'StringLiteral' &&
                                valueNode.expression.value === from
                            ) {
                                return true;
                            }
                            return false;
                        },
                    })
                    .replaceWith(() =>
                        j.jsxAttribute(
                            j.jsxIdentifier('size'),
                            j.jsxExpressionContainer(j.literal(replaceWith)),
                        ),
                    );

                j(openingElement)
                    .find(j.JSXAttribute, {
                        name: { name: 'optionsSize' },
                        value: (valueNode) => {
                            if (!valueNode) return false;
                            if (valueNode.type === 'StringLiteral' && valueNode.value === from) {
                                return true;
                            }
                            if (
                                valueNode.type === 'JSXExpressionContainer' &&
                                valueNode.expression.type === 'StringLiteral' &&
                                valueNode.expression.value === from
                            ) {
                                return true;
                            }
                            return false;
                        },
                    })
                    .replaceWith(() =>
                        j.jsxAttribute(
                            j.jsxIdentifier('optionsSize'),
                            j.jsxExpressionContainer(j.literal(replaceWith)),
                        ),
                    );

                j(openingElement)
                    .find(j.JSXAttribute, {
                        name: { name: 'optionProps' },
                    })
                    .forEach((attrPath) => {
                        const { value } = attrPath.node;

                        if (
                            value &&
                            value.type === 'JSXExpressionContainer' &&
                            value.expression.type === 'ObjectExpression'
                        ) {
                            value.expression.properties.forEach((prop) => {
                                if (
                                    value?.type === 'JSXExpressionContainer' &&
                                    value.expression.type === 'ObjectExpression'
                                ) {
                                    value.expression.properties.forEach((prop) => {
                                        if (
                                            prop.type === 'ObjectProperty' &&
                                            prop.key.type === 'Identifier' &&
                                            prop.key.name === 'size' &&
                                            prop.value.type === 'StringLiteral' &&
                                            prop.value.value === from
                                        ) {
                                            prop.value = j.literal(replaceWith);
                                        }
                                    });
                                }
                            });
                        }
                    });

                j(openingElement)
                    .find(j.JSXAttribute, {
                        name: { name: 'optionsListProps' },
                    })
                    .forEach((attrPath) => {
                        const { value } = attrPath.node;

                        if (
                            value &&
                            value.type === 'JSXExpressionContainer' &&
                            value.expression.type === 'ObjectExpression'
                        ) {
                            value.expression.properties.forEach((prop) => {
                                if (
                                    value?.type === 'JSXExpressionContainer' &&
                                    value.expression.type === 'ObjectExpression'
                                ) {
                                    value.expression.properties.forEach((prop) => {
                                        if (
                                            prop.type === 'ObjectProperty' &&
                                            prop.key.type === 'Identifier' &&
                                            prop.key.name === 'size' &&
                                            prop.value.type === 'StringLiteral' &&
                                            prop.value.value === from
                                        ) {
                                            prop.value = j.literal(replaceWith);
                                        }
                                    });
                                }
                            });
                        }
                    });

                j(openingElement)
                    .find(j.JSXAttribute, {
                        name: { name: 'groupOptionProps' },
                    })
                    .forEach((attrPath) => {
                        const { value } = attrPath.node;

                        if (
                            value &&
                            value.type === 'JSXExpressionContainer' &&
                            value.expression.type === 'ObjectExpression'
                        ) {
                            value.expression.properties.forEach((prop) => {
                                if (
                                    value?.type === 'JSXExpressionContainer' &&
                                    value.expression.type === 'ObjectExpression'
                                ) {
                                    value.expression.properties.forEach((prop) => {
                                        if (
                                            prop.type === 'ObjectProperty' &&
                                            prop.key.type === 'Identifier' &&
                                            prop.key.name === 'size' &&
                                            prop.value.type === 'StringLiteral' &&
                                            prop.value.value === from
                                        ) {
                                            prop.value = j.literal(replaceWith);
                                        }
                                    });
                                }
                            });
                        }
                    });
            });
        });
    });

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default sizeTransform;
