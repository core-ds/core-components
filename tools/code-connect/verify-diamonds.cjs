const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const template = 'packages/button/code-connect/Diamonds.figma.ts';
const iconTemplate = 'packages/icon-button/code-connect/IconButtonIcon.figma.ts';
const config = JSON.parse(fs.readFileSync(path.join(repo, 'figma.config.json'), 'utf8'));
const { scripts } = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));

assert(config.codeConnect.include.includes(template), 'Diamonds отсутствует в общем наборе');
assert(config.codeConnect.include.every((file) => file.endsWith('.figma.ts')));
assert(scripts['figma:connect:publish'].includes('--config figma.config.json'));
assert.equal(scripts['figma:connect:unpublish'], undefined);
for (const legacy of ['Button.figma.tsx', 'Diamonds.figma.tsx']) {
    assert(!fs.existsSync(path.join(repo, 'packages/button/code-connect', legacy)));
}

function diamonds(size) {
    return { type: 'INSTANCE', name: 'diamonds', template, properties: { Size: size } };
}
const cases = [
    {
        template,
        fixture: diamonds('s'),
        expect: ['<Diamonds20Icon'],
        notExpect: ['Diamonds24Icon', 'Icon20Adapter'],
    },
    {
        template,
        fixture: diamonds('m'),
        expect: ['<Diamonds24Icon'],
        notExpect: ['Diamonds20Icon', 'Icon20Adapter'],
    },
    {
        template,
        fixture: diamonds('xxl'),
        throws: 'Diamonds: поддерживаются только',
    },
    {
        template,
        fixture: diamonds('unknown'),
        throws: 'Diamonds: поддерживаются только',
    },
];
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

for (const parent of buttonTemplates) {
    for (const size of ['32', '40']) {
        /*
         * The live 32/40 variants use Type=Icon-16 with a Diamonds Size=s (20px).
         * Also preserve the explicit Icon-20 contract and leave ordinary 24px SVGs raw.
         */
        for (const [type, svgSize, adapted] of [
            ['Icon-20', 's', true],
            ['Icon-16', 's', true],
            ['Icon-16', 'm', false],
            ['Icon-24', 'm', false],
            ['Icon-20', 'm', true],
        ]) {
            const fixture = structuredClone(buttonBase);

            fixture.properties.Size = size;
            fixture.properties.LeftAddon = true;
            fixture.properties.RightAddon = true;
            fixture.children = ['LeftAddon', 'RightAddon'].map((name) => ({
                type: 'INSTANCE',
                name,
                properties: { Type: type },
                swaps: { [type]: diamonds(svgSize) },
            }));
            cases.push({
                template: `packages/button/code-connect/${parent}.figma.ts`,
                fixture,
                expect: [
                    `size={${size}}`,
                    svgSize === 's' ? 'Diamonds20Icon' : 'Diamonds24Icon',
                    'leftAddons=',
                    'rightAddons=',
                ],
                notExpect: [svgSize === 's' ? 'Diamonds24Icon' : 'Diamonds20Icon'],
                expectedAdapters: adapted ? 2 : 0,
            });
        }
    }
}

const boundaryCases = [];

for (const [type, swap, size] of [
    ['Icon 24', 'Icon-24', 'm'],
    ['icon-20', 'Icon-20', 's'],
]) {
    const icon = {
        type: 'INSTANCE',
        name: 'Icon',
        template: iconTemplate,
        properties: { Type: type },
        swaps: { [swap]: diamonds(size) },
    };

    boundaryCases.push({
        template: iconTemplate,
        fixture: icon,
        expectedLeafSize: size,
        expect: [size === 's' ? 'Diamonds20Icon' : 'Diamonds24Icon'],
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
            expectedLeafSize: size,
            expect: [size === 's' ? 'Diamonds20Icon' : 'Diamonds24Icon'],
        });
    }
}
cases.push(...boundaryCases);

