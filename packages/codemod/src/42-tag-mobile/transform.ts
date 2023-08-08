import { ASTPath, JSCodeshift, JSXElement } from 'jscodeshift';

import { addStringAttribute } from '../utils';

export function tagTransformer(source, j, replacements) {
    /**
     * Находим использование компонента Tag и меняем ему пропсы
     */
    source.findJSXElements('Tag').forEach((path) => {
        j(path).replaceWith((astPath: ASTPath<JSXElement>) => {
            const { node } = astPath;

            const { openingElement } = node;

            replacements.forEach((replacement) => {
                const existing = j(openingElement).find(j.JSXAttribute, {
                    name: { name: replacement.name },
                    value: { value: replacement.from },
                });

                if (existing.length) {
                    existing.replaceWith(() =>
                        j.jsxAttribute(
                            j.jsxIdentifier(replacement.name),
                            j.stringLiteral(replacement.to),
                        ),
                    );
                } else {
                    addStringAttribute(j, openingElement, {
                        name: replacement.name,
                        value: replacement.to,
                    });
                }
            });

            return node;
        });
    });
}

export default function transformer(file, api) {
    const j: JSCodeshift = api.jscodeshift;
    const source = j(file.source);

    const replacements = [
        { name: 'view', from: 'outlined', to: 'filled' },
        { name: 'shape', from: 'rounded', to: 'rectangular' },
    ];

    tagTransformer(source, j, replacements);

    return source.toSource({ quote: 'single' });
}
