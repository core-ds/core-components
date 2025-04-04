import { modifyIdentifiers, modifyImportPath } from '../42-utils';

const dateRangeInputEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@balafla\/core-components[-/]date-range-input\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'DateRangeInputResponsive', 'DateRangeInput');
    modifyIdentifiers(source, j, 'DateRangeInputResponsiveProps', 'DateRangeInputProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    dateRangeInputEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
