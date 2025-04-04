import {
    createImport,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const sidePanelEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@balafla\/core-components[-/]side-panel\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'SidePanelResponsive', 'SidePanel');
    modifyIdentifiers(source, j, 'SidePanelResponsiveProps', 'SidePanelProps');
    createImport({
        source,
        j,
        exclude: ['SidePanel', 'SidePanelProps'],
        include: [],
        packageName: 'side-panel',
        path: '/shared',
    });

    removeEmptyCoreImport(source, j, 'side-panel');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    sidePanelEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
