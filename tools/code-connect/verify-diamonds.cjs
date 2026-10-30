const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const template = 'packages/button/code-connect/Diamonds.figma.ts';
const iconTemplate = 'packages/icon-button/code-connect/IconButtonIcon.figma.ts';
const arrowTemplate = 'packages/icon-button/code-connect/icons/ArrowLeft.figma.ts';
const config = JSON.parse(fs.readFileSync(path.join(repo, 'figma.config.json'), 'utf8'));
const { scripts } = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));

assert(config.codeConnect.include.includes(template), 'Diamonds отсутствует в общем наборе');
assert(
    config.codeConnect.include.includes(arrowTemplate),
    'Реальная SVG20-регрессия требует ArrowLeft',
);
assert(config.codeConnect.include.every((file) => file.endsWith('.figma.ts')));
assert(scripts['figma:connect:publish'].includes('--config figma.config.json'));
assert.equal(scripts['figma:connect:unpublish'], undefined);
for (const legacy of ['Button.figma.tsx', 'Diamonds.figma.tsx']) {
    assert(!fs.existsSync(path.join(repo, 'packages/button/code-connect', legacy)));
}
const currentSource = fs.readFileSync(path.join(repo, template), 'utf8');

assert(
    currentSource.includes(
        'https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888',
    ),
);
const runtime = createRuntime(repo, { directChildImportsOnly: true });
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'diamonds-code-connect-'));
const legacyVariants = [
    { variant: 's', size: 16, component: 'DiamondsSIcon' },
    { variant: 'm', size: 24, component: 'DiamondsMIcon' },
    { variant: 'xxl', size: 48, component: 'DiamondsXxlIcon' },
];

function diamonds(size) {
    return { type: 'INSTANCE', name: 'diamonds', template, properties: { Size: size } };
}
function declaration(component, packageName = '@alfalab/icons-glyph') {
    return `import { ${component} } from '${packageName}/${component}';`;
}
function checkLegacyIdentity(value, expected) {
    assert.equal(value.id, 'core-diamonds-icon');
    assert.equal(value.metadata.nestable, true);
    assert.equal(
        value.metadata.props.svgSize,
        expected.size,
        'Подменён размер выбранного Diamonds',
    );
    assert.equal(value.imports.length, 1);
    assert.equal(
        value.imports[0],
        declaration(expected.component),
        'Подменён экспорт выбранного Diamonds',
    );
    assert.equal(value.metadata.props.imports[0], declaration(expected.component));
    assert.equal(runtime.flatten(value.example), `<${expected.component} />`);
}
const cases = legacyVariants.map((expected) => {
    const value = runtime.evaluate(template, diamonds(expected.variant));

    checkLegacyIdentity(value, expected);
    assert(
        fs.existsSync(
            path.join(repo, `node_modules/@alfalab/icons-glyph/${expected.component}.js`),
        ),
    );
    assert(
        fs.existsSync(
            path.join(repo, `node_modules/@alfalab/icons-glyph/${expected.component}.d.ts`),
        ),
    );

    return {
        template,
        fixture: diamonds(expected.variant),
        expect: [`<${expected.component} />`],
        notExpect: ['Diamonds20Icon', 'Diamonds24Icon', 'Icon20Adapter'],
    };
});

cases.push({ template, fixture: diamonds('unknown'), throws: 'Diamonds: неизвестный Size' });
const arrow = {
    type: 'INSTANCE',
    name: 'arrow-left',
    template: arrowTemplate,
    properties: { Size: '20', Style: 'Default', Color: 'False' },
};
const arrowImport = declaration('ArrowLeft20Icon', '@alfalab/icons-glyph-26');
const arrowValue = runtime.evaluate(arrowTemplate, arrow);

assert.equal(arrowValue.metadata.props.svgSize, 20);
assert(arrowValue.imports.includes(arrowImport));
cases.push({
    template: arrowTemplate,
    fixture: arrow,
    expect: ['<ArrowLeft20Icon />'],
    notExpect: ['Icon20Adapter'],
});
const buttonTemplates = [
    'ButtonDesktop',
    'ButtonMobile',
    'ButtonInvertedDesktop',
    'ButtonInvertedMobile',
];
const iconButtonTemplates = [
    'IconButtonDesktop',
    'IconButtonMobile',
    'IconButtonInvertedDesktop',
    'IconButtonInvertedMobile',
];
const controls = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/controls.json'), 'utf8'));
const buttonBase = controls.cases.find(
    (test) => test.template.endsWith('/ButtonMobile.figma.ts') && !test.throws,
).fixture;

