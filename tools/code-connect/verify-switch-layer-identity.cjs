const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const template = 'packages/switch/code-connect/SwitchLabel24Inverted.figma.ts';
const childTemplate = 'packages/switch/code-connect/Switch24Inverted.figma.ts';
const childId = 'core-switch-switch24inverted';
const runtime = createRuntime(repo);
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'switch-layer-identity-'));
const fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/controls.json'), 'utf8'));
const base = fixtures.cases.find(
    (test) => test.template === template && test.fixture.properties.Hint === 'False',
).fixture;
const cases = [];
const names = ['Switch_24_Inverted', 'Switch_Inverted', 'Переименованный контрол'];
const imports = "import { Switch } from '@alfalab/core-components/switch';";

function fixture(name, hint, checked, disabled) {
    const value = structuredClone(base);

    value.properties.Hint = hint ? 'True' : 'False';
    value.children = [
        {
            type: 'INSTANCE',
            name,
            codeConnectId: childId,
            template: childTemplate,
            properties: {
                SelectedState: checked ? 'True' : 'False',
                DisabledState: disabled ? 'True' : 'False',
            },
        },
    ];

    return value;
}
function checkValue(test) {
    const child = test.fixture.children.find((node) => node.codeConnectId === childId);
    const childValue = runtime.evaluate(childTemplate, child);
    const value = runtime.evaluate(template, test.fixture);

    assert.equal(childValue.id, childId);
    assert.equal(
        childValue.metadata.nestable,
        true,
        'Подключённый контрол должен быть доступен родителю',
    );
    assert.equal(value.metadata.props.checked, test.checked);
    assert.equal(value.metadata.props.disabled, test.disabled);
    assert(value.imports.includes(imports));
    const body = runtime.flatten(value.example);

    assert.equal(/\bchecked\b/.test(body), test.checked);
    assert.equal(/\bdisabled\b/.test(body), test.disabled);
    assert.equal(body.includes('hint='), test.hint);
    assert(body.includes('colors="inverted"'));
}
for (const name of names)
    for (const hint of [false, true])
        for (const checked of [false, true])
            for (const disabled of [false, true]) {
                cases.push({
                    template,
                    fixture: fixture(name, hint, checked, disabled),
                    hint,
                    checked,
                    disabled,
                    expect: ['<Switch', 'colors="inverted"', 'label="Label"'],
                });
            }
const decoy = fixture('Switch_24_Inverted', true, true, true);

decoy.children.unshift({
    type: 'INSTANCE',
    name: 'Switch_Inverted',
    codeConnectId: 'core-switch-switch24',
    template: 'packages/switch/code-connect/Switch24.figma.ts',
    properties: { SelectedState: 'False', DisabledState: 'False' },
});
cases.push({
    template,
    fixture: decoy,
    hint: true,
    checked: true,
    disabled: true,
    expect: ['checked', 'disabled', 'hint='],
});
for (const test of cases) checkValue(test);
const foreign = fixture('Switch_Inverted', false, true, false);

foreign.children[0].codeConnectId = 'core-switch-switch24';
foreign.children[0].template = 'packages/switch/code-connect/Switch24.figma.ts';
const noIdentity = fixture('Switch_Inverted', false, true, false);

delete noIdentity.children[0].codeConnectId;
const absent = fixture('Switch_Inverted', false, true, false);

absent.children = [];
for (const value of [foreign, noIdentity, absent])
    cases.push({ template, fixture: value, throws: 'Не найден подключённый Switch_24_Inverted' });
for (const props of [
    {},
    { checked: 'True', disabled: false },
    { checked: true, disabled: 'False' },
]) {
    const invalid = fixture('Switch_Inverted', false, true, false);

    invalid.children = [
        {
            type: 'INSTANCE',
            name: 'Switch_Inverted',
            codeConnectId: childId,
            code: '<Switch />',
            metadata: { props },
        },
    ];
    cases.push({
        template,
        fixture: invalid,
        throws: 'Требуется Code Connect вложенного контрола',
    });
}
const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, [], 'Не прошёл выбор реального Switch по Code Connect identity');
for (const file of result.generated) {
    const source = fs.readFileSync(file, 'utf8');

    assert.equal(
        source.split(imports).length - 1,
        1,
        'Реальный импорт Switch должен присутствовать ровно один раз',
    );
}
// Одна замена поиска на прежний lookup по имени воспроизводит обнаруженный отказ.
const source = fs.readFileSync(path.join(repo, template), 'utf8');
const oldLookup = source.replace(
    "instance.findConnectedInstance('core-switch-switch24inverted')",
    "instance.findInstance('Switch_Inverted')",
);

assert.notEqual(oldLookup, source);
const oldTemplate = path.join(output, 'name-only.figma.ts');

fs.writeFileSync(oldTemplate, oldLookup);
assert.throws(
    () =>
        createRuntime(repo).evaluate(
            path.relative(repo, oldTemplate),
            fixture('Switch_24_Inverted', false, true, false),
        ),
    /Не найден подключённый Switch_24_Inverted/,
);
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
            actualLayerName: 'Switch_24_Inverted',
            layerNames: names.length,
            matchingIdentity: childId,
            foreignIdentityGuard: 'passed',
            missingIdentityGuard: 'passed',
            missingChildGuard: 'passed',
            metadataGuards: 3,
            decoySelection: 'passed',
            nameLookupNegativeControl: 'detected',
            apiTypes: 'passed',
            output,
        }),
    );
}
