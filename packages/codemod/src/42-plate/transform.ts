import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const plateTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'plate') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Plate') || hasImportSpecifier(path, 'PlateProps'),
    );
    modifyIdentifiers(source, j, 'Plate', 'PlateDesktop');
    modifyIdentifiers(source, j, 'PlateProps', 'PlateDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    plateTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
