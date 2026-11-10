const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'select-anatomy-code-connect-'));
const runtime = createRuntime(repo, { directChildImportsOnly: true });
const templates = [
    ['SelectDesktop', 'SelectDesktop', 56, '0'],
    ['SelectDesktopInverted', 'SelectDesktop', 56, '73'],
    ['SelectMobile', 'SelectMobile', 48, '146'],
    ['SelectMobileInverted', 'SelectMobile', 48, '219'],
];
const text = (name, textContent, visible = true) => ({
    type: 'INSTANCE',
    name,
    visible,
    children: [{ type: 'TEXT', name, textContent, visible }],
});
const bool = (value) => (value ? 'True' : 'False');

/*
 * The live screen's empty inner Select has Label, not Placeholder:
 * Field -> Content -> Label (instance) -> Label (text).
 * Match the published anatomy matrix instead of always providing Value and Placeholder.
 */
function fixture({ outer, filled, active, placeholder, labelVisible, size, rightAddonsSuffix }) {
    const label = text('Label', labelVisible ? 'Подпись поля' : 'Скрытая подпись', labelVisible);
    const content = [];

    if (!outer) content.push(label);
    if (filled) content.push(text('Value', 'Выбранный текст из макета'));
    else if (outer && placeholder) content.push(text('Placeholder', 'Выберите элемент'));
    content.push({
        type: 'FRAME',
        name: 'RightAddons',
        children: [
            {
                type: 'INSTANCE',
                name: active ? 'Arrow_Up' : 'Arrow_Down',
                children: [{ type: 'INSTANCE', name: 'InternalContent' }],
            },
        ],
    });

    return {
        type: 'INSTANCE',
        name: '[D/M] Select / actual anatomy',
        properties: {
            Size: String(size),
            FilledState: bool(filled),
            ActiveState: bool(active),
            '↳ Placeholder': bool(placeholder),
            DisabledState: 'False',
            ErrorState: 'False',
            OuterLabel: bool(outer),
            ' ↳ Label#29:470': labelVisible,
            [`RightAddons#45699:${rightAddonsSuffix}`]: true,
            'LeftAddons#29:473': false,
            'Hint#29:476': false,
            ' ↳ RightAddon2#29:471': false,
            ' ↳ LeftAddon2#29:474': false,
            [`ErrorMessage#62:${size === 48 ? '97' : '0'}`]: false,
        },
        children: [
            ...(outer ? [label] : []),
            {
                type: 'FRAME',
                name: 'Field',
                children: [{ type: 'FRAME', name: 'Content', children: content }],
            },
        ],
    };
}

const cases = [];
const metadataCases = [];

for (const [name, component, size, rightAddonsSuffix] of templates) {
    for (const outer of [false, true]) {
        for (const filled of [false, true]) {
            for (const active of [false, true]) {
                // The inactive Placeholder=False variant is not published; do not use it as a fix.
                for (const placeholder of active ? [false, true] : [true]) {
                    for (const labelVisible of [false, true]) {
                        const data = fixture({
                            outer,
                            filled,
                            active,
                            placeholder,
                            labelVisible,
                            size,
                            rightAddonsSuffix,
                        });
                        const hasPlaceholder = !filled && placeholder && (outer || labelVisible);
                        const expectedPlaceholder = outer ? 'Выберите элемент' : 'Подпись поля';
                        const test = {
                            template: `packages/select/code-connect/${name}.figma.ts`,
                            fixture: data,
                            expect: [
                                `<${component} options={options}`,
                                `selected={${filled ? 'selected' : 'null'}}`,
                                `size={${size}} labelView="${outer ? 'outer' : 'inner'}"`,
                                `colors: "${name.includes('Inverted') ? 'inverted' : 'default'}"`,
                                ...(labelVisible ? ['label="Подпись поля"'] : []),
                                ...(hasPlaceholder ? [`placeholder="${expectedPlaceholder}"`] : []),
                                ...(filled ? [`NonNullable<${component}Props['selected']>`] : []),
                            ],
                            notExpect: [
                                'Скрытая подпись',
                                'Выбранный текст из макета',
                                ...(labelVisible ? [] : ['label="']),
                                ...(hasPlaceholder ? [] : ['placeholder="']),
                                ...(filled ? [] : [`NonNullable<${component}Props['selected']>`]),
                            ],
                        };

                        cases.push(test);
                        metadataCases.push(test);
                    }
                }
            }
        }
    }
}

for (const [name, , size, rightAddonsSuffix] of templates) {
    const data = fixture({
        outer: false,
        filled: false,
        active: false,
        placeholder: true,
        labelVisible: true,
        size,
        rightAddonsSuffix,
    });

    data.properties.OuterLabel = 'unknown';
    cases.push({
        template: `packages/select/code-connect/${name}.figma.ts`,
        fixture: data,
        throws: 'Неизвестное значение OuterLabel',
    });
}

const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, [], 'Не прошла матрица реальной анатомии Select');
for (const test of metadataCases) {
    const value = runtime.evaluate(test.template, test.fixture);

    assert.equal(value.metadata?.nestable, false, 'Select должен сохранять явный контекст');
    assert(value.imports.some((declaration) => declaration.includes('/select/')));
}

let negativeControls = 0;

for (const [name, , size, rightAddonsSuffix] of templates) {
    const file = `packages/select/code-connect/${name}.figma.ts`;
    const source = fs.readFileSync(path.join(repo, file), 'utf8');
    const current =
        /const placeholder =\s*\n\s*!filled && flag\(instance, '↳ Placeholder'\)[\s\S]*?\n\s*: undefined;/;

    assert(current.test(source), 'Не найдено выражение placeholder для отрицательной проверки');
    const old = source.replace(
        current,
        "const placeholder = !filled && flag(instance, '↳ Placeholder') ? text('Placeholder') : undefined;",
    );
    const temporary = path.join(output, `legacy-${name}.figma.ts`);

    fs.writeFileSync(temporary, old);
    assert.throws(
        () =>
            runtime.evaluate(
                path.relative(repo, temporary),
                fixture({
                    outer: false,
                    filled: false,
                    active: false,
                    placeholder: true,
                    labelVisible: true,
                    size,
                    rightAddonsSuffix,
                }),
            ),
        /Не найден блок Placeholder/,
        'Старая логика должна воспроизводить отказ на настоящем пустом inner-поле',
    );
    negativeControls += 1;
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
            templates: templates.length,
            checks: cases.length,
            renderedSnippets: result.generated.length,
            actualAnatomy: true,
            visibilityChecks: metadataCases.length,
            contextualExamplesPreserved: metadataCases.length,
            previousLogicNegativeControls: negativeControls,
            inactivePlaceholderFalseUsed: false,
            apiTypes: 'passed',
            output,
        }),
    );
}
