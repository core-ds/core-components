import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const checkboxGroupTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'checkbox-group') ? `${path}/desktop` : path),
        (path) =>
            hasImportSpecifier(path, 'CheckboxGroup') ||
            hasImportSpecifier(path, 'CheckboxGroupProps'),
    );
    modifyIdentifiers(source, j, 'CheckboxGroup', 'CheckboxGroupDesktop');
    modifyIdentifiers(source, j, 'CheckboxGroupProps', 'CheckboxGroupDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    checkboxGroupTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
