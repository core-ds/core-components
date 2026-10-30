const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRuntime, checkApi } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'screen-icons-code-connect-'));
const runtime = createRuntime(repo, { directChildImportsOnly: true });
const controls = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/controls.json'), 'utf8'));
const parents = [
    'IconButtonDesktop',
    'IconButtonMobile',
    'IconButtonInvertedDesktop',
    'IconButtonInvertedMobile',
];
const middle = 'packages/icon-button/code-connect/IconButtonIcon.figma.ts';
const icons = [
    { name: 'ArrowLeft', default20: true, node: '149066-33843' },
    { name: 'InformationCircle', default20: true, node: '147586-13294' },
    { name: 'ChevronDown', default20: false, node: '149085-17064' },
];
const cases = [];
const boundaries = [];
const leafVariantChecks = [];
let negativeImportControls = 0;

function leaf(icon, size, style, color = 'False') {
    return {
        type: 'INSTANCE',
        name: icon.name,
        template: `packages/icon-button/code-connect/icons/${icon.name}.figma.ts`,
        properties: { Size: String(size), Style: style, Color: color },
    };
}
function componentName(icon, size, style) {
    if (style === 'Default')
        return size === 20 && !icon.default20 ? undefined : `${icon.name}${size}Icon`;
    if (style === 'Line') return `${icon.name}Line${size}Icon`;

    return size === 20 ? `${icon.name}Thinline20Icon` : undefined;
}
function importsFor(component, packageName = '@alfalab/icons-glyph-26') {
    return [`import { ${component} } from '${packageName}/${component}';`];
}
function checkImports(value, imports) {
    assert(Array.isArray(value.imports), 'Нет export.imports');
    assert(Array.isArray(value.metadata?.props?.imports), 'Нет metadata.props.imports');
    assert.equal(new Set(value.imports).size, value.imports.length, 'Повтор export.imports');
    assert.equal(
        new Set(value.metadata.props.imports).size,
        value.metadata.props.imports.length,
        'Повтор metadata.props.imports',
    );
    for (const declaration of imports) {
        assert(value.imports.includes(declaration), 'Потерян точный импорт в export.imports');
        assert(
            value.metadata.props.imports.includes(declaration),
            'Потерян точный импорт в metadata.props.imports',
        );
    }
}
function checkBoundary(test) {
    const value = runtime.evaluate(test.template, test.fixture);

    checkImports(value, test.expectedImports);
    assert.equal(value.metadata?.nestable, true);
    assert.equal(
        value.metadata?.props?.svgSize,
        undefined,
        'Размер raw SVG не должен проходить дальше уже выполненной адаптации',
    );
    for (const field of ['export', 'metadata']) {
        const damaged =
            field === 'export'
                ? {
                      ...value,
                      imports: value.imports.filter((item) => !test.expectedImports.includes(item)),
                  }
                : {
                      ...value,
                      metadata: {
                          ...value.metadata,
                          props: {
                              ...value.metadata.props,
                              imports: value.metadata.props.imports.filter(
                                  (item) => !test.expectedImports.includes(item),
                              ),
                          },
                      },
                  };

        assert.throws(() => checkImports(damaged, test.expectedImports), /Потерян точный импорт/);
        negativeImportControls += 1;
    }
}
for (const icon of icons) {
    const file = `packages/icon-button/code-connect/icons/${icon.name}.figma.ts`;
    const source = fs.readFileSync(path.join(repo, file), 'utf8');

    assert(
        source.includes(`node-id=${icon.node}`),
        'Шаблон должен ссылаться на подтверждённый исходный набор',
    );
    assert(
        !source.includes('3sImiRGiPBCJHPa3Tyve9o'),
        'Продуктовый экземпляр не является корнем библиотеки',
    );
    for (const size of [20, 24])
        ['Default', 'Line', 'Thinline'].forEach((style) => {
            const fixture = leaf(icon, size, style);
            const component = componentName(icon, size, style);

            leafVariantChecks.push({ icon: icon.name, size, style });
            if (!component) {
                cases.push({ template: file, fixture, throws: 'нет экспорта в glyph-26' });

                return;
            }
            const imports = importsFor(component);
            const value = runtime.evaluate(file, fixture);

            checkImports(value, imports);
            assert.equal(value.imports.length, 1);
            assert.equal(value.metadata.nestable, true);
            assert.equal(value.metadata.props.svgSize, size);
            assert.equal(runtime.flatten(value.example), `<${component} />`);
            assert(
                fs.existsSync(
                    path.join(repo, `node_modules/@alfalab/icons-glyph-26/${component}.js`),
                ),
                `Нет реального JS-экспорта ${component}`,
            );
            assert(
                fs.existsSync(
                    path.join(repo, `node_modules/@alfalab/icons-glyph-26/${component}.d.ts`),
                ),
                `Нет реального type-экспорта ${component}`,
            );
            cases.push({
                template: file,
                fixture,
                expect: [`<${component} />`],
                notExpect: ['<svg', 'Diamonds', 'Code Connect Logic Instance'],
            });
            const iconFixture = {
                type: 'INSTANCE',
                name: 'Icon',
                template: middle,
                properties: { Type: 'Icon 24' },
                swaps: { 'Icon-24': fixture },
            };
            const middleCase = {
                template: middle,
                fixture: iconFixture,
                expectedImports: imports,
                expect: [`<${component}`],
                adapters: size === 20 ? 1 : 0,
            };

            cases.push(middleCase);
            boundaries.push(middleCase);
            for (const parent of parents) {
                const parentFixture = structuredClone(
                    controls.cases.find(
                        (test) => test.template.endsWith(`/${parent}.figma.ts`) && !test.throws,
                    ).fixture,
                );

                parentFixture.properties.Size = size === 24 ? '24' : '32';
                parentFixture.properties.TransparentBg = 'True';
                parentFixture.children = [structuredClone(iconFixture)];
                const test = {
                    template: `packages/icon-button/code-connect/${parent}.figma.ts`,
                    fixture: parentFixture,
                    expectedImports: imports,
                    expect: [`<${component}`, 'icon='],
                    notExpect: ['<svg', 'Diamonds', 'Code Connect Logic Instance'],
                    adapters: size === 20 ? 1 : 0,
                };

                cases.push(test);
                boundaries.push(test);
            }
        });
    for (const fixture of [
        leaf(icon, 16, 'Default'),
        leaf(icon, 24, 'Unknown'),
        leaf(icon, 24, 'Default', 'True'),
    ]) {
        cases.push({ template: file, fixture, throws: 'неизвестные Size/Style/Color' });
    }
}
// У выбранного legacy-набора только Size; Style/Color не придумываются.
const dotsTemplate = 'packages/icon-button/code-connect/icons/DotsThreeVertical.figma.ts';
const dotsSource = fs.readFileSync(path.join(repo, dotsTemplate), 'utf8');

