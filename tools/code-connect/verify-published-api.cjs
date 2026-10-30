const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const repo = path.resolve(__dirname, '../..');
// Resolve the repository's compiler; dependency types come only from the consumer installation.
// eslint-disable-next-line import/no-dynamic-require
const ts = require(path.join(repo, 'node_modules/typescript'));
const args = process.argv.slice(2);
const consumer = args.shift();

assert(
    consumer && args.length,
    'Usage: node tools/code-connect/verify-published-api.cjs <consumer-directory> <examples-directory> [...]',
);
const installed = path.join(path.resolve(consumer), 'node_modules');
const profile = JSON.parse(
    fs.readFileSync(path.join(repo, 'docs/code-connect-screen-profile.json'), 'utf8'),
);
const versions = {};

for (const dependency of Object.values(profile.dependencies)) {
    const packageFile = path.join(installed, dependency.package, 'package.json');

    assert(
        fs.realpathSync(packageFile).startsWith(fs.realpathSync(installed) + path.sep),
        'Published package must resolve inside consumer node_modules',
    );
    const { version } = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

    assert.equal(version, dependency.version, `Unexpected consumer version: ${dependency.package}`);
    versions[dependency.package] = version;
}
const files = args.flatMap((directory) =>
    fs
        .readdirSync(directory)
        .filter((file) => /^example-\d+\.tsx$/.test(file))
        .map((file) => path.resolve(directory, file)),
);

assert(files.length, 'No generated examples found');
const paths = {
    '@alfalab/core-components/*': [path.join(installed, '@alfalab/core-components/*')],
    '@alfalab/icons-glyph-26/*': [path.join(installed, '@alfalab/icons-glyph-26/*')],
    '@alfalab/icons-glyph/*': [path.join(installed, '@alfalab/icons-glyph/*')],
    react: [path.join(installed, '@types/react/index.d.ts')],
    'react/*': [path.join(installed, '@types/react/*')],
    'react-dom': [path.join(installed, '@types/react-dom/index.d.ts')],
    'react-dom/*': [path.join(installed, '@types/react-dom/*')],
};
const options = {
    target: ts.ScriptTarget.ES2021,
    lib: ['lib.es2023.d.ts', 'lib.dom.d.ts'],
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    noEmit: true,
    baseUrl: path.resolve(consumer),
    typeRoots: [path.join(installed, '@types')],
    types: ['react', 'react-dom'],
    paths,
};

function diagnostics(inputs) {
    return ts.getPreEmitDiagnostics(ts.createProgram(inputs, options));
}
const actual = diagnostics(files);

if (actual.length) {
    console.error(
        ts.formatDiagnosticsWithColorAndContext(actual, {
            getCanonicalFileName: (file) => file,
            getCurrentDirectory: () => repo,
            getNewLine: () => '\n',
        }),
    );
    process.exitCode = 1;
} else {
    const candidate = files.find((file) => {
        const source = fs.readFileSync(file, 'utf8');

        return (
            /import \{ InformationCircle24Icon \}/.test(source) &&
            /<InformationCircle24Icon\b/.test(source)
        );
    });

    assert(candidate, 'The icon regression example is required for the negative control');
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'code-connect-published-negative-'));

    try {
        const broken = path.join(directory, 'missing-import.tsx');
        const source = fs
            .readFileSync(candidate, 'utf8')
            .replace(/^import \{ InformationCircle24Icon \}[^\n]*\n/m, '');

        fs.writeFileSync(broken, source);
        const negative = diagnostics([broken]);

        assert(
            negative.some(
                (item) =>
                    item.code === 2304 &&
                    ts
                        .flattenDiagnosticMessageText(item.messageText, ' ')
                        .includes('InformationCircle24Icon'),
            ),
            'Missing icon import must be detected',
        );
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
    console.log(
        JSON.stringify({
            examples: files.length,
            versions,
            apiTypes: 'passed-against-installed-published-packages',
            missingIconImportNegativeControl: 'detected',
            workspaceSourceAliases: false,
            visualEquivalenceChecked: false,
        }),
    );
}
