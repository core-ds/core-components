const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const path = require('node:path');
const ts = require('typescript');
const { createRuntime } = require('./template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../..');
const runtime = createRuntime(repo);
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/controls.json')));

function verifyTagGroup() {
    let checks = 0;
    const equal = (actual, expected) =>
        assert.deepEqual(JSON.parse(JSON.stringify(actual)), expected);

    function execute(test, scenario) {
        const result = runtime.evaluate(test.template, test.fixture);
        const body = runtime.flatten(result.example);
        const code = ts.transpileModule(
            `${result.imports.join('\n')}\n${body}\nexports.Example = Example;`,
            {
                compilerOptions: {
                    target: ts.ScriptTarget.ES2021,
                    module: ts.ModuleKind.CommonJS,
                    jsx: ts.JsxEmit.React,
                    esModuleInterop: true,
                },
            },
        ).outputText;
        let state;
        const React = {
            createElement: (type, props, ...children) => ({
                type,
                props: { ...props, children: children.length === 1 ? children[0] : children },
            }),
            cloneElement: (element, props) => ({
                ...element,
                props: { ...element.props, ...props },
            }),
            useState: (initial) => {
                state = initial;

                return [
                    initial,
                    (next) => {
                        state = typeof next === 'function' ? next(state) : next;
                    },
                ];
            },
        };
        const exports = {};

        vm.runInNewContext(code, {
            exports,
            require(name) {
                if (name === 'react') return React;

                return new Proxy({}, { get: (_, key) => key });
            },
            Set,
            Error,
        });
        const element = exports.Example({ scenario });

        return { element, getState: () => state, metadata: result.metadata };
    }
    for (const platform of ['Desktop', 'Mobile']) {
        const base = manifest.cases.find(
            (c) => c.template.endsWith(`TagGroup${platform}.figma.ts`) && !c.throws,
        );
        let calls = [];
        const handler = (event, payload) => calls.push(payload);
        const single = execute(base, {
            mode: 'single',
            name: 'product-filter',
            values: ['alpha', 'beta'],
            onChange: handler,
        });

        assert.equal(single.element.type, `RadioGroup${platform}`);
        assert.equal(single.element.props.type, 'tag');
        assert.equal(single.element.props.value, 'alpha');
        equal(
            single.element.props.children.map((x) => x.props.value),
            ['alpha', 'beta'],
        );
        equal(
            single.element.props.children.map((x) => x.props.value === single.element.props.value),
            [true, false],
        );
        checks += 5;
        single.element.props.onChange(null, { value: 'beta', name: 'product-filter' });
        equal(Array.from(single.getState()), [false, true]);
        assert.equal(calls.length, 1);
        checks += 2;
        const multiFixture = JSON.parse(JSON.stringify(base));

        multiFixture.fixture.children[1].properties.SelectedState = 'True';
        calls = [];
        const multiple = execute(multiFixture, {
            mode: 'multiple',
            values: ['alpha', 'beta'],
            onChange: handler,
        });

        assert.equal(multiple.element.type, `CheckboxGroup${platform}`);
        equal(
            multiple.element.props.children.map((x) => x.props.checked),
            [true, true],
        );
        equal(
            multiple.element.props.children.map((x) => x.props.name),
            ['alpha', 'beta'],
        );
        checks += 3;
        multiple.element.props.onChange(null, { name: 'beta', checked: false });
        equal(Array.from(multiple.getState()), [true, false]);
        assert.equal(calls.length, 1);
        checks += 2;
        assert.throws(
            () =>
                execute(multiFixture, {
                    mode: 'single',
                    name: 'product-filter',
                    values: ['alpha', 'beta'],
                    onChange: handler,
                }),
            /выбрано несколько Tag/,
        );
        assert.throws(
            () =>
                execute(base, {
                    mode: 'single',
                    name: 'product-filter',
                    values: ['alpha'],
                    onChange: handler,
                }),
            /для каждого Tag/,
        );
        assert.throws(
            () =>
                execute(base, { mode: 'multiple', values: ['alpha', 'alpha'], onChange: handler }),
            /уникальный/,
        );
        checks += 3;
        const empty = JSON.parse(JSON.stringify(base));

        empty.fixture.children[0].properties.SelectedState = 'False';
        const none = execute(empty, {
            mode: 'single',
            name: 'product-filter',
            values: ['alpha', 'beta'],
            onChange: handler,
        });

        assert.equal(none.element.props.value, null);
        checks += 1;
    }

    return checks;
}
module.exports = { verifyTagGroup };
if (require.main === module)
    console.log(JSON.stringify({ tagGroupSelectionChecks: verifyTagGroup(), result: 'passed' }));
