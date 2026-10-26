const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');
const { verifyTagGroup } = require('./verify-tag-group.cjs');

const repo = path.resolve(__dirname, '../..');
const configuredTemplates = JSON.parse(
    fs.readFileSync(path.join(repo, 'figma.web-core.config.json'), 'utf8'),
).codeConnect.include;

for (const template of configuredTemplates) {
    const source = fs.readFileSync(path.join(repo, template), 'utf8');

    for (const match of source.matchAll(/\.getBoolean\(\s*['"]([^'"\n]*)['"]/g)) {
        if (match[1].includes('#') || match[1] !== match[1].trim()) {
            throw new Error(
                `${template}: getBoolean требует display name без #id и краевых пробелов`,
            );
        }
    }
}

const directory = path.join(__dirname, 'cases');
const cases = fs
    .readdirSync(directory)
    .filter((p) => p.endsWith('.json'))
    .flatMap((p) => {
        const data = JSON.parse(fs.readFileSync(path.join(directory, p), 'utf8'));

        return data.cases;
    });
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'web-core-code-connect-'));
const runtime = createRuntime(repo, { missingTemplateMode: 'comment' });
const result = runtime.runCases(cases, output);

if (result.failures.length) {
    console.error(JSON.stringify({ checks: cases.length, failures: result.failures }, null, 2));
    process.exitCode = 1;
} else {
    const { diagnostics, ts } = checkApi(repo, result.generated);

    if (diagnostics.length) {
        console.error(
            ts.formatDiagnosticsWithColorAndContext(diagnostics, {
                getCanonicalFileName: (p) => p,
                getCurrentDirectory: () => repo,
                getNewLine: () => '\n',
            }),
        );
        process.exitCode = 1;
    } else {
        console.log(
            JSON.stringify({
                checks: cases.length,
                renderedSnippets: result.generated.length,
                apiTypes: 'passed',
                tagGroupSelectionChecks: verifyTagGroup(),
                output,
            }),
        );
    }
}
