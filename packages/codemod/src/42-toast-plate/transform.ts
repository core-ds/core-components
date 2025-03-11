import { hasImportSpecifier, isIndexEntry, modifyIdentifiers, modifyImportPath } from '../42-utils';

const toastPlateTransformer = (source, j) => {
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'toast-plate') ? `${path}/desktop` : path),
        (path) =>
            hasImportSpecifier(path, 'ToastPlate') || hasImportSpecifier(path, 'ToastPlateProps'),
    );
    modifyIdentifiers(source, j, 'ToastPlate', 'ToastPlateDesktop');
    modifyIdentifiers(source, j, 'ToastPlateProps', 'ToastPlateDesktopProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    toastPlateTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
