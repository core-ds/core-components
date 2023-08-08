import {
    createImport,
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath, removeEmptyCoreImport,
} from '../42-utils';

const selectEntryTransformer = (source, j) => {
    createImport({
        source,
        j,
        include: ['SelectMobile', 'SelectMobileProps'],
        exclude: [],
        packageName: 'select',
        path: '/mobile',
    });
    createImport({
        source,
        j,
        exclude: ['Select', 'SelectProps'],
        packageName: 'select',
        path: '/shared',
        include: [],
    });
    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]select\//.test(path) ? path.replace('/responsive', '') : path,
    );
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'select') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Select'),
    );
    modifyIdentifiers(source, j, 'Select', 'SelectDesktop');
    modifyIdentifiers(source, j, 'SelectProps', 'SelectDesktopProps');
    modifyIdentifiers(source, j, 'SelectResponsive', 'Select');
    modifyIdentifiers(source, j, 'SelectResponsiveProps', 'SelectProps');
    removeEmptyCoreImport(source, j, 'select');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    selectEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