assert(
    dotsSource.includes(
        'https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92334-26810',
    ),
    'Dots должна оставаться связана с выбранным исходным набором',
);
assert(
    !dotsSource.includes('147586-16242'),
    'Одноимённый glyph-26-набор не является выбранной иконкой',
);
const legacySizeChecks = [];

function legacyDots(size) {
    return {
        type: 'INSTANCE',
        name: 'dots-three-vertical',
        template: dotsTemplate,
        properties: { Size: size },
    };
}
for (const [size, svgSize, component] of [
    ['m', 24, 'DotsThreeVerticalMIcon'],
    ['s', 16, 'DotsThreeVerticalSIcon'],
]) {
    const fixture = legacyDots(size);
    const imports = importsFor(component, '@alfalab/icons-glyph');
    const value = runtime.evaluate(dotsTemplate, fixture);

    checkImports(value, imports);
    assert.equal(value.metadata.props.svgSize, svgSize);
    assert.equal(value.imports.length, 1);
    assert.equal(runtime.flatten(value.example), `<${component} />`);
    assert(
        fs.existsSync(path.join(repo, `node_modules/@alfalab/icons-glyph/${component}.js`)),
        `Нет реального JS-экспорта ${component}`,
    );
    assert(
        fs.existsSync(path.join(repo, `node_modules/@alfalab/icons-glyph/${component}.d.ts`)),
        `Нет реального type-экспорта ${component}`,
    );
    legacySizeChecks.push(size);
    cases.push({
        template: dotsTemplate,
        fixture,
        expect: [`<${component} />`],
        notExpect: ['<svg', 'Diamonds', 'Code Connect Logic Instance', 'DotsThreeVerticalLine'],
    });
    const swapName = svgSize === 24 ? 'Icon-24' : 'Icon-16';
    const iconFixture = {
        type: 'INSTANCE',
        name: 'Icon',
        template: middle,
        properties: { Type: svgSize === 24 ? 'Icon 24' : 'Icon 16' },
        swaps: { [swapName]: fixture },
    };
    const middleCase = {
        template: middle,
        fixture: iconFixture,
        expectedImports: imports,
        expect: [`<${component}`],
        adapters: 0,
    };

    cases.push(middleCase);
    boundaries.push(middleCase);
    for (const parent of parents) {
        const parentFixture = structuredClone(
            controls.cases.find(
                (test) => test.template.endsWith(`/${parent}.figma.ts`) && !test.throws,
            ).fixture,
        );

        parentFixture.properties.Size = '24';
        parentFixture.properties.TransparentBg = 'True';
        parentFixture.children = [structuredClone(iconFixture)];
        const test = {
            template: `packages/icon-button/code-connect/${parent}.figma.ts`,
            fixture: parentFixture,
            expectedImports: imports,
            expect: [`<${component}`, 'icon='],
            notExpect: ['<svg', 'Diamonds', 'Code Connect Logic Instance', 'DotsThreeVerticalLine'],
            adapters: 0,
        };

        cases.push(test);
        boundaries.push(test);
    }
}
for (const size of ['xxl', 'unknown']) {
    legacySizeChecks.push(size);
    cases.push({
        template: dotsTemplate,
        fixture: legacyDots(size),
        throws: 'нет точного экспорта',
    });
}
// Фактический Button экрана сохраняет DotsThreeVerticalMIcon, выбранную в Figma.
const actualButtonFixture = structuredClone(
    controls.cases.find((test) => test.template.endsWith('/ButtonMobile.figma.ts') && !test.throws)
        .fixture,
);

