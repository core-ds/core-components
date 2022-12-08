const globby = require('globby');
const fs = require('fs');
const { promisify } = require('util');
const getDirName = require('path').dirname;
const { inlinePlugin } = require('./plugins');

const writeFile = promisify(fs.writeFile);
const readDir = promisify(fs.readdir);
const mkDir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);

function getEsbuildConfig({ format = 'cjs', outDir, target = 'es5' }) {
    const entryPoints = globby.sync(['src/**/*{.ts,.tsx,.js,.jsx}', '!src/**/*.test{.ts,.tsx}']);

    return {
        entryPoints,
        sourcemap: false,
        format,
        write: false,
        target: target === 'es5' ? 'es6' : target,
        outdir: outDir,
        plugins: [inlinePlugin],
    };
}

function getSwcConfig({ target = 'es5', format = 'cjs' }) {
    const formatMap = {
        cjs: 'commonjs',
        esm: 'es6',
    };

    return {
        sourceMaps: false,
        isModule: format !== 'cjs',
        jsc: { target },
        module: { type: formatMap[format] },
    };
}

async function writeTranspiledFiles(files) {
    await Promise.all(
        files.map(async (file) => {
            await checkOrCreateDir(getDirName(file.path));
            return await writeFile(file.path, file.text);
        }),
    );
}

async function checkOrCreateDir(dir) {
    try {
        await readDir(dir, 'utf-8');
    } catch (error) {
        await mkDir(dir, { recursive: true });
    }
}

function findCssImportDeclarations(jsFile) {
    const requireRe = /^(var|let|const) (\S+)\s+=.+require\(['"](\..+\.css)['"]\)+;$/gm;
    const importRe = /^import\s+(\S+)\s+from\s+['"](\..+\.css)+['"];$/gm;
    const result = [];

    let matches;
    while ((matches = requireRe.exec(jsFile.text)) !== null) {
        if (matches.index === requireRe.lastIndex) {
            requireRe.lastIndex++;
        }

        const [importStr, varKind, varName, cssRelPath] = matches;
        result.push({ importStr, varKind, varName, cssRelPath });
    }

    while ((matches = importRe.exec(jsFile.text)) !== null) {
        if (matches.index === importRe.lastIndex) {
            importRe.lastIndex++;
        }

        const [importStr, varName, cssRelPath] = matches;
        result.push({ importStr, varKind: 'var', varName, cssRelPath });
    }

    return result;
}
function cloneOutputFiles(outputFiles = []) {
    return outputFiles.map((file) => ({ ...file }));
}

module.exports = {
    readFile,
    copyFile,
    writeFile,
    checkOrCreateDir,
    getEsbuildConfig,
    getSwcConfig,
    writeTranspiledFiles,
    findCssImportDeclarations,
    cloneOutputFiles,
};
