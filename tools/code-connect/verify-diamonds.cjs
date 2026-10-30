const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const template = 'packages/button/code-connect/Diamonds.figma.ts';
const config = JSON.parse(fs.readFileSync(path.join(repo, 'figma.config.json'), 'utf8'));
const { scripts } = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));

assert(config.codeConnect.include.includes(template), 'Diamonds отсутствует в общем наборе');
assert(config.codeConnect.include.every((file) => file.endsWith('.figma.ts')));
assert(scripts['figma:connect:publish'].includes('--config figma.config.json'));
assert.equal(scripts['figma:connect:unpublish'], undefined);
for (const legacy of ['Button.figma.tsx', 'Diamonds.figma.tsx']) {
    assert(!fs.existsSync(path.join(repo, 'packages/button/code-connect', legacy)));
}

const cases = [
    {
        template,
        fixture: { name: 'diamonds', properties: { Size: 's' } },
        expect: ['<Diamonds20Icon'],
        notExpect: ['Diamonds24Icon', 'Icon20Adapter'],
    },
    {
        template,
        fixture: { name: 'diamonds', properties: { Size: 'm' } },
        expect: ['<Diamonds24Icon'],
        notExpect: ['Diamonds20Icon', 'Icon20Adapter'],
    },
    {
        template,
        fixture: { name: 'diamonds', properties: { Size: 'xxl' } },
        throws: 'Diamonds: поддерживаются только',
    },
    {
        template,
        fixture: { name: 'diamonds', properties: { Size: 'unknown' } },
        throws: 'Diamonds: поддерживаются только',
    },
];
const parentTemplates = [
    'ButtonDesktop',
    'ButtonMobile',
    'ButtonInvertedDesktop',
    'ButtonInvertedMobile',
];
const controls = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/controls.json'), 'utf8'));
const base = controls.cases.find(
    (test) => test.template.endsWith('/ButtonMobile.figma.ts') && !test.throws,
).fixture;

for (const parent of parentTemplates) {
    for (const size of ['32', '40']) {
        const fixture = structuredClone(base);

        fixture.properties.Size = size;
        fixture.properties.LeftAddon = true;
        fixture.properties.RightAddon = true;
        fixture.children = ['LeftAddon', 'RightAddon'].map((name) => ({
            type: 'INSTANCE',
            name,
            properties: { Type: 'Icon-20' },
            swaps: {
                'Icon-20': {
                    type: 'INSTANCE',
                    name: 'diamonds',
                    template,
                    properties: { Size: 's' },
                },
            },
        }));
        cases.push({
            template: `packages/button/code-connect/${parent}.figma.ts`,
            fixture,
            expect: [`size={${size}}`, 'Diamonds20Icon', 'leftAddons=', 'rightAddons='],
            notExpect: ['Diamonds24Icon'],
        });
    }
}

const runtime = createRuntime(repo);
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'diamonds-code-connect-'));
const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, [], 'Не прошла композиция Button с настоящим шаблоном Diamonds');
for (const file of result.generated) {
    const source = fs.readFileSync(file, 'utf8');

    assert(!source.includes('@alfalab/core-components-shared/'));
    if (source.includes('<Button')) {
        assert.equal((source.match(/import \{ Icon20Adapter \}/g) || []).length, 1);
        assert.equal((source.match(/import \{ Diamonds20Icon \}/g) || []).length, 1);
        assert.equal((source.match(/<Icon20Adapter\b/g) || []).length, 2);
    }
}
const { diagnostics, ts } = checkApi(repo, result.generated);

if (diagnostics.length) {
    console.error(
        ts.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCanonicalFileName: (file) => file,
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
            parentTemplates: parentTemplates.length,
            actualDiamondsTemplate: true,
            declaredImportsOnly: true,
            apiTypes: 'passed',
            output,
        }),
    );
}
