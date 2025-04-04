export const isIndexEntry = (path, packageName) =>
    new RegExp(`@alfalab\\/core-components[\\/-]${packageName}(?:\\/(?:modern|esm|cssm))?$`).test(
        path,
    );

export const hasImportSpecifier = (path, specName): boolean =>
    path.node.specifiers.some((p) => !!p.imported && p.imported.name === specName);

export const createImport = ({ source, j, exclude, include, packageName, path }) => {
    const identifiers: string[] = [];
    const imports = source.find(j.ImportDeclaration);
    const coreIndexImports = imports.filter((p) => isIndexEntry(p.node.source.value, packageName));

    if (coreIndexImports.length) {
        const indexPath = coreIndexImports.at(0).get().node.source.value;
        const forTransform = coreIndexImports.find(j.ImportSpecifier).filter((p) => {
            if (exclude?.length) {
                return !exclude.includes(p.node.imported.name);
            }

            return include.includes(p.node.imported.name);
        });

        forTransform.forEach((p) => identifiers.push(p.node.imported.name));
        forTransform.remove();

        if (identifiers.length) {
            j(coreIndexImports.at(0).get()).insertAfter(
                `import { ${identifiers.join(', ')} } from '${indexPath}${path}';`,
            );
        }
    }
};

export const removeEmptyCoreImport = (source, j, packageName) => {
    const imports = source.find(j.ImportDeclaration);
    const emptyImports = imports.filter(
        (path) => isIndexEntry(path.node.source.value, packageName) && !path.node.specifiers.length,
    );

    if (emptyImports.length) {
        emptyImports.remove();
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const modifyImportPath = (source, j, replacer, filterFn = (args: unknown) => true) => {
    const isCoreComponentImport = (str) => str.startsWith('@balafla/core-components');

    source
        .find(j.ImportDeclaration)
        .filter(filterFn)
        .find(j.StringLiteral)
        .filter((path) => isCoreComponentImport(path.node.value))
        .replaceWith((path) => j.stringLiteral(replacer(path.node.value)));
};

export const modifyIdentifiers = (source, j, prevValue, newValue) => {
    source
        .find(j.Identifier)
        .filter((path) => path.node.name === prevValue)
        .replaceWith(j.identifier(newValue));
};
