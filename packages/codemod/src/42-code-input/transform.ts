import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const codeInputTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'code-input') ? `${path}/desktop` : path),
        (path) =>
            hasImportSpecifier(path, 'CodeInput') || hasImportSpecifier(path, 'CodeInputProps'),
    );
    modifyIdentifiers(source, j, 'CodeInput', 'CodeInputDesktop');
    modifyIdentifiers(source, j, 'CodeInputProps', 'CodeInputDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    codeInputTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
