import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const tagTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'tag') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Tag') || hasImportSpecifier(path, 'TagProps'),
    );
    modifyIdentifiers(source, j, 'Tag', 'TagDesktop');
    modifyIdentifiers(source, j, 'TagProps', 'TagDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    tagTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
