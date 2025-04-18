import {
    createImport,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const calendarInputEntryTransformer = (source, j) => {
    createImport({
        source,
        j,
        exclude: ['CalendarInput', 'CalendarInputProps'],
        include: [],
        packageName: 'calendar-input',
        path: '/shared',
    });
    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]calendar-input\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'CalendarInputResponsive', 'CalendarInput');
    modifyIdentifiers(source, j, 'CalendarInputResponsiveProps', 'CalendarInputProps');

    removeEmptyCoreImport(source, j, 'calendar-input');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    calendarInputEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
