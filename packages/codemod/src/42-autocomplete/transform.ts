import {
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
} from '../42-utils';

const autocompleteEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]input-autocomplete\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'input-autocomplete') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'InputAutocomplete'),
    );
    modifyIdentifiers(source, j, 'InputAutocomplete', 'InputAutocompleteDesktop');
    modifyIdentifiers(source, j, 'InputAutocompleteProps', 'InputAutocompleteDesktopProps');
    modifyIdentifiers(source, j, 'InputAutocompleteResponsive', 'InputAutocomplete');
    modifyIdentifiers(source, j, 'InputAutocompleteResponsiveProps', 'InputAutocompleteProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    autocompleteEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
