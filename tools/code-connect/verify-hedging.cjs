/* eslint no-underscore-dangle: ["error", { "allow": ["_search"] }] -- The fixture runtime preserves the Figma SDK search field. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const repo = path.resolve(__dirname, '../..');
// Load the same TypeScript installation used by the component repository.
// eslint-disable-next-line import/no-dynamic-require
const ts = require(path.join(repo, 'node_modules/typescript'));
const stage = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'hedging-code-connect-'));

fs.mkdirSync(stage, { recursive: true });
for (const file of fs.readdirSync(stage))
    if (
        /^(ButtonDesktop|TagDesktop|InputDesktop|UniversalDateInputDesktop|Amount|IconView)-\d+\.tsx$/.test(
            file,
        )
    )
        fs.unlinkSync(path.join(stage, file));
const text = (name, value) => ({
    type: 'INSTANCE',
    name,
    properties: {},
    children: [{ type: 'TEXT', name, textContent: value }],
});
const error = { type: 'ERROR' };
const flatten = (value) => {
    if (value == null || value === false) return '';
    if (Array.isArray(value)) return value.map(flatten).join('');
    if (value.sections) return flatten(value.sections);
    if (value.type === 'CODE') return value.code;
    if (value.type === 'ERROR') throw new Error(value.message);

    return String(value);
};

function handle(data) {
    if (data.type === 'TEXT') return data;
    const children = (data.children || []).map(handle);
    const properties = Object.fromEntries(
        Object.entries(data.properties || {}).map(([k, value]) => [
            k.split('#')[0].trim(),
            { value },
        ]),
    );

    function get(name) {
        const key = Object.keys(properties).find((k) => k === name);

        if (key === undefined) throw new Error(`PROPERTY_NOT_FOUND: ${name}`);

        return properties[key].value;
    }
    function search(predicate, traverse = false) {
        const result = [];

        for (const child of children) {
            if (predicate(child)) result.push(child);
            if (child.type !== 'INSTANCE' || traverse)
                result.push(...(child._search?.(predicate, traverse) || []));
        }

        return result;
    }

    return {
        type: data.type || 'INSTANCE',
        name: data.name,
        properties,
        children,
        slots: data.slots,
        _search: search,
        getPropertyValue: get,
        getBoolean: (name) => {
            const value = get(name);

            assert.equal(typeof value, 'boolean');

            return value;
        },
        getString: (name) => {
            const value = get(name);

            assert.equal(typeof value, 'string');

            return value;
        },
        getEnum: (name, values) => values[get(name)],
        getInstanceSwap: (name) => (data.swaps?.[name] ? handle(data.swaps[name]) : error),
        getSlot: (name) => data.slots?.[name],
        findInstance: (name, options) =>
            search(
                (n) => n.type === 'INSTANCE' && n.name === name,
                options?.traverseInstances,
            )[0] || error,
        findText: (name, options) =>
            search((n) => n.type === 'TEXT' && n.name === name, options?.traverseInstances)[0] ||
            error,
        findLayers: (predicate, options) => search(predicate, options?.traverseInstances),
        executeTemplate: () => {
            if (!data.code)
                throw new Error(`Отсутствует Code Connect вложенного компонента ${data.name}`);

            return { example: [{ type: 'CODE', code: data.code }] };
        },
    };
}
const fixtures = {
    ButtonDesktop: {
        name: 'Button',
        properties: {
            View: 'Primary',
            Size: '56',
            Shape: 'Rectangular',
            DisabledState: 'False',
            SingleIcon: 'False',
            LeftAddon: false,
            RightAddon: false,
            Label: true,
            '✎ Label#16:294': 'Заполнить заявку',
            Hint: false,
            '✎ Hint': '',
        },
    },
    TagDesktop: {
        name: 'Tag',
        properties: {
            Size: '48',
            Shape: 'Rounded',
            SelectedState: 'True',
            DisabledState: 'False',
            SingleIcon: 'False',
            ClearButton: 'False',
            Indicator: 'Hidden',
            LeftAddon: false,
            RightAddon: false,
            Label: true,
            '✎ Label': 'Валютный форвард',
        },
    },
    InputDesktop: {
        name: 'Input',
        properties: {
            Size: '56',
            OuterLabel: 'False',
            DisabledState: 'False',
            FilledState: 'True',
            ActiveState: 'False',
            ErrorState: 'False',
            ' ↳ Label#29:470': true,
            Hint: false,
            ErrorMessage: false,
            LeftAddons: false,
            RightAddons: false,
            ' ↳ LeftAddon2': false,
            ' ↳ RightAddon2': false,
        },
        children: [text('Label', 'Сумма покупки'), text('Value', '1 000 CNY')],
    },
    UniversalDateInputDesktop: {
        name: 'Date',
        properties: {
            Size: '56',
            OuterLabel: 'False',
            DisabledState: 'False',
            FilledState: 'True',
            ActiveState: 'False',
            ErrorState: 'False',
            ' ↳ Label': true,
            Hint: false,
            ErrorMessage: false,
            LeftAddons: false,
            RightAddons: true,
            ' ↳ LeftAddon2': false,
            ' ↳ RightAddon2': false,
            ' ↳ Picker': true,
        },
        children: [text('Label', 'Дата расчёта'), text('Value', '30.03.2026')],
    },
    Amount: {
        name: 'Amount',
        properties: { Minor: true, Currency: true, Addon: false },
        children: [
            text('Major', '+1\u202f000'),
            { ...text('Minor', ',00'), properties: { Opacity: 'False' } },
            { ...text('Currency', 'CNY'), properties: { Type: 'CNY', Opacity: 'False' } },
        ],
    },
    IconView: {
        name: 'IconView',
        properties: {
            Size: '32',
            Shape: true,
            Border: false,
            BgColor: false,
            BgImg: false,
            Text: true,
            '✎ Text': 'АБ',
            Content: false,
            TopAddon: false,
            BottomAddon: false,
            Indicator: false,
        },
        children: [{ name: 'Shape', properties: { Form: 'Circle' } }],
    },
};
const config = JSON.parse(fs.readFileSync(path.join(repo, 'figma.hedging.config.json')));
const files = Object.fromEntries(
    config.codeConnect.include.map((p) => [path.basename(p, '.figma.ts'), p]),
);
let checks = 0;

function render(templateName, fixture, check, expectedError) {
    const source = fs.readFileSync(path.join(repo, files[templateName]), 'utf8');
    const js = ts.transpileModule(source, {
        compilerOptions: {
            target: ts.ScriptTarget.ES2021,
            module: ts.ModuleKind.CommonJS,
            esModuleInterop: true,
        },
    }).outputText;
    const code = (strings, ...values) => ({
        sections: [
            {
                type: 'CODE',
                code: strings.reduce(
                    (out, s, i) => out + s + (i < values.length ? flatten(values[i]) : ''),
                    '',
                ),
            },
        ],
    });
    const figma = {
        selectedInstance: handle(fixture),
        code,
        helpers: {
            react: {
                renderProp: (name, value) =>
                    value === undefined ? '' : `${name}={${JSON.stringify(value)}}`,
            },
        },
    };
    const exports = {};
    const run = () => {
        vm.runInNewContext(js, {
            require: (name) => {
                assert.equal(name, 'figma');

                return figma;
            },
            exports,
        });
        const result = exports.default;
        const body = flatten(result.example);

        assert(!body.includes('undefined'), 'Сниппет содержит undefined');
        const imports = [...result.imports];

        if (body.includes('ActualIcon')) imports.push('const ActualIcon = () => <svg />;');
        const content = `${[...new Set(["import React from 'react';", ...imports])].join('\n')}\n${
            body.startsWith('function ') ? body : `const Example = () => (${body});`
        }\n`;
        const { diagnostics } = ts.transpileModule(content, {
            fileName: 'example.tsx',
            reportDiagnostics: true,
            compilerOptions: { jsx: ts.JsxEmit.React },
        });

        assert.equal(diagnostics?.length || 0, 0, 'Некорректный JSX');
        fs.writeFileSync(path.join(stage, `${templateName}-${checks}.tsx`), content);
        check?.(body);

        return body;
    };

    if (expectedError) assert.throws(run, expectedError);
    else run();
    checks += 1;
}
const clone = (name) => structuredClone(fixtures[name]);

for (const name of Object.keys(fixtures)) render(name, clone(name));
let f = clone('ButtonDesktop');

f.properties['✎ Label#16:294'] = 'Текст "кавычки" <script>&\nстрока';
render('ButtonDesktop', f, (s) => assert(s.includes('\\n')));
for (const size of ['32', '40', '48', '56', '64', '72']) {
    f = clone('ButtonDesktop');
    f.properties.Size = size;
    render('ButtonDesktop', f, (s) => assert(s.includes(`size={${size}}`)));
}
f = clone('ButtonDesktop');
f.properties.LeftAddon = true;
f.children = [
    {
        name: 'LeftAddon',
        properties: { Type: 'Icon-24' },
        swaps: { 'Icon-24': { name: 'SwappedIcon', code: '<ActualIcon />' } },
    },
];
render('ButtonDesktop', f, (s) => assert(s.includes('leftAddons={<ActualIcon />}')));
f = clone('ButtonDesktop');
f.properties.LeftAddon = true;
f.children = [{ name: 'LeftAddon', properties: { Type: 'Spinner' } }];
render('ButtonDesktop', f, (s) => assert(s.includes('loading')));
f = clone('ButtonDesktop');
f.properties.Size = '40';
f.properties.LeftAddon = true;
f.children = [
    {
        name: 'LeftAddon',
        properties: { Type: 'Icon-20' },
        swaps: { 'Icon-20': { name: 'SwappedIcon', code: '<ActualIcon />' } },
    },
];
render('ButtonDesktop', f, (s) => assert(s.includes('React.cloneElement(<ActualIcon />, props)')));
f = clone('ButtonDesktop');
f.properties.SingleIcon = 'True';
render('ButtonDesktop', f, (s) =>
    assert(s.includes('aria-label') && !s.includes('>{"Заполнить заявку"}')),
);
f = clone('ButtonDesktop');
f.properties.LeftAddon = true;
f.children = [
    {
        name: 'LeftAddon',
        properties: { Type: 'Icon-24' },
        swaps: { 'Icon-24': { name: 'Unconnected' } },
    },
];
render('ButtonDesktop', f, null, /Отсутствует Code Connect/);
f = clone('TagDesktop');
f.properties.SingleIcon = 'True';
f.properties.Size = '56';
render('TagDesktop', f, null, /не поддерживает/);
f = clone('TagDesktop');
f.properties.Indicator = 'Digit';
f.children = [text('Indicator', '42')];
render('TagDesktop', f, (s) => assert(s.includes('value: 42')));
f = clone('InputDesktop');
f.properties.FilledState = 'False';
f.children = [text('Label', 'Сумма'), text('Placeholder', 'Введите сумму')];
render('InputDesktop', f, (s) =>
    assert(s.includes('placeholder={"Введите сумму"}') && !s.includes('defaultValue=')),
);
f = clone('InputDesktop');
f.properties.ErrorState = 'True';
f.properties.ErrorMessage = true;
f.children.push(text('ErrorMessage', 'Ошибка "поля"'));
render('InputDesktop', f, (s) => assert(s.includes('error=')));
f = clone('UniversalDateInputDesktop');
f.properties.RightAddons = false;
render('UniversalDateInputDesktop', f, (s) =>
    assert(s.includes('picker={false}') && !s.includes('Calendar={Calendar}')),
);
for (const date of ['31.02.2026', '01.13.2026', '12:30']) {
    f = clone('UniversalDateInputDesktop');
    f.children[1] = text('Value', date);
    render('UniversalDateInputDesktop', f, null, /дат|Дата|формат|ДД/);
}
f = clone('Amount');
f.children[0] = text('Major', '−1\u00a0234');
f.children[1] = { ...text('Minor', ',56'), properties: { Opacity: 'True' } };
f.children[2].properties.Opacity = 'True';
render('Amount', f, (s) => assert(s.includes('value={-123456}') && s.includes('transparentMinor')));
f = clone('Amount');
f.properties.Minor = false;
f.properties.Currency = false;
render('Amount', f, (s) => assert(!s.includes('currency=')));
f = clone('Amount');
f.children[0] = text('Major', '999999999999999999');
render('Amount', f, null, /диапазон/);
f = clone('IconView');
f.properties.Shape = false;
render('IconView', f, (s) => assert(s.includes('<NoShape') && !s.includes('border=')));
f = clone('IconView');
f.properties.BgColor = true;
f.properties.BgImg = true;
render('IconView', f, (s) =>
    assert(s.startsWith('function Example') && s.includes('imageUrl={imageUrl}')),
);
f = clone('IconView');
f.properties.Content = true;
f.children.push({
    name: 'Content',
    properties: { Type: 'Icon', Size: '24' },
    swaps: { 'Icon 24': { name: 'Swapped', code: '<ActualIcon />' } },
});
render('IconView', f, (s) => assert(s.includes('<ActualIcon />')));

// Проверяем настоящий API локальной библиотеки, а не только синтаксис JSX.
const paths = {
    '@alfalab/core-components/icon-view': ['packages/icon-view/src/components'],
    '@alfalab/core-components/*/desktop': ['packages/*/src/desktop'],
    '@alfalab/core-components/shared/*': ['packages/shared/src/*'],
    '@alfalab/core-components/*': ['packages/*/src'],
};

