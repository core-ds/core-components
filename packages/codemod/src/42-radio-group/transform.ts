import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const radioGroupTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'radio-group') ? `${path}/desktop` : path),
        (path) =>
            hasImportSpecifier(path, 'RadioGroup') || hasImportSpecifier(path, 'RadioGroupProps'),
    );
    modifyIdentifiers(source, j, 'RadioGroup', 'RadioGroupDesktop');
    modifyIdentifiers(source, j, 'RadioGroupProps', 'RadioGroupDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    radioGroupTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
