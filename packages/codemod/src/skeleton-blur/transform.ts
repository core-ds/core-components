import { ASTPath, JSXElement, Transform } from 'jscodeshift';

const transformer: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    source.findJSXElements('Skeleton').forEach((path) => {
        j(path).replaceWith((astPath: ASTPath<JSXElement>) => {
            const { node } = astPath;

            node.openingElement.attributes.push(
                j.jsxAttribute(
                    j.jsxIdentifier('allowBackdropBlur'),
                    j.jsxExpressionContainer(j.booleanLiteral(true)),
                ),
            );

            return node;
        });
    });

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default transformer;
