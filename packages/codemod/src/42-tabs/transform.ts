import {
    createImport,
    modifyIdentifiers,
    modifyImportPath,
    removeEmptyCoreImport,
} from '../42-utils';

const tabsEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@balafla\/core-components[-/]tabs\//.test(path) ? path.replace('/responsive', '') : path,
    );
    modifyIdentifiers(source, j, 'TabsResponsive', 'Tabs');
    modifyIdentifiers(source, j, 'TabsResponsiveProps', 'TabsProps');
    createImport({
        source,
        j,
        exclude: [
            'Tabs',
            'TabsProps',
            'Tab',
            'PrimaryTabListResponsive',
            'SecondaryTabListResponsive',
        ],
        include: [],
        packageName: 'tabs',
        path: '/shared',
    });

    removeEmptyCoreImport(source, j, 'tabs');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    tabsEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
