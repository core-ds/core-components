import { ASTPath, JSXElement, Transform } from 'jscodeshift';

import { getKeys } from '../utils';

const REPLACE_MAP = {
    link: 'transparent',
    ghost: 'text',
} as const;

const buttonViewsReplace: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    const componentsNames = ['Button', 'ButtonDesktop', 'ButtonMobile'];

    componentsNames.forEach((elementName) => {
        source.findJSXElements(elementName).forEach((path) => {
            j(path).replaceWith((astPath: ASTPath<JSXElement>) => {
                const { node } = astPath;

                const { openingElement } = node;

                getKeys(REPLACE_MAP).forEach((from) => {
                    const replaceWith = REPLACE_MAP[from];

                    j(openingElement)
                        .find(j.JSXAttribute, {
                            name: { name: 'view' },
                            value: { value: from },
                        })
                        .replaceWith(() =>
                            j.jsxAttribute(j.jsxIdentifier('view'), j.stringLiteral(replaceWith)),
                        );
                });

                return node;
            });
        });
    });

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default buttonViewsReplace;
