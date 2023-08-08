import {
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
} from '../42-utils';

const filterTagTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'filter-tag') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'FilterTag') || hasImportSpecifier(path, 'FilterTagProps'),
    );
    modifyIdentifiers(source, j, 'FilterTag', 'FilterTagDesktop');
    modifyIdentifiers(source, j, 'FilterTagProps', 'FilterTagDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    filterTagTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
