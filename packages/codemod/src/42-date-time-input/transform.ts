import { modifyIdentifiers, modifyImportPath } from '../42-utils';

const dateTimeInputEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@balafla\/core-components[-/]date-time-input\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'DateTimeInputResponsive', 'DateTimeInput');
    modifyIdentifiers(source, j, 'DateTimeInputResponsiveProps', 'DateTimeInputProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    dateTimeInputEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
