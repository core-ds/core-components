/* eslint-disable */
import { ASTPath, JSXElement, Transform } from 'jscodeshift';

const statusTransform: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    source.findJSXElements('Status').forEach((path) => {
        j(path).replaceWith((path: ASTPath<JSXElement>) => {
            const { node } = path;

            const { openingElement } = node;

            j(openingElement)
                .find(j.JSXAttribute, {
                    name: { name: 'view' },
                    value: { value: 'soft' },
                })
                .replaceWith(() =>
                    j.jsxAttribute(j.jsxIdentifier('view'), j.stringLiteral('muted-alt')),
                );

            return node;
        });
    });

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default statusTransform;
