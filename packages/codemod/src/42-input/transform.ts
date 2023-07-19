import {
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
} from '../42-utils';

const inputTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'input') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Input') || hasImportSpecifier(path, 'InputProps'),
    );
    modifyIdentifiers(source, j, 'Input', 'InputDesktop');
    modifyIdentifiers(source, j, 'InputProps', 'InputDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    inputTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