/*
 * The live renderer propagates immediate child imports, not arbitrary descendants.
 * This mode catches Diamonds -> IconButtonIcon -> IconButton import loss.
 */
const runtime = createRuntime(repo, { directChildImportsOnly: true });
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'diamonds-code-connect-'));
const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, [], 'Не прошла композиция с настоящим шаблоном Diamonds');
function checkAdapterCount(source, count) {
    assert.equal((source.match(/<Icon20Adapter\b/g) || []).length, count);
}
const renderedCases = cases.filter((test) => !test.throws);

for (const [index, file] of result.generated.entries()) {
    const source = fs.readFileSync(file, 'utf8');
    const test = renderedCases[index];

    assert(!source.includes('@alfalab/core-components-shared/'));
    if (test.expectedAdapters !== undefined) {
        checkAdapterCount(source, test.expectedAdapters);
        assert.equal((source.match(/import \{ Icon20Adapter \}/g) || []).length, 1);
        assert.equal((source.match(/import \{ Diamonds(?:20|24)Icon \}/g) || []).length, 1);
    }
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
    for (const declaration of leafImports) {
        assert(value.imports.includes(declaration), 'Потерян leaf import в export.imports');
        assert(
            value.metadata.props.imports.includes(declaration),
            'Потерян leaf import в metadata.props.imports',
        );
    }
}
for (const test of boundaryCases) {
    const leaf = runtime.evaluate(template, diamonds(test.expectedLeafSize));
    const value = runtime.evaluate(test.template, test.fixture);

    checkForwardedImports(leaf, leaf.imports);
    checkForwardedImports(value, leaf.imports);
    /*
     * These controls inspect actual exports, so a recursive global collector cannot
     * hide a missing metadata forwarding step at either intermediate or parent level.
     */
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
                                (item) => !leaf.imports.includes(item),
                            ),
                        },
                    },
                },
                leaf.imports,
            ),
        /Потерян leaf import в metadata.props.imports/,
    );
    assert.throws(
        () =>
            checkForwardedImports(
                { ...value, imports: value.imports.filter((item) => !leaf.imports.includes(item)) },
                leaf.imports,
            ),
        /Потерян leaf import в export.imports/,
    );
}
const actualSmall = renderedCases.findIndex(
    (test) =>
        test.expectedAdapters === 2 && test.fixture.children?.[0]?.properties?.Type === 'Icon-16',
);
const adapted = fs.readFileSync(result.generated[actualSmall], 'utf8');

assert.throws(
    () => checkAdapterCount(adapted.replaceAll('<Icon20Adapter ', '<PreFixRawSvg '), 2),
    /0 !== 2/,
);
const negative = path.join(output, 'missing-leaf-import.tsx');
const boundaryIndex = renderedCases.findIndex((test) => test.expectedLeafSize === 'm');
const boundarySource = fs.readFileSync(result.generated[boundaryIndex], 'utf8');

fs.writeFileSync(negative, boundarySource.replace(/^import \{ Diamonds24Icon \}[^\n]*\n/m, ''));
const negativeApi = checkApi(repo, [negative]);

assert(
    negativeApi.diagnostics.some(
        (item) =>
            item.code === 2304 &&
            negativeApi.ts
                .flattenDiagnosticMessageText(item.messageText, ' ')
                .includes('Diamonds24Icon'),
    ),
    'Отрицательный контроль не обнаружил потерянный импорт Diamonds24Icon',
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
            actualIcon16ButtonCases: 8,
            twoLevelImportCases: boundaryCases.length,
            importForwardingNegativeControls: boundaryCases.length * 2,
            missingLeafImportNegativeControl: 'detected',
            missingAdapterNegativeControl: 'detected',
            actualDiamondsTemplate: true,
            directChildImportsOnly: true,
            declaredImportsOnly: true,
            apiTypes: 'passed',
            output,
        }),
    );
}