actualButtonFixture.properties.View = 'Secondary';
actualButtonFixture.properties.Size = '56';
actualButtonFixture.properties.SingleIcon = 'True';
actualButtonFixture.properties.LeftAddon = true;
actualButtonFixture.properties.RightAddon = false;
actualButtonFixture.children = [
    {
        type: 'INSTANCE',
        name: 'LeftAddon',
        properties: { Type: 'Icon-24' },
        swaps: { 'Icon-24': legacyDots('m') },
    },
];
cases.push({
    template: 'packages/button/code-connect/ButtonDesktop.figma.ts',
    fixture: actualButtonFixture,
    expectedImports: importsFor('DotsThreeVerticalMIcon', '@alfalab/icons-glyph'),
    expect: [
        '<ButtonDesktop',
        'size={56}',
        'leftAddons={<DotsThreeVerticalMIcon />}',
        'aria-label=',
    ],
    notExpect: ['<svg', 'Diamonds', 'Code Connect Logic Instance', 'DotsThreeVerticalLine'],
    adapters: 0,
});

for (const test of boundaries) checkBoundary(test);
const result = runtime.runCases(cases, output);

assert.deepEqual(result.failures, [], 'Не прошла композиция реальных leaf-шаблонов иконок');
const renderedCases = cases.filter((test) => !test.throws);

for (const [index, file] of result.generated.entries()) {
    const source = fs.readFileSync(file, 'utf8');
    const test = renderedCases[index];

    assert(!source.includes('Code Connect Logic Instance'));
    assert(!source.includes('@alfalab/core-components-shared/'));
    for (const declaration of test.expectedImports || [])
        assert.equal(
            source.split(declaration).length - 1,
            1,
            'Импорт иконки должен присутствовать ровно один раз',
        );
    if (test.adapters !== undefined)
        assert.equal(
            (source.match(/<Icon20Adapter\b/g) || []).length,
            test.adapters,
            'Адаптер должен применяться ровно один раз к SVG20',
        );
}
const negativeCase = renderedCases.findIndex((test) =>
    test.expectedImports?.some((value) => value.includes('InformationCircle24Icon')),
);
const negativeSource = fs.readFileSync(result.generated[negativeCase], 'utf8');
const negativeFile = path.join(output, 'missing-information-circle-import.tsx');

fs.writeFileSync(
    negativeFile,
    negativeSource.replace(`${importsFor('InformationCircle24Icon')[0]}\n`, ''),
);
const negative = checkApi(repo, [negativeFile]);

assert(
    negative.diagnostics.some(
        (item) =>
            item.code === 2304 &&
            negative.ts
                .flattenDiagnosticMessageText(item.messageText, ' ')
                .includes('InformationCircle24Icon'),
    ),
    'Отрицательная проверка должна обнаруживать потерю реального импорта',
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
            leafVariantChecks: leafVariantChecks.length,
            renderedSnippets: result.generated.length,
            twoLevelCompositions: boundaries.length,
            negativeImportControls,
            legacySizeChecks: legacySizeChecks.length,
            actualButtonDotsM: true,
            preservesSelectedIconIdentity: true,
            missingLeafImportNegativeControl: 'detected',
            directChildImportsOnly: true,
            apiTypes: 'passed',
            output,
        }),
    );
}
