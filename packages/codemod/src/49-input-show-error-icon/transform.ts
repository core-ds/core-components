import { ASTPath, JSXElement, Transform } from 'jscodeshift';

const transformer: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    // Компоненты в которые можно передавать напрямую showErrorIcon={true}
    const inputs = [
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
    ];

    inputs.forEach((component) => {
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

    // Компоненты в которые нужно передавать как fieldProps={showErrorIcon: true}
    const componentsUsingInput = [
        'InputAutocomplete',
        'InputAutocompleteDesktop',
        'InputAutocompleteMobile',
        'InputAutocompleteModalMobile',
        'Select',
        'SelectDesktop',
        'SelectMobile',
        'SelectModalMobile',
    ];

    componentsUsingInput.forEach((componentName) => {
        source.findJSXElements(componentName).forEach((path) => {
            j(path).replaceWith((astPath: ASTPath<JSXElement>) => {
                const { node } = astPath;

                const fieldPropsAttribute = j.jsxAttribute(
                    j.jsxIdentifier('fieldProps'),
                    j.jsxExpressionContainer(
                        j.objectExpression([
                            j.property(
                                'init',
                                j.identifier('showErrorIcon'),
                                j.booleanLiteral(true),
                            ),
                        ]),
                    ),
                );

                const existingFieldProps = node.openingElement.attributes.find(
                    (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'fieldProps',
                );

                if (existingFieldProps) {
                    if (
                        existingFieldProps.value.type === 'JSXExpressionContainer' &&
                        existingFieldProps.value.expression.type === 'ObjectExpression'
                    ) {
                        existingFieldProps.value.expression.properties.push(
                            j.property(
                                'init',
                                j.identifier('showErrorIcon'),
                                j.booleanLiteral(true),
                            ),
                        );
                    }
                } else {
                    node.openingElement.attributes.push(fieldPropsAttribute);
                }

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