function buttonFixture(size, type, child) {
    const fixture = structuredClone(buttonBase);

    fixture.properties.Size = size;
    fixture.properties.LeftAddon = true;
    fixture.properties.RightAddon = true;
    fixture.children = ['LeftAddon', 'RightAddon'].map((name) => ({
        type: 'INSTANCE',
        name,
        properties: { Type: type },
        swaps: { [type]: structuredClone(child) },
    }));

    return fixture;
}
for (const parent of buttonTemplates)
    for (const size of ['32', '40']) {
        // Legacy S действительно16px: технический Icon-16 не превращает его в SVG20.
        for (const expected of legacyVariants)
            cases.push({
                template: `packages/button/code-connect/${parent}.figma.ts`,
                fixture: buttonFixture(
                    size,
                    expected.size === 16 ? 'Icon-16' : 'Icon-24',
                    diamonds(expected.variant),
                ),
                expect: [
                    `size={${size}}`,
                    `<${expected.component} />`,
                    'leftAddons=',
                    'rightAddons=',
                ],
                notExpect: ['Diamonds20Icon', 'Diamonds24Icon', 'ArrowLeft'],
                expectedImport: declaration(expected.component),
                expectedAdapters: 0,
                legacyVariant: expected.variant,
            });
        // Настоящий glyph-26 SVG20 должен адаптироваться и в техническом Icon-16, и в Icon-20.
        for (const type of ['Icon-16', 'Icon-20'])
            cases.push({
                template: `packages/button/code-connect/${parent}.figma.ts`,
                fixture: buttonFixture(size, type, arrow),
                expect: [`size={${size}}`, '<ArrowLeft20Icon', 'leftAddons=', 'rightAddons='],
                notExpect: ['Diamonds'],
                expectedImport: arrowImport,
                expectedAdapters: 2,
                actualSvg20: true,
            });
    }
const boundaryCases = [];
const children = legacyVariants.map((expected) => ({
    fixture: diamonds(expected.variant),
    size: expected.size,
    component: expected.component,
    imports: [declaration(expected.component)],
}));

children.push({ fixture: arrow, size: 20, component: 'ArrowLeft20Icon', imports: [arrowImport] });
for (const child of children) {
    const type = child.size === 16 ? 'Icon 16' : 'Icon 24';
    const swap = child.size === 16 ? 'Icon-16' : 'Icon-24';
    const icon = {
        type: 'INSTANCE',
        name: 'Icon',
        template: iconTemplate,
        properties: { Type: type },
        swaps: { [swap]: child.fixture },
    };

    boundaryCases.push({
        template: iconTemplate,
        fixture: icon,
        leafImports: child.imports,
        expectedImport: child.imports[0],
        expect: [`<${child.component}`],
        expectedAdapters: child.size === 20 ? 1 : 0,
    });
    for (const parent of iconButtonTemplates) {
        const fixture = structuredClone(
            controls.cases.find(
                (test) => test.template.endsWith(`/${parent}.figma.ts`) && !test.throws,
            ).fixture,
        );

        fixture.children = [structuredClone(icon)];
        boundaryCases.push({
            template: `packages/icon-button/code-connect/${parent}.figma.ts`,
            fixture,
            leafImports: child.imports,
            expectedImport: child.imports[0],
            expect: [`<${child.component}`],
            expectedAdapters: child.size === 20 ? 1 : 0,
        });
    }
}
cases.push(...boundaryCases);
const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, [], 'Не прошла композиция с точными выбранными иконками');
function checkAdapterCount(source, count) {
    assert.equal((source.match(/<Icon20Adapter\b/g) || []).length, count);
}
const renderedCases = cases.filter((test) => !test.throws);

