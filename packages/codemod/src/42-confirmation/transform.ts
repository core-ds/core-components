import {
    createImport,
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const confirmationEntryTransformer = (source, j) => {
    createImport({
        source,
        j,
        exclude: ['Confirmation', 'ConfirmationProps', 'useConfirmation', 'useCountdown'],
        include: [],
        packageName: 'confirmation',
        path: '/shared',
    });

    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'confirmation') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Confirmation'),
    );
    modifyIdentifiers(source, j, 'Confirmation', 'ConfirmationDesktop');
    modifyIdentifiers(source, j, 'ConfirmationProps', 'DesktopConfirmationProps');

    modifyImportPath(source, j, (path) =>
        /@balafla\/core-components[-/]confirmation\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'ConfirmationResponsive', 'Confirmation');
    modifyIdentifiers(source, j, 'ResponsiveConfirmationProps', 'ConfirmationProps');

    removeEmptyCoreImport(source, j, 'confirmation');

    return source;
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    confirmationEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
