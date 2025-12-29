import {
    createImport,
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const tooltipEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]tooltip\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'tooltip') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Tooltip'),
    );
    modifyIdentifiers(source, j, 'Tooltip', 'TooltipDesktop');
    modifyIdentifiers(source, j, 'TooltipProps', 'TooltipDesktopProps');
    modifyIdentifiers(source, j, 'TooltipResponsive', 'Tooltip');
    modifyIdentifiers(source, j, 'TooltipResponsiveProps', 'TooltipProps');
    createImport({
        source,
        j,
        exclude: ['Tooltip', 'TooltipProps'],
        include: [],
        packageName: 'tooltip',
        path: '/shared',
    });

    removeEmptyCoreImport(source, j, 'tooltip');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    tooltipEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
