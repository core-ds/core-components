import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const formControlTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'form-control') ? `${path}/desktop` : path),
        (path) =>
            hasImportSpecifier(path, 'FormControl') || hasImportSpecifier(path, 'FormControlProps'),
    );
    modifyIdentifiers(source, j, 'FormControl', 'FormControlDesktop');
    modifyIdentifiers(source, j, 'FormControlProps', 'FormControlDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    formControlTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
