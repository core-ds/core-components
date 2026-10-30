const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const template = 'tools/code-connect/fixtures/nested-content.fixture.ts';
const slotTemplate = 'packages/icon-button/code-connect/IconButtonIcon.figma.ts';
const declaration = "import { NestedContent } from './nested-content';";
const runtime = createRuntime(repo, { directChildImportsOnly: true });
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'child-composition-code-connect-'));

fs.writeFileSync(
    path.join(output, 'nested-content.tsx'),
    "import type { SVGProps } from 'react';\nexport const NestedContent = (props: SVGProps<SVGSVGElement>) => <svg {...props} />;\n",
);
const fixture = (size) => ({
    type: 'INSTANCE',
    name: 'Nested content',
    template,
    properties: { Size: String(size) },
});
const controls = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/controls.json'), 'utf8'));
const buttonBase = controls.cases.find(
    (test) => test.template.endsWith('/ButtonMobile.figma.ts') && !test.throws,
).fixture;
const parents = ['ButtonDesktop', 'ButtonMobile', 'ButtonInvertedDesktop', 'ButtonInvertedMobile'];
const slotParents = [
    'IconButtonDesktop',
    'IconButtonMobile',
    'IconButtonInvertedDesktop',
    'IconButtonInvertedMobile',
];
const cases = [16, 20, 24, 48].map((size) => {
    const value = runtime.evaluate(template, fixture(size));

    assert.equal(value.metadata.nestable, true);
    assert.equal(value.metadata.props.svgSize, size);
    assert.deepEqual([...value.imports], [declaration]);
    assert.deepEqual([...value.metadata.props.imports], [declaration]);

    return { template, fixture: fixture(size), expect: ['<NestedContent />'], adapters: 0 };
});

cases.push({ template, fixture: fixture('unknown'), throws: 'Unsupported nested content size' });
for (const parent of parents)
    for (const size of ['32', '40'])
        for (const svgSize of [16, 20, 24, 48])
            for (const type of svgSize === 20
                ? ['Icon-16', 'Icon-20']
                : [svgSize === 16 ? 'Icon-16' : 'Icon-24']) {
                const value = structuredClone(buttonBase);

                value.properties.Size = size;
                value.properties.LeftAddon = true;
                value.properties.RightAddon = true;
                value.children = ['LeftAddon', 'RightAddon'].map((name) => ({
                    type: 'INSTANCE',
                    name,
                    properties: { Type: type },
                    swaps: { [type]: fixture(svgSize) },
                }));
                cases.push({
                    template: `packages/button/code-connect/${parent}.figma.ts`,
                    fixture: value,
                    expect: [`size={${size}}`, '<NestedContent', 'leftAddons=', 'rightAddons='],
                    adapters: svgSize === 20 ? 2 : 0,
                    svg20: svgSize === 20,
                    technical16: type === 'Icon-16',
                });
            }
const boundaryCases = [];

for (const svgSize of [16, 20, 24, 48]) {
    const type = svgSize === 16 ? 'Icon 16' : 'Icon 24';
    const swap = svgSize === 16 ? 'Icon-16' : 'Icon-24';
    const slot = {
        type: 'INSTANCE',
        name: 'Icon',
        template: slotTemplate,
        properties: { Type: type },
        swaps: { [swap]: fixture(svgSize) },
    };

    boundaryCases.push({
        template: slotTemplate,
        fixture: slot,
        expect: ['<NestedContent'],
        adapters: svgSize === 20 ? 1 : 0,
    });
    for (const parent of slotParents) {
        const value = structuredClone(
            controls.cases.find(
                (test) => test.template.endsWith(`/${parent}.figma.ts`) && !test.throws,
            ).fixture,
        );

        value.children = [structuredClone(slot)];
        boundaryCases.push({
            template: `packages/icon-button/code-connect/${parent}.figma.ts`,
            fixture: value,
            expect: ['<NestedContent'],
            adapters: svgSize === 20 ? 1 : 0,
        });
    }
}
cases.push(...boundaryCases);
const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, []);
const rendered = cases.filter((test) => !test.throws);
const adapterCount = (source, expected) =>
    assert.equal((source.match(/<Icon20Adapter\b/g) || []).length, expected);

for (const [index, file] of result.generated.entries()) {
    const source = fs.readFileSync(file, 'utf8');

    adapterCount(source, rendered[index].adapters);
    assert.equal(source.split(declaration).length - 1, 1, 'Nested import must be emitted once');
    assert(!source.includes('@alfalab/core-components-shared/'));
}
function checkForwarding(value) {
    assert(value.imports.includes(declaration), 'Nested import missing in export.imports');
    assert(
        value.metadata.props.imports.includes(declaration),
        'Nested import missing in metadata.props.imports',
    );
    assert.equal(new Set(value.imports).size, value.imports.length);
    assert.equal(new Set(value.metadata.props.imports).size, value.metadata.props.imports.length);
}
for (const test of boundaryCases) {
    const value = runtime.evaluate(test.template, test.fixture);

    checkForwarding(value);
    assert.throws(
        () =>
            checkForwarding({ ...value, imports: value.imports.filter((s) => s !== declaration) }),
        /missing in export.imports/,
    );
    assert.throws(
        () =>
            checkForwarding({
                ...value,
                metadata: {
                    ...value.metadata,
                    props: {
                        ...value.metadata.props,
                        imports: value.metadata.props.imports.filter((s) => s !== declaration),
                    },
                },
            }),
        /missing in metadata.props.imports/,
    );
}
const adapted = fs.readFileSync(
    result.generated[rendered.findIndex((test) => test.svg20 && test.technical16)],
    'utf8',
);

assert.throws(
    () => adapterCount(adapted.replaceAll('<Icon20Adapter ', '<UnadaptedContent '), 2),
    /0 !== 2/,
);
const negative = path.join(output, 'missing-child-import.tsx');

fs.writeFileSync(negative, adapted.replace(declaration, ''));
const missing = checkApi(repo, [negative]);

assert(
    missing.diagnostics.some(
        (d) =>
            d.code === 2304 &&
            missing.ts.flattenDiagnosticMessageText(d.messageText, ' ').includes('NestedContent'),
    ),
);
const { diagnostics, ts } = checkApi(repo, result.generated);

if (diagnostics.length) {
    console.error(
        ts.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCanonicalFileName: (f) => f,
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
            buttonTemplates: parents.length,
            buttonCompositions: 40,
            technicalSlotSvg20Cases: 8,
            twoLevelImportCases: boundaryCases.length,
            importForwardingNegativeControls: boundaryCases.length * 2,
            missingChildImportNegativeControl: 'detected',
            missingAdapterNegativeControl: 'detected',
            syntheticContentOnly: true,
            directChildImportsOnly: true,
            apiTypes: 'passed',
            output,
        }),
    );
}
