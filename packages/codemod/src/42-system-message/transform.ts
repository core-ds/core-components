import { modifyIdentifiers, modifyImportPath } from '../42-utils';

const systemMessageEntryTransformer = (source, j) => {
    modifyImportPath(source, j, (path) =>
        /@balafla\/core-components[-/]system-message\//.test(path)
            ? path.replace('/responsive', '')
            : path,
    );
    modifyIdentifiers(source, j, 'SystemMessageResponsive', 'SystemMessage');
    modifyIdentifiers(source, j, 'SystemMessageResponsiveProps', 'SystemMessageProps');
};

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);

    systemMessageEntryTransformer(source, j);

    return source.toSource({ quote: 'single' });
}
