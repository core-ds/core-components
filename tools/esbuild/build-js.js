const swc = require('@swc/core');
const esbuild = require('esbuild');
const { getSwcConfig, getEsbuildConfig } = require('./utils');

function handleEsBuildResult(esbuildResult) {
    if (esbuildResult.errors.length) {
        esbuildResult.errors.forEach((e) => console.error(e.pluginName, ' - ', e.text, '\n'));
        process.exit(1);
    }

    if (esbuildResult.warnings.length) {
        esbuildResult.errors.forEach((e) => console.warn(e.pluginName, ' - ', e.text, '\n'));
    }

    return esbuildResult.outputFiles;
}

function buildJs(config) {
    return esbuild
        .build(getEsbuildConfig(config))
        .then(handleEsBuildResult)
        .then((files) => (config.target === 'es5' ? transpileToES5(files, config) : files));
}

function transpileToES5(files, config) {
    return Promise.all(
        files.map(async (file) => ({
            ...file,
            text: await swc.transform(file.text, getSwcConfig(config)).then((ret) => ret.code),
        })),
    );
}

exports.buildJs = buildJs;
