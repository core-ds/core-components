import path from 'node:path';
import slash from 'slash';
import ts from 'typescript';

import { unquote } from '../utils.cjs';

import { matchCoreComponentsModule } from './utils.mjs';

/**
 * @param {string} build
 */
export function transformDeclarations(build) {
    /**
     * @type {import('typescript').CustomTransformers}
     */
    const transform = {
        afterDeclarations: [
            function fixDeclarationFactory(context) {
                return function fixModuleSpecifiers(source) {
                    /**
                     * @param {import('typescript').Node} node
                     */
                    function visitor(node) {
                        if (ts.isExportDeclaration(node)) {
                            const text = node.moduleSpecifier?.getText(source);

                            if (text) {
                                const [quote] = text;
                                const match = matchCoreComponentsModule(unquote(text));

                                if (match) {
                                    const [, componentName, entryPoint] = match;

                                    return ts.factory.createExportDeclaration(
                                        node.decorators,
                                        node.modifiers,
                                        node.isTypeOnly,
                                        node.exportClause,
                                        ts.factory.createStringLiteral(
                                            slash(path.join(componentName, build, entryPoint)),
                                            quote === "'",
                                        ),
                                        node.assertClause,
                                    );
                                }
                            }
                        } else if (ts.isImportDeclaration(node)) {
                            const text = node.moduleSpecifier.getText(source);
                            const [quote] = text;
                            const match = matchCoreComponentsModule(unquote(text));

                            if (match) {
                                const [, componentName, entryPoint] = match;

                                return ts.factory.createImportDeclaration(
                                    node.decorators,
                                    node.modifiers,
                                    node.importClause,
                                    ts.factory.createStringLiteral(
                                        slash(path.join(componentName, build, entryPoint)),
                                        quote === "'",
                                    ),
                                    node.assertClause,
                                );
                            }
                        }

                        return ts.visitEachChild(node, visitor, context);
                    }

                    return ts.visitEachChild(source, visitor, context);
                };
            },
        ],
    };

    return transform;
}
