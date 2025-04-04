import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { env } from 'node:process';

if (isMainThread) {
    async function main() {
        const __filename = fileURLToPath(import.meta.url);

        await Promise.all(
            (env.BUILD_MODERN_ONLY === 'true'
                ? ['modern']
                : ['es5', 'cssm', 'moderncssm', 'esm', 'modern']
            ).map(
                (buildName) =>
                    new Promise((resolve, reject) => {
                        const worker = new Worker(__filename, { workerData: buildName });
                        worker.on('message', resolve);
                        worker.on('error', reject);
                        worker.on('exit', (code) => {
                            if (code === 0) {
                                return;
                            }
                            reject(new Error(`Worker stopped with exit code ${code}`));
                        });
                    }),
            ),
        );
    }

    main();
} else {
    const require = createRequire(import.meta.url);
    const exportCustomVariables = require('postcss-export-custom-variables');
    const path = require('node:path');
    const postcssImport = require('postcss-import');
    const postcss = require('postcss');
    const fs = require('node:fs');
    const fsPromises = require('node:fs/promises');
    const glob = require('glob');
    const ts = require('typescript');
    const assert = require('node:assert');

    function ensureDirectoryExist(filePath) {
        const dirname = path.dirname(filePath);

        if (fs.existsSync(dirname)) return;

        fs.mkdirSync(dirname, { recursive: true });
    }

    function createExporter(buildName) {
        return function exporter(variables, options) {
            const pathname = options.destination;
            const contents = Object.entries(variables)
                .map(([name, value]) => {
                    const transformedValue = JSON.stringify(value).replace(
                        /(^|{|,)"(.+?)":/g,
                        '$1$2:',
                    );

                    return ['es5', 'cssm', 'moderncssm'].includes(buildName)
                        ? `module.exports.${name} = ${transformedValue};`
                        : `export const ${name} = ${transformedValue};`;
                })
                .join('\n')
                .concat('\n');

            return fsPromises.writeFile(pathname, contents, { encoding: 'utf8' });
        };
    }

    /** формирует файлы деклараций d.ts */
    function execTsc(destJsPath) {
        return function () {
            console.log(`create d.ts => ${destJsPath}`);

            ts.createProgram([destJsPath], {
                allowJs: true,
                declaration: true,
                emitDeclarationOnly: true,
                typeRoots: [],
            }).emit();
        };
    }

    /** формирует путь для создания js модуля с css переменными (учитывая тип сборки) */
    function createJSPathDestination(buildName, srcFileName) {
        return path.join('dist', buildName === 'es5' ? '' : buildName, `${srcFileName}.js`);
    }

    /** собирает css переменные из vars/index.css в единый js модуль */
    function exportCssVarsAsJs(buildName) {
        const cssPath = path.resolve('src/index.css');
        const css = fs.readFileSync(cssPath, { encoding: 'utf8' });
        const destJsPath = createJSPathDestination(buildName, path.parse(cssPath).name);

        ensureDirectoryExist(destJsPath);

        return postcss()
            .use(postcssImport({}))
            .use(
                exportCustomVariables({
                    exporter: createExporter(buildName),
                    destination: destJsPath,
                }),
            )
            .process(css, { from: cssPath })
            .then(execTsc(destJsPath));
    }

    /** собирает js модуль для каждого css файла по отдельности */
    function buildPalettesCustomCSSProperties(buildName) {
        return Promise.all(
            glob.sync('src/@(colors|shadows)*.css').map((cssPath) => {
                const palette = path.parse(cssPath).name;
                const css = fs.readFileSync(cssPath, { encoding: 'utf8' });
                const destJsPath = createJSPathDestination(buildName, `${palette}.module`);

                ensureDirectoryExist(destJsPath);

                console.log(`build [ ${palette} => ${buildName} ]`);

                return postcss()
                    .use(
                        exportCustomVariables({
                            exporter: createExporter(buildName),
                            destination: destJsPath,
                        }),
                    )
                    .process(css, { from: cssPath })
                    .then(execTsc(destJsPath));
            }),
        );
    }

    async function workerMain() {
        const buildName = workerData;

        assert(typeof buildName === 'string');

        await Promise.all([
            exportCssVarsAsJs(buildName),
            buildPalettesCustomCSSProperties(buildName),
        ]);
        parentPort.postMessage(buildName);
    }

    workerMain();
}
