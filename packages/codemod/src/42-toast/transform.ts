import {
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
} from '../42-utils';

const toastTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'toast') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Toast') || hasImportSpecifier(path, 'ToastProps'),
    );
    modifyIdentifiers(source, j, 'Toast', 'ToastDesktop');
    modifyIdentifiers(source, j, 'ToastProps', 'ToastDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    toastTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
