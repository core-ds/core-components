import { ASTPath, JSXElement, Transform } from 'jscodeshift';

const transformer: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    const components = [
        'Input',
        'PasswordInput',
        'InternationalPhoneInput',
        'InternationalPhoneInputDesktop',
        'InternationalPhoneInputMobile',
        'MaskedInput',
        'NumberInput',
        'NumberInputDesktop',
        'NumberInputMobile',
        'PhoneInput',
        'SliderInput',
        'UniversalDateInput',
        'UniversalDateInputDesktop',
        'UniversalDateInputMobile',
        'InputAutocomplete',
        'InputAutocompleteDesktop',
        'InputAutocompleteMobile',
        'InputAutocompleteModalMobile',
        'Select',
        'SelectDesktop',
        'SelectMobile',
        'SelectModalMobile',
    ];

    components.forEach((component) => {
        source.findJSXElements(component).forEach((path) => {
            j(path).replaceWith((astPath: ASTPath<JSXElement>) => {
                const { node } = astPath;

                node.openingElement.attributes.push(
                    j.jsxAttribute(
                        j.jsxIdentifier('showErrorIcon'),
                        j.jsxExpressionContainer(j.booleanLiteral(true)),
                    ),
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

export default transformer;
