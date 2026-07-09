import { Transform } from 'jscodeshift';

import { getKeys } from '../utils';

const REPLACE_MAP = {
    '3xs': 2,
    '2xs': 4,
    xs: 8,
    s: 12,
    m: 16,
    l: 20,
} as const;

const BORDER_RADIUS_MAP = {
    m: 8,
    l: 12,
    xl: 16,
} as const;

const sizeTransform: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    source.findJSXElements('SortableList').forEach((path) => {
        const { node } = path;
        const { openingElement } = node;

        getKeys(REPLACE_MAP).forEach((from) => {
            const replaceWith = REPLACE_MAP[from];

            j(openingElement)
                .find(j.JSXAttribute, {
                    name: { name: 'padding' },
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
                        j.jsxIdentifier('padding'),
                        j.jsxExpressionContainer(j.literal(replaceWith)),
                    ),
                );
        });

        getKeys(BORDER_RADIUS_MAP).forEach((from) => {
            const replaceWith = BORDER_RADIUS_MAP[from];

            j(openingElement)
                .find(j.JSXAttribute, {
                    name: { name: 'borderRadius' },
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
                        j.jsxIdentifier('borderRadius'),
                        j.jsxExpressionContainer(j.literal(replaceWith)),
                    ),
                );
        });
    });

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default sizeTransform;
