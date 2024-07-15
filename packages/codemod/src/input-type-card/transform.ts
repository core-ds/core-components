/* eslint-disable */
import { ASTPath, JSXElement, Transform } from 'jscodeshift';
import { addStringAttribute } from '../utils';

const inputTypeTransform: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    const componentsNames = ['Input', 'InputDesktop', 'InputMobile'];

    componentsNames.forEach((elementName) => {
        source.findJSXElements(elementName).forEach((path) => {
            j(path).replaceWith((path: ASTPath<JSXElement>) => {
                const { node } = path;

                const { openingElement } = node;

                j(openingElement)
                    .find(j.JSXAttribute, {
                        name: { name: 'type' },
                        value: { value: 'card' },
                    })
                    .replaceWith(() =>
                        j.jsxAttribute(j.jsxIdentifier('inputMode'), j.stringLiteral('numeric')),
                    );
                return node;
            });
        });
    });
    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default inputTypeTransform;
