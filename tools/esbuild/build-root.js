const path = require('path');
const fs = require('fs');
const { checkOrCreateDir, copyFile, readFile, writeFile } = require('./utils');
const globby = require('globby');

const rootDistPath = '../../dist';

const cwd = process.cwd();
const currentPkg = path.join(cwd, 'package.json');
const pkg = require(currentPkg);

const currentPackage = pkg.name.replace('@alfalab/core-components-', '');

function resolveCurrFilePath(filePath) {
    return path.resolve(cwd, filePath);
}

function resolveDestFilePath(filePath) {
    return path.resolve(cwd, rootDistPath, filePath.replace('dist', currentPackage));
}

async function copyCss() {
    const cssFiles = await globby(['dist/**/*.css']);

    await Promise.all(
        cssFiles.map(async (file) => {
            const currPath = resolveCurrFilePath(file);
            const destPath = resolveDestFilePath(file);

            await checkOrCreateDir(path.dirname(destPath));
            await copyFile(currPath, destPath);
        }),
    );
}

function resolveCoreComponentsPaths(content, currPath) {
    const requireRegExp = new RegExp(
        /(\b(?:require\(|import |from )['"])@alfalab\/core-components-(.*?)(['"])/,
    );

    let matches;
    while ((matches = requireRegExp.exec(content))) {
        const componentName = matches[2];

        const bundleDir = path.dirname(currPath);
        const componentRelativePath = path.relative(bundleDir, componentName);
        content = content.replace(requireRegExp, `$1${componentRelativePath}$3`);
    }

    return content;
}

async function copyJs() {
    const jsFiles = await globby(['dist/**/*.js']);

    return await Promise.all(
        jsFiles.map(async (file) => {
            const currPath = resolveCurrFilePath(file);
            const destPath = resolveDestFilePath(file);

            await checkOrCreateDir(path.dirname(destPath));
            let content = await readFile(currPath, 'utf-8');
            content = resolveCoreComponentsPaths(content, currPath);

            await writeFile(destPath, content);
        }),
    );
}

async function buildRoot() {
    return Promise.all([copyCss(), copyJs()]);
}

module.exports = { buildRoot };
