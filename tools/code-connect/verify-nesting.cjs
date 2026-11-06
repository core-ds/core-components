const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const manifest = require('./nesting-templates.json');

const repo = path.resolve(__dirname, '../..');
const directory = path.join(__dirname, 'cases');
const existing = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.json'))
    .flatMap((file) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')).cases);
const runtime = createRuntime(repo);
const probeImport = "import { Fragment as NestingProbe } from 'react';";
const marker = '<NestingProbe />';
const contextualCode =
    'function NestedContextExample({ nestedProps }: { nestedProps: { label: string } }) { return <span>{nestedProps.label}</span>; }';

function set(owner, name, value) {
    const target = owner;

    target.properties ||= {};
    const key =
        Object.keys(target.properties).find(
            (candidate) => candidate.split('#')[0].trim() === name,
        ) || name;

    target.properties[key] = value;
}
function child(owner, value) {
    const target = owner;

    target.children ||= [];
    const index = target.children.findIndex((node) => node.name === value.name);

    if (index < 0) target.children.push(value);
    else target.children[index] = value;
}
function instance(name, properties = {}) {
    return { type: 'INSTANCE', name, properties };
}
function baseFixture(template) {
    const component = path.basename(template, '.figma.ts');
    let source = existing.find((test) => test.template === template && !test.throws)?.fixture;

    if (!source && component === 'ButtonDesktop')
        source = existing.find(
            (test) => test.template.endsWith('/ButtonMobile.figma.ts') && !test.throws,
        ).fixture;
    if (!source && component === 'TagDesktop')
        source = existing.find(
            (test) => test.template.endsWith('/TagFilledMobile.figma.ts') && !test.throws,
        ).fixture;
    if (!source && component === 'IconButtonIcon')
        [source] = existing.find(
            (test) => test.template.endsWith('/IconButtonDesktop.figma.ts') && !test.throws,
        ).fixture.children;
    if (!source && component === 'Amount')
        source = {
            ...instance('Amount', { Minor: false, Currency: false, Addon: true }),
            children: [
                {
                    ...instance('Major'),
                    children: [{ type: 'TEXT', name: 'Major', textContent: '123' }],
                },
            ],
        };
    if (!source && component === 'IconView')
        source = {
            ...instance('IconView', {
                Size: '32',
                Shape: true,
                Border: false,
                BgColor: false,
                BgImg: false,
                Text: false,
                Content: true,
                TopAddon: false,
                BottomAddon: false,
                Indicator: false,
            }),
            children: [instance('Shape', { Form: 'Circle' })],
        };
    assert(source, `Missing base fixture: ${template}`);

    return structuredClone(source);
}
function fixture(template) {
    const component = path.basename(template, '.figma.ts');
    const family = template.split('/')[1];
    const owner = baseFixture(template);

    delete owner.template;
    delete owner.code;
    const probe = { ...instance('NestingProbe'), code: marker, imports: [probeImport] };
    const swaps = Object.fromEntries(
        [
            'Icon-16',
            'icon-16',
            'Icon-20',
            'icon-20',
            'Icon-24',
            'Icon 24',
            'Icon 16',
            'Instance',
        ].map((name) => [name, probe]),
    );

    if (['button', 'tag', 'filter-tag'].includes(family)) {
        set(owner, 'LeftAddon', true);
        child(owner, { ...instance('LeftAddon', { Type: 'Icon-24' }), swaps });
    } else if (
        [
            'input',
            'amount-input',
            'number-input',
            'slider-input',
            'select',
            'select-with-tags',
            'universal-date-input',
        ].includes(family)
    ) {
        const sourceText = fs.readFileSync(path.join(repo, template), 'utf8');

        set(owner, 'Size', '56');
        set(owner, 'LeftAddons', true);
        child(owner, {
            ...instance('LeftAddon1', {
                Type: sourceText.includes(
                    'function addonType(name: string, enabled: boolean): string',
                )
                    ? 'IconPrimary'
                    : 'Icon-24',
            }),
            swaps,
        });
    } else if (family === 'action-button') {
        owner.swaps = { 'Icon 24': probe };
    } else if (family === 'amount') {
        set(owner, 'Addon', true);
        child(owner, { ...instance('Addon'), children: [probe] });
    } else if (family === 'custom-button') {
        owner.children[0] = { ...probe, path: ['Content'] };
    } else if (family === 'icon-button') {
        if (component === 'IconButtonIcon') {
            set(owner, 'Type', 'Icon 24');
            owner.swaps = { 'Icon-24': probe };
        } else child(owner, { ...probe, name: 'Icon' });
    } else if (family === 'icon-view') {
        set(owner, 'Content', true);
        child(owner, {
            ...instance('Content', { Type: 'Icon', Size: '24' }),
            swaps: { 'Icon 24': probe },
        });
    } else if (family === 'link') {
        set(owner, 'Size', 'M (16-24)');
        set(owner, 'Left Addon', true);
        owner.swaps = { 'Left icon 24': probe };
    } else if (family === 'list') {
        set(owner.children[0], 'Type', 'SwapMe');
        owner.children[0].children = [probe];
    } else if (family === 'product-cover') {
        set(owner, 'Size', '48x76');
        set(owner, 'Icon', true);
        owner.swaps = { 'icon 24': probe };
    } else if (family === 'segmented-control') {
        const segment = owner.children.find((node) => node.name.startsWith('Segment_'));

        set(segment, 'LeftAddon', true);
        child(segment, {
            ...instance('LeftAddon', { Type: 'Icon_20' }),
            swaps: { Instance: probe },
        });
    } else if (family === 'status') {
        set(owner, 'Size', '24');
        set(owner, 'LeftAddon', 'True');
        child(owner, { ...instance('Addon', { Type: 'Icon 16' }), swaps: { 'Icon 16': probe } });
    } else assert.fail(`Missing composition fixture factory: ${family}`);
    // Some wrappers copy the leaf object; find the installed probe rather than relying on identity.
    function installed(value) {
        if (!value || typeof value !== 'object') return undefined;
        if (
            value.code === marker &&
            value.name ===
                (family === 'icon-button' && component !== 'IconButtonIcon'
                    ? 'Icon'
                    : 'NestingProbe')
        )
            return value;
        for (const nested of Object.values(value)) {
            const found = installed(nested);

            if (found) return found;
        }

        return undefined;
    }
    const target = installed(owner);

    assert(target, `Missing installed probe: ${template}`);

    return { owner, target };
}

function nestingCalls(ast, helper, template) {
    let calls = 0;

    function walk(node, inHelper = false) {
        const inside = inHelper || node === helper;

        if (ts.isCallExpression(node)) {
            if (
                ts.isPropertyAccessExpression(node.expression) &&
                node.expression.name.text === 'executeTemplate'
            )
                assert(inside, `${template}: child template bypasses nesting guard`);
            if (ts.isIdentifier(node.expression) && node.expression.text === 'nestedTemplate')
                calls += 1;
        }
        ts.forEachChild(node, (next) => walk(next, inside));
    }
    walk(ast);

    return calls;
}

const normalCases = [];
const contextCases = [];
let fallbackCount = 0;
let helperSource;
const printer = ts.createPrinter({ removeComments: true });

for (const entry of manifest.templates) {
    const source = fs.readFileSync(path.join(repo, entry.template), 'utf8');
    const ast = ts.createSourceFile(entry.template, source, ts.ScriptTarget.Latest, true);
    const helper = ast.statements.find(
        (node) => ts.isFunctionDeclaration(node) && node.name?.text === 'nestedTemplate',
    );

    assert(helper, `${entry.template}: missing shared nesting contract`);
    const printed = printer.printNode(ts.EmitHint.Unspecified, helper, ast);

    if (helperSource)
        assert.equal(printed, helperSource, `${entry.template}: nesting contract drifted`);
    else helperSource = printed;
    const calls = nestingCalls(ast, helper, entry.template);

    assert.equal(
        calls,
        entry.nestedCalls,
        `${entry.template}: untested nesting site added or removed`,
    );
    const normal = fixture(entry.template);
    const original = runtime.flatten(runtime.evaluate(entry.template, normal.owner).example);
    let normalReads = 0;

    Object.defineProperty(normal.target, 'metadata', {
        get() {
            normalReads += 1;

            return { nestable: true };
        },
    });
    const normalResult = runtime.evaluate(entry.template, normal.owner);

    assert(normalReads > 0, `${entry.template}: ordinary child was not executed`);
    assert.equal(
        runtime.flatten(normalResult.example),
        original,
        `${entry.template}: ordinary child changed`,
    );
    assert(original.includes('NestingProbe'), `${entry.template}: ordinary child was lost`);
    normalCases.push({
        name: `normal-${path.basename(entry.template)}`,
        template: entry.template,
        fixture: normal.owner,
        expect: ['NestingProbe'],
        notExpect: ['NestedContextExample'],
    });
    const context = fixture(entry.template);

    context.target.code = contextualCode;
    let contextReads = 0;

    Object.defineProperty(context.target, 'metadata', {
        get() {
            contextReads += 1;

            return { nestable: false };
        },
    });
    let result;
    let rejection;

    try {
        result = runtime.evaluate(entry.template, context.owner);
    } catch (error) {
        rejection = error;
    }
    assert(contextReads > 0, `${entry.template}: contextual child was not executed`);
    if (rejection) {
        assert.match(
            rejection.message,
            /контекст|nestable|встраив/i,
            `${entry.template}: unrelated rejection`,
        );
        assert(
            !entry.contextFallback,
            `${entry.template}: existing typed context should handle this child`,
        );
        contextCases.push({
            template: entry.template,
            fixture: context.owner,
            throws: 'контекст|nestable|встраив',
        });
    } else {
        assert(
            entry.contextFallback,
            `${entry.template}: non-nestable child was silently accepted`,
        );
        assert.equal(result.metadata?.nestable, false, `${entry.template}: missing parent context`);
        const body = runtime.flatten(result.example);

        assert(
            !body.includes('NestedContextExample'),
            `${entry.template}: contextual function leaked into JSX`,
        );
        assert(
            body.includes(entry.contextFallback === 'addon' ? 'addonSlots' : 'marker'),
            `${entry.template}: missing typed context`,
        );
        const syntax =
            ts.transpileModule(body, {
                fileName: 'example.tsx',
                reportDiagnostics: true,
                compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            }).diagnostics || [];

        assert.equal(syntax.length, 0, `${entry.template}: invalid JSX after context substitution`);
        contextCases.push({
            template: entry.template,
            fixture: context.owner,
            notExpect: ['NestedContextExample'],
        });
        fallbackCount += 1;
    }
}
// Exercise the reported bug with a real contextual template, not only synthetic metadata.
const realParent = structuredClone(
    existing.find((test) => test.template.endsWith('/CustomButton.figma.ts') && !test.throws),
);
const realChild = structuredClone(
    existing.find((test) => test.template.endsWith('/Text.figma.ts') && !test.throws),
);

assert(realParent && realChild);
realParent.fixture.children[0] = {
    ...realChild.fixture,
    path: ['Content'],
    template: realChild.template,
};
realParent.throws = 'контекст|nestable|встраив';
delete realParent.expect;
contextCases.push(realParent);
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'code-connect-nesting-'));
const normalOutput = path.join(output, 'normal');
const contextOutput = path.join(output, 'context');