for (const entry of fs.readdirSync(path.join(repo, 'packages'), { withFileTypes: true })) {
    if (entry.isDirectory()) {
        const source = path.join(repo, 'packages', entry.name, 'src');

        if (fs.existsSync(source)) {
            const index = ['index.ts', 'components/index.ts']
                .map((p) => path.join(source, p))
                .find((p) => fs.existsSync(p));

            if (index) paths[`@alfalab/core-components-${entry.name}`] = [index];
            paths[`@alfalab/core-components-${entry.name}/*`] = [path.join(source, '*')];
        }
    }
}
const snippets = fs
    .readdirSync(stage)
    .filter((p) => p.endsWith('.tsx'))
    .map((p) => path.join(stage, p));
const program = ts.createProgram(
    [...snippets, path.join(repo, 'packages/env/src/react-app.d.ts')],
    {
        target: ts.ScriptTarget.ES2021,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.Node10,
        jsx: ts.JsxEmit.React,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        baseUrl: repo,
        types: ['react'],
        typeRoots: [path.join(repo, 'node_modules/@types')],
        paths,
    },
);
const diagnostics = ts.getPreEmitDiagnostics(program);

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
            checks,
            renderedSnippets: snippets.length,
            apiTypes: 'passed',
            output: stage,
        }),
    );
}
