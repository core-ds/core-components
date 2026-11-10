const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(repo, p), 'utf8'));
const registry = read('docs/code-connect-web-core-libraries.json');
const config = read('figma.web-core-libraries.config.json');
const files = config.codeConnect.include;
const ready = registry.components.filter((r) => r.status === 'prepared');
const allowed = new Set(registry.figmaFiles.map((r) => r.fileKey));

assert.equal(allowed.size, 8);
assert.equal(files.length, registry.templateCount);
assert.equal(new Set(files).size, files.length);
assert.deepEqual([...files].sort(), ready.map((r) => r.file).sort());
const original = read('figma.web-core.config.json').codeConnect.include;

assert(
    files.every((f) => !original.includes(f)),
    'Новый конфиг пересекается с прежними148',
);
const ids = new Set();
// Load the same TypeScript installation used by the component repository.
// eslint-disable-next-line import/no-dynamic-require
const ts = require(path.join(repo, 'node_modules/typescript'));

for (const row of ready) {
    assert(allowed.has(row.fileKey));
    assert.equal(row.status, 'prepared');
    const source = fs.readFileSync(path.join(repo, row.file), 'utf8');

    assert(row.file.endsWith('.figma.ts'));
    assert(!source.includes('figma.connect('));
    assert(source.includes('figma.code'));
    const url = /^\/\/ url=(\S+)/m.exec(source)?.[1];
    const parsed = new URL(url);

    assert.equal(parsed.pathname.split('/')[2], row.fileKey);
    assert.equal(parsed.searchParams.get('node-id'), row.nodeId.replace(':', '-'));
    const id = /\bid:\s*['"]([^'"]+)['"]/.exec(source)?.[1];

    assert(id, `Нет template id: ${row.file}`);
    assert(!ids.has(id), `Повтор template id: ${id}`);
    ids.add(id);
    for (const match of source.matchAll(
        /\.get(?:Boolean|String|InstanceSwap)\(\s*['"]([^'"\n]*)['"]/g,
    ))
        assert(
            match[1] === match[1].trim() && !match[1].includes('#'),
            `Не каноническое имя свойства ${row.file}:${match[1]}`,
        );
    const props = Object.fromEntries(
        Object.entries(row.figmaProperties || {}).map(([k, v]) => [k.split('#')[0].trim(), v]),
    );
    const ast = ts.createSourceFile(row.file, source, ts.ScriptTarget.Latest, true);

    const walk = (node) => {
        if (
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression) &&
            node.expression.expression.getText(ast) === 'instance' &&
            node.arguments.length &&
            ts.isStringLiteral(node.arguments[0])
        ) {
            const method = node.expression.name.text;
            const name = node.arguments[0].text;
            const definition = props[method === 'getSlot' ? name.split('#')[0].trim() : name];

            if (
                ['getEnum', 'getBoolean', 'getString', 'getInstanceSwap', 'getSlot'].includes(
                    method,
                )
            ) {
                assert(definition, `${row.file}: у root отсутствует ${name}`);
                const type = {
                    getEnum: 'VARIANT',
                    getBoolean: 'BOOLEAN',
                    getString: 'TEXT',
                    getInstanceSwap: 'INSTANCE_SWAP',
                    getSlot: 'SLOT',
                }[method];

                assert.equal(definition.type, type, `${row.file}: неверный getter ${name}`);
                if (method === 'getEnum' && ts.isObjectLiteralExpression(node.arguments[1])) {
                    const keys = node.arguments[1].properties.map((p) =>
                        p.name &&
                        (ts.isStringLiteral(p.name) ||
                            ts.isIdentifier(p.name) ||
                            ts.isNumericLiteral(p.name))
                            ? p.name.text
                            : null,
                    );

                    assert.deepEqual(
                        keys.sort(),
                        [...definition.variantOptions].sort(),
                        `${row.file}: неполное enum ${name}`,
                    );
                }
            }
        }
        ts.forEachChild(node, walk);
    };

    walk(ast);
}
const { cases } = read('tools/code-connect/cases-libraries.json');

assert.deepEqual([...new Set(cases.map((t) => t.template))].sort(), [...files].sort());
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'web-core-libraries-'));
const runtime = createRuntime(repo, { missingTemplateMode: 'comment' });
const result = runtime.runCases(cases, output);

if (result.failures.length) {
    console.error(JSON.stringify({ checks: cases.length, failures: result.failures }, null, 2));
    process.exitCode = 1;
} else {
    const { diagnostics, ts: apiTs } = checkApi(repo, result.generated);

    if (diagnostics.length) {
        console.error(
            apiTs.formatDiagnosticsWithColorAndContext(diagnostics, {
                getCanonicalFileName: (p) => p,
                getCurrentDirectory: () => repo,
                getNewLine: () => '\n',
            }),
        );
        process.exitCode = 1;
    } else
        console.log(
            JSON.stringify({
                templates: files.length,
                roots: registry.components.length,
                checks: cases.length,
                renderedSnippets: result.generated.length,
                apiTypes: 'passed',
                output,
            }),
        );
}
