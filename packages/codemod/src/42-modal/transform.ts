import {
    createImport,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const modalEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@alfalab\/core-components[-/]modal\//.test(path) ? path.replace('/responsive', '') : path,
    );
    modifyIdentifiers(source, j, 'ModalResponsive', 'Modal');
    modifyIdentifiers(source, j, 'ModalResponsiveProps', 'ModalProps');
    createImport({
        source,
        j,
        exclude: ['Modal', 'ModalProps'],
        include: [],
        packageName: 'modal',
        path: '/shared',
    });

    removeEmptyCoreImport(source, j, 'modal');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    modalEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