for (const [index, file] of result.generated.entries()) {
    const source = fs.readFileSync(file, 'utf8');
    const test = renderedCases[index];

    assert(!source.includes('@alfalab/core-components-shared/'));
    if (test.expectedAdapters !== undefined) checkAdapterCount(source, test.expectedAdapters);
    if (test.expectedImport) assert.equal(source.split(test.expectedImport).length - 1, 1);
}
function checkForwardedImports(value, leafImports) {
    assert(Array.isArray(value.imports), 'Нет export.imports');
    assert(Array.isArray(value.metadata?.props?.imports), 'Нет metadata.props.imports');
    assert.equal(new Set(value.imports).size, value.imports.length, 'Повтор export.imports');
    assert.equal(
        new Set(value.metadata.props.imports).size,
        value.metadata.props.imports.length,
        'Повтор metadata.props.imports',
    );
    for (const entry of leafImports) {
        assert(value.imports.includes(entry), 'Потерян leaf import в export.imports');
        assert(
            value.metadata.props.imports.includes(entry),
            'Потерян leaf import в metadata.props.imports',
        );
    }
}
for (const test of boundaryCases) {
    const value = runtime.evaluate(test.template, test.fixture);

    checkForwardedImports(value, test.leafImports);
    assert.throws(
        () =>
            checkForwardedImports(
                {
                    ...value,
                    imports: value.imports.filter((item) => !test.leafImports.includes(item)),
                },
                test.leafImports,
            ),
        /Потерян leaf import в export.imports/,
    );
    assert.throws(
        () =>
            checkForwardedImports(
                {
                    ...value,
                    metadata: {
                        ...value.metadata,
                        props: {
                            ...value.metadata.props,
                            imports: value.metadata.props.imports.filter(
                                (item) => !test.leafImports.includes(item),
                            ),
                        },
                    },
                },
                test.leafImports,
            ),
        /Потерян leaf import в metadata.props.imports/,
    );
}
// Реальный прежний шаблон возвращал glyph-26 вместо выбранного legacy glyph.
const transferredSource = [
    '// url=https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888',
    '// source=https://github.com/core-ds/icons/tree/master/packages/glyph-26/src',
    '// component=Diamonds20Icon / Diamonds24Icon',
    "import figma from 'figma';",
    '',
    "const size = figma.selectedInstance.getEnum('Size', {",
    '    s: 20,',
    '    m: 24,',
    "    xxl: 'unsupported',",
    '});',
    'if (size !== 20 && size !== 24) {',
    '    throw new Error(',
    "        'Diamonds: поддерживаются только Size=s (20) и Size=m (24); у xxl нет соответствия в glyph-26',",
    '    );',
    '}',
    '',
    '// Сниппет иконки возвращает SVG. Icon20Adapter добавляет родитель слота,',
    '// когда иконка 20 используется в Button/Input 32/40.',
    'const imports =',
    '    size === 20',
    '        ? ["import { Diamonds20Icon } from \'@alfalab/icons-glyph-26/Diamonds20Icon\';"]',
    '        : ["import { Diamonds24Icon } from \'@alfalab/icons-glyph-26/Diamonds24Icon\';"];',
    '',
    'export default {',
    "    id: 'core-diamonds-icon',",
    '    imports,',
    '    example: size === 20 ? figma.code`<Diamonds20Icon />` : figma.code`<Diamonds24Icon />`,',
    '    metadata: { nestable: true, props: { svgSize: size, imports } },',
    '};',
].join('\n');
const transferredFile = path.join(output, 'transferred-diamonds.figma.ts');

fs.writeFileSync(transferredFile, transferredSource);
const preFixRuntime = createRuntime(repo);
const transferredS = preFixRuntime.evaluate(path.relative(repo, transferredFile), diamonds('s'));
const transferredM = preFixRuntime.evaluate(path.relative(repo, transferredFile), diamonds('m'));

assert.throws(
    () => checkLegacyIdentity(transferredS, legacyVariants[0]),
    /Подменён размер выбранного Diamonds/,
);
assert.throws(
    () => checkLegacyIdentity(transferredM, legacyVariants[1]),
    /Подменён экспорт выбранного Diamonds/,
);
const actualSvg20 = renderedCases.findIndex(
    (test) => test.actualSvg20 && test.fixture.children[0].properties.Type === 'Icon-16',
);
const adapted = fs.readFileSync(result.generated[actualSvg20], 'utf8');

assert.throws(
    () => checkAdapterCount(adapted.replaceAll('<Icon20Adapter ', '<PreFixRawSvg '), 2),
    /0 !== 2/,
);
const negative = path.join(output, 'missing-leaf-import.tsx');
const boundaryIndex = renderedCases.findIndex(
    (test) => test.leafImports?.[0] === declaration('DiamondsMIcon'),
);
const boundarySource = fs.readFileSync(result.generated[boundaryIndex], 'utf8');

fs.writeFileSync(negative, boundarySource.replace(`${declaration('DiamondsMIcon')}\n`, ''));
const negativeApi = checkApi(repo, [negative]);

assert(
    negativeApi.diagnostics.some(
        (item) =>
            item.code === 2304 &&
            negativeApi.ts
                .flattenDiagnosticMessageText(item.messageText, ' ')
                .includes('DiamondsMIcon'),
    ),
    'Не обнаружен потерянный импорт точного DiamondsMIcon',
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
            buttonTemplates: buttonTemplates.length,
            actualIcon16DiamondsSCases: 8,
            legacyButtonIdentityCases: 24,
            actualSvg20ButtonCases: 16,
            twoLevelImportCases: boundaryCases.length,
            importForwardingNegativeControls: boundaryCases.length * 2,
            previousFamilyTransferNegativeControls: 2,
            missingLeafImportNegativeControl: 'detected',
            missingRealSvg20AdapterNegativeControl: 'detected',
            preservesSelectedDiamondsIdentity: true,
            directChildImportsOnly: true,
            declaredImportsOnly: true,
            apiTypes: 'passed',
            output,
        }),
    );
}
