import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const buttonTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'button') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Button') || hasImportSpecifier(path, 'ButtonProps'),
    );
    modifyIdentifiers(source, j, 'Button', 'ButtonDesktop');
    modifyIdentifiers(source, j, 'ButtonProps', 'ButtonDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    buttonTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
