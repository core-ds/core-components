import {
    createImport,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const pickerButtonEntryTransformer = (source, j) => {
    createImport({
        source,
        j,
        exclude: ['PickerButton', 'PickerButtonProps'],
        include: [],
        packageName: 'picker-button',
        path: '/shared',
    });
    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]picker-button\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'PickerButtonResponsive', 'PickerButton');
    modifyIdentifiers(source, j, 'PickerButtonResponsiveProps', 'PickerButtonProps');

    removeEmptyCoreImport(source, j, 'picker-button');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    pickerButtonEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
