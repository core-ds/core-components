const postcss = require('postcss');
const path = require('path');
const getDirName = require('path').dirname;
const { readFile, findCssImportDeclarations } = require('./utils');

const postcssConfig = require(path.join(process.env.LERNA_ROOT_PATH, 'postcss.config'));

function replaceModules(cssPath) {
    return cssPath.replace('module.css', 'css');
}

function resolveDestPath(jsFilePath, cssRelPath, preserveModules) {
    return path.resolve(
        getDirName(jsFilePath),
        preserveModules ? cssRelPath : replaceModules(cssRelPath),
    );
}

function resolveSrcPath(jsFilePath, cssRelPath, outDir) {
    return path.resolve(getDirName(jsFilePath.replace(outDir, 'src')), cssRelPath);
}

async function postcssProcess(source, preserveModules) {
    const content = await readFile(source);
    let classNamesMap;

    const result = await postcss([
        ...postcssConfig.plugins,
        ...(preserveModules
            ? []
            : [
                  require('postcss-modules')({
                      getJSON(filepath, json) {
                          classNamesMap = JSON.stringify(json);
                      },
                  }),
              ]),
    ]).process(content, { from: source });

    return { css: result.css, classNamesMap };
}

function transformJsFile(jsFile, cssImportData, classNamesMap) {
    const { importStr, varKind, varName, cssRelPath } = cssImportData;

    jsFile.text = jsFile.text.replace(
        importStr,
        `${varKind} ${varName} = ${classNamesMap}\nrequire('${replaceModules(cssRelPath)}')\n`,
    );

    jsFile.text = jsFile.text.replace(
        new RegExp(`${varName}\\.default(?![a-zA-Z-_])`, 'gm'),
        varName,
    );
}

async function buildCss(outputFiles = [], { outDir, preserveModules = false }) {
    const cssFiles = await Promise.all(
        outputFiles.map((jsFile) => {
            const cssImportsData = findCssImportDeclarations(jsFile);

            if (cssImportsData.length < 1) return [];

            return Promise.all(
                cssImportsData.map(async (cssImportData) => {
                    const { cssRelPath } = cssImportData;
                    const cssSourcePath = resolveSrcPath(jsFile.path, cssRelPath, outDir);
                    const cssDestPath = resolveDestPath(jsFile.path, cssRelPath, preserveModules);
                    const { css, classNamesMap } = await postcssProcess(
                        cssSourcePath,
                        preserveModules,
                    );

                    if (!preserveModules) {
                        transformJsFile(jsFile, cssImportData, classNamesMap);
                    }

                    return { path: cssDestPath, text: css };
                }),
            );
        }),
    );

    const cssFilesFlatten = cssFiles.flatMap((file) => file);

    return outputFiles.concat(cssFilesFlatten);
}

module.exports = {
    buildCss,
};
