import { Transform } from 'jscodeshift';

import { getKeys } from '../utils';

const REPLACE_MAP = {
    s: 48,
} as const;

const sizeTransform: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    source.findJSXElements('ActionButton').forEach((path) => {
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
        });
    });

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default sizeTransform;