fs.mkdirSync(normalOutput);
fs.mkdirSync(contextOutput);
const normals = runtime.runCases(normalCases, normalOutput);
const contexts = runtime.runCases(contextCases, contextOutput);

assert.deepEqual(normals.failures, []);
assert.deepEqual(contexts.failures, []);
for (const file of normals.generated)
    assert(fs.readFileSync(file, 'utf8').includes(probeImport), `${file}: child imports were lost`);
const checked = checkApi(repo, [...normals.generated, ...contexts.generated]);

if (checked.diagnostics.length) {
    console.error(
        checked.ts.formatDiagnosticsWithColorAndContext(checked.diagnostics, {
            getCanonicalFileName: (value) => value,
            getCurrentDirectory: () => repo,
            getNewLine: () => '\n',
        }),
    );
    process.exitCode = 1;
} else
    console.log(
        JSON.stringify({
            templates: manifest.templates.length,
            nestingSites: manifest.templates.reduce((total, entry) => total + entry.nestedCalls, 0),
            ordinaryChildren: normalCases.length,
            contextualChildren: contextCases.length,
            typedContextFallbacks: fallbackCount,
            realTemplateComposition: 'passed',
            renderedSnippets: normals.generated.length + contexts.generated.length,
            apiTypes: 'passed',
            output,
        }),
    );
