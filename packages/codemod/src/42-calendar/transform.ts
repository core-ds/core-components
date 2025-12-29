import {
    createImport,
    hasImportSpecifier,
    isIndexEntry,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const calendarEntryTransformer = (source, j) => {
    createImport({
        source,
        j,
        exclude: ['Calendar', 'CalendarProps', 'CalendarResponsive', 'CalendarResponsiveProps'],
        include: [],
        packageName: 'calendar',
        path: '/shared',
    });

    modifyImportPath(
        source,
        j,
        (path) => (isIndexEntry(path, 'calendar') ? `${path}/desktop` : path),
        (path) => hasImportSpecifier(path, 'Calendar'),
    );
    modifyIdentifiers(source, j, 'Calendar', 'CalendarDesktop');
    modifyIdentifiers(source, j, 'CalendarProps', 'CalendarDesktopProps');

    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]calendar\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'CalendarResponsive', 'Calendar');
    modifyIdentifiers(source, j, 'CalendarResponsiveProps', 'CalendarProps');

    removeEmptyCoreImport(source, j, 'calendar');

    return source;
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    calendarEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
