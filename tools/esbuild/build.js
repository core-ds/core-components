const { buildJs } = require('./build-js');
const { writeTranspiledFiles, cloneOutputFiles } = require('./utils');
const { buildCss } = require('./build-css');
const { buildRoot } = require('./build-root');

function buildPackages() {
    return Promise.all([
        // Build es5 with commonJs
        buildJs({ format: 'cjs', outDir: 'dist', target: 'es5' })
            .then((outputFiles) =>
                buildCss(outputFiles, { outDir: 'dist', preserveModules: false }),
            )
            .then(writeTranspiledFiles),

        // Build es5 with cssm
        buildJs({ format: 'cjs', outDir: 'dist/cssm', target: 'es5' })
            .then((outputFiles) =>
                buildCss(outputFiles, { outDir: 'dist/cssm', preserveModules: true }),
            )
            .then(writeTranspiledFiles),

        // Build es5 with esm
        buildJs({ format: 'esm', outDir: 'dist/esm', target: 'es5' })
            .then((outputFiles) =>
                buildCss(outputFiles, { outDir: 'dist/esm', preserveModules: false }),
            )
            .then(writeTranspiledFiles),

        // Build modern
        buildJs({ format: 'esm', outDir: 'dist/modern', target: 'es2020' })
            .then((outputFiles) =>
                buildCss(cloneOutputFiles(outputFiles), {
                    outDir: 'dist/modern',
                    preserveModules: false,
                }),
            )
            .then(writeTranspiledFiles),
    ]);
}

buildPackages()
    .then(buildRoot)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
