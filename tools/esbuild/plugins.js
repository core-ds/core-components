const fs = require('fs');
const path = require('path');

const inlinePlugin = {
    name: 'inline-plugin',
    setup(build) {
        build.onLoad({ filter: /.tsx?$/ }, async (args) => {
            const getDataTestIdContent = await fs.promises.readFile(
                path.resolve(process.cwd(), '../utils/getDataTestId.ts'),
                'utf-8',
            );
            let text = await fs.promises.readFile(args.path, 'utf8');
            const importUtilsRe = /^import\s+{\s*(getDataTestId)?\s*}\s+from\s+['"](\S+)['"];$/gm;
            let matches = null;
            let hasUtilsImport = false;

            while ((matches = importUtilsRe.exec(text)) !== null) {
                hasUtilsImport = true;

                if (matches.index === importUtilsRe.lastIndex) {
                    importUtilsRe.lastIndex++;
                }

                const [importStr] = matches;
                text = text.replace(importStr, getDataTestIdContent);
            }

            const importJsonRe = /^import\s+(.*)\s+from\s+['"](\S+\.json)['"];$/gm;
            let matchesJson = null;
            let hasJsonImport = false;

            while ((matchesJson = importJsonRe.exec(text)) !== null) {
                hasJsonImport = true;

                if (matchesJson.index === importJsonRe.lastIndex) {
                    importJsonRe.lastIndex++;
                }

                const [importStr, varName, relPath] = matchesJson;

                const json = await fs.promises.readFile(
                    path.resolve(path.dirname(args.path), relPath),
                    'utf-8',
                );

                text = text.replace(importStr, `var ${varName} = ${json}`);
            }

            return hasUtilsImport || hasJsonImport ? { contents: text, loader: 'tsx' } : undefined;
        });
    },
};

module.exports = {
    inlinePlugin,
};
