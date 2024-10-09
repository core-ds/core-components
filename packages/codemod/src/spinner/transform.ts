/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { ASTPath, JSXElement, Transform } from 'jscodeshift';

import { log } from '../utils';

const spinnerTransform: Transform = (fileInfo, api) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    source.findJSXElements('Spinner').forEach((path) => {
        j(path).replaceWith((path: ASTPath<JSXElement>) => {
            const jsxOpeningElement = j(path).find(j.JSXOpeningElement, {
                name: { name: 'Spinner' },
            });

            jsxOpeningElement
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { value: 'xs' },
                })
                .replaceWith(() =>
                    j.jsxAttribute(
                        j.jsxIdentifier('preset'),
                        j.jsxExpressionContainer(j.literal(16)),
                    ),
                );

            jsxOpeningElement
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { expression: { value: 16 } },
                })
                .replaceWith(() =>
                    j.jsxAttribute(
                        j.jsxIdentifier('preset'),
                        j.jsxExpressionContainer(j.literal(16)),
                    ),
                );

            jsxOpeningElement
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { value: 's' },
                })
                .replaceWith(() =>
                    j.jsxAttribute(
                        j.jsxIdentifier('preset'),
                        j.jsxExpressionContainer(j.literal(24)),
                    ),
                );

            jsxOpeningElement
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { expression: { value: 24 } },
                })
                .replaceWith(() =>
                    j.jsxAttribute(
                        j.jsxIdentifier('preset'),
                        j.jsxExpressionContainer(j.literal(24)),
                    ),
                );

            jsxOpeningElement
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { value: 'm' },
                })
                .replaceWith(() =>
                    j.jsxAttribute(
                        j.jsxIdentifier('preset'),
                        j.jsxExpressionContainer(j.literal(48)),
                    ),
                );

            jsxOpeningElement
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { expression: { value: 48 } },
                })
                .replaceWith(() =>
                    j.jsxAttribute(
                        j.jsxIdentifier('preset'),
                        j.jsxExpressionContainer(j.literal(48)),
                    ),
                );

            if (
                jsxOpeningElement.find(j.JSXSpreadAttribute).length > 0 &&
                jsxOpeningElement.find(j.JSXAttribute, {
                    name: { name: 'size' },
                }).length === 0
            ) {
                log(
                    `Не удалось определить значение 'size' компонента 'Spinner', используется spread оператор:\n${fileInfo.path}:${path.node.openingElement.loc?.start.line}\n`,
                    'warning',
                );
            }

            jsxOpeningElement.replaceWith((path) =>
                j.jsxOpeningElement(
                    j.jsxIdentifier('SpinnerPreset'),
                    path.node.attributes,
                    path.node.selfClosing,
                ),
            );

            j(path)
                .find(j.JSXClosingElement, {
                    name: { name: 'Spinner' },
                })
                .replaceWith(j.jsxClosingElement(j.jsxIdentifier('SpinnerPreset')));

            return path.node;
        });
    });

    source
        .find(j.ImportDeclaration, {
            source: { value: '@alfalab/core-components/spinner' },
        })
        .replaceWith(
            j.importDeclaration(
                [j.importSpecifier(j.identifier('SpinnerPreset'))],
                j.stringLiteral('@alfalab/core-components/spinner/preset'),
            ),
        );

    return source.toSource({
        quote: 'single',
        wrapColumn: 1000,
    });
};

export default spinnerTransform;
