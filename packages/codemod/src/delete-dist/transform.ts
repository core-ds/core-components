const transformPaths = (fileInfo, api, options) => {
    const j = api.jscodeshift;
    const source = j(fileInfo.source);

    const packages = options.packages ? options.packages.split(',') : [];

    const importsForReplace = source
        .find(j.ImportSpecifier)
        .filter((path) => {
            const importFrom = path.parent.value.source.value;

            if (packages.length > 0) {
                const reList = packages.map(
                    (p) => new RegExp(`^@balafla/core-components-${p}/dist`),
                );

                return reList.some((re) => re.test(importFrom));
            }

            const re = new RegExp('^(@balafla/core-components-).+(/dist)');

            return re.test(importFrom);
        })
        .map((p) => p.parent);

    importsForReplace.replaceWith((p) =>
        j.importDeclaration(
            p.node.specifiers,
            j.stringLiteral(p.value.source.value.replace('/dist', '')),
        ),
    );

    return source.toSource({ quote: 'single' });
};

export default transformPaths;
