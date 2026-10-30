/* eslint no-underscore-dangle: ["error", { "allow": ["_search", "__containingSlotName__"] }] -- The fixture runtime preserves these Figma SDK field names. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function createRuntime(repo, runtimeOptions = {}) {
    // Resolve TypeScript from the tested repository, which may differ from this tool's location.
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const ts = require(path.join(repo, 'node_modules/typescript'));
    const cache = new Map();
    let childImports = new Set();

    function flatten(value) {
        if (value === undefined || value === null) return '';
        if (Array.isArray(value)) return value.map(flatten).join('');
        if (value.sections) return flatten(value.sections);
        if (value.type === 'CODE') return value.code;
        if (value.type === 'INSTANCE')
            return value.resultSections
                ? flatten(value.resultSections)
                : `{/* ${value.symbolId} — no Code Connect template found */}`;
        if (value.type === 'ERROR') throw new Error(value.message);
        if (
            value.$type === 'jsx-element' ||
            value.$type === 'identifier' ||
            value.$type === 'function'
        )
            return value.$value;

        return String(value);
    }
    const missing = (name) => ({
        type: 'ERROR',
        message: `Не найден ${name}`,
        executeTemplate() {
            throw new Error(this.message);
        },
    });
    // Figma exposes display names without the internal #id suffix or edge whitespace.
    const canonicalPropertyName = (name) => name.split('#')[0].trim();

    function handle(data) {
        if (data.type === 'TEXT') return { ...data, __render__: () => data.textContent };
        const children = (data.children || []).map(handle);
        const properties = Object.fromEntries(
            Object.entries(data.properties || {}).map(([key, value]) => [
                canonicalPropertyName(key),
                value && typeof value === 'object' && 'value' in value ? value : { value },
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
        function matchingPath(n, options) {
            if (!options?.path) return true;
            // The live API matches a full ancestor path, not membership in that path.
            const actual = n.path || data.path || [];

            return (
                options.path.length === actual.length &&
                options.path.every((p, i) => p === actual[i])
            );
        }
        const node = {
            ...data,
            type: data.type || 'INSTANCE',
            name: data.name || 'Fixture',
            children,
            properties,
            _search: search,
            getPropertyValue: get,
            getBoolean(name, options) {
                /*
                 * The live API returns an error object for a missing Boolean property.
                 * It must not become a truthy flag in a template.
                 */
                let value;

                try {
                    value = get(name);
                } catch {
                    return missing(name);
                }
                if (typeof value !== 'boolean') return value;

                return options ? options[String(value)] : value;
            },
            getString(name) {
                const value = get(name);

                assert.equal(typeof value, 'string');

                return value;
            },
            getEnum: (name, values) => values[get(name)],
            getInstanceSwap(name) {
                const key = Object.keys(data.swaps || {}).find(
                    (k) => canonicalPropertyName(k) === name,
                );

                return key ? handle(data.swaps[key]) : missing(name);
            },
            getSlot(name) {
                const slotKey = Object.keys(data.slots || {}).find(
                    (key) => canonicalPropertyName(key) === canonicalPropertyName(name),
                );
                const raw = slotKey === undefined ? undefined : data.slots[slotKey];

                if (!raw) return undefined;
                const slot = Array.isArray(raw) ? [...raw] : [...(raw.sections || [])];

                slot.connectedInstances = (
                    raw.connectedInstances ||
                    data.connectedSlots?.[slotKey] ||
                    data.connectedSlots?.[name] ||
                    []
                ).map(handle);
                if (!slot.connectedInstances.length)
                    slot.connectedInstances = search(
                        (n) => n.type === 'INSTANCE' && n.__containingSlotName__ === name,
                        true,
                    );

                return slot;
            },
            findInstance: (name, options) =>
                search(
                    (n) => n.type === 'INSTANCE' && n.name === name && matchingPath(n, options),
                    options?.traverseInstances,
                )[0] || missing(name),
            findText: (name, options) =>
                search(
                    (n) => n.type === 'TEXT' && n.name === name && matchingPath(n, options),
                    options?.traverseInstances,
                )[0] || missing(name),
            findLayers: (predicate, options) =>
                search((n) => predicate(n) && matchingPath(n, options), options?.traverseInstances),
            codeConnectId: () => data.codeConnectId || null,
            hasCodeConnect: () => !!(data.unresolved || data.template || data.code),
            findConnectedInstance: (id, options) =>
                search(
                    (n) => n.type === 'INSTANCE' && n.codeConnectId() === id,
                    options?.traverseInstances,
                )[0] || null,
            findConnectedInstances: (predicate, options) =>
                search((n) => n.type === 'INSTANCE' && predicate(n), options?.traverseInstances),
            executeTemplate() {
                if (data.unresolved)
                    return {
                        example: [{ type: 'INSTANCE', guid: node.name, symbolId: node.name }],
                    };
                if (data.template) {
                    let result;

                    if (runtimeOptions.directChildImportsOnly) {
                        const parentImports = childImports;

                        childImports = new Set();
                        try {
                            result = evaluate(data.template, data);
                        } finally {
                            childImports = parentImports;
                        }
                        for (const declaration of result.imports || [])
                            childImports.add(declaration);
                    } else {
                        result = evaluate(data.template, data);
                    }

                    return {
                        example: result.example.sections || result.example,
                        metadata: result.metadata,
                    };
                }
                if (!data.code) {
                    if (runtimeOptions.missingTemplateMode === 'comment')
                        return {
                            example: [
                                {
                                    type: 'CODE',
                                    code: `{/* ${node.name} — no Code Connect template found */}`,
                                },
                            ],
                            metadata: {},
                        };
                    throw new Error(`Отсутствует Code Connect: ${node.name}`);
                }
                for (const declaration of data.imports || []) childImports.add(declaration);

                return { example: [{ type: 'CODE', code: data.code }], metadata: data.metadata };
            },
        };

        return node;
    }
    // Match the public React helper semantics used by Code Connect 1.4.9.
    function renderProp(name, value) {
        if (value === undefined) return '';
        if (Array.isArray(value) || value?.sections) return ` ${name}={${flatten(value)}}`;
        if (value?.$type) return ` ${name}={${flatten(value)}}`;
        if (typeof value === 'boolean') return value ? ` ${name}` : '';
        if (typeof value === 'string') {
            const escaped = value.replaceAll('\n', '\\n').replaceAll('"', '\\"');

            return escaped ? ` ${name}="${escaped}"` : '';
        }
        if (typeof value === 'number') return ` ${name}={${value}}`;

        return '';
    }
    function evaluate(file, fixture) {
        if (!cache.has(file))
            cache.set(
                file,
                ts.transpileModule(fs.readFileSync(path.join(repo, file), 'utf8'), {
                    compilerOptions: {
                        target: ts.ScriptTarget.ES2021,
                        module: ts.ModuleKind.CommonJS,
                        esModuleInterop: true,
                    },
                }).outputText,
            );
        const tag = (strings, ...values) => ({
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
        const react = {
            renderProp,
            renderChildren: flatten,
            renderPropValue: flatten,
            jsxElement: (value) => ({ $type: 'jsx-element', $value: value }),
            identifier: (value) => ({ $type: 'identifier', $value: value }),
            function: (value) => ({ $type: 'function', $value: value }),
            stringifyObject: (value) => JSON.stringify(value),
        };
        const figma = {
            selectedInstance: handle(fixture),
            code: tag,
            tsx: tag,
            helpers: { react },
        };
        const exports = {};

        vm.runInNewContext(cache.get(file), {
            exports,
            require(name) {
                assert.equal(name, 'figma');

                return figma;
            },
        });
        for (const declaration of exports.default.imports || []) childImports.add(declaration);

        return exports.default;
    }
    function runCases(cases, output) {
        const generated = [];
        const failures = [];

        cases.forEach((test, index) => {
            try {
                const run = () => {
                    childImports = new Set();
                    const result = evaluate(test.template, test.fixture);
                    const body = flatten(result.example).trim();

                    if (runtimeOptions.missingTemplateMode === 'comment')
                        assert(
                            !body.includes('no Code Connect template found'),
                            'Потеряно неподключённое вложенное содержимое',
                        );
                    for (const expected of test.expect || [])
                        assert(body.includes(expected), `Не найдено: ${expected}`);
                    for (const unexpected of test.notExpect || [])
                        assert(
                            !body.includes(unexpected),
                            `Неожиданная подстановка: ${unexpected}`,
                        );
                    // Validate only imports declared by this template and its connected children.
                    const imports = [...childImports];

                    if (body.includes('ActualIcon'))
                        imports.push(
                            'const ActualIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />;',
                        );
                    const full = `${imports.join('\n')}\n${test.preamble || ''}\n${
                        /^(function|const|let|type|interface|export)\b/.test(body)
                            ? body
                            : `const Example = () => (${body});`
                    }`;
                    const diagnostics =
                        ts.transpileModule(full, {
                            fileName: 'example.tsx',
                            reportDiagnostics: true,
                            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
                        }).diagnostics || [];

                    assert.equal(diagnostics.length, 0, 'Некорректный синтаксис JSX');
                    const file = path.join(output, `example-${index}.tsx`);

                    fs.writeFileSync(file, `${full}\n`);
                    generated.push(file);
                };

                if (test.throws) assert.throws(run, new RegExp(test.throws));
                else run();
            } catch (error) {
                failures.push({
                    index,
                    template: test.template,
                    error: String(error.message || error),
                });
            }
        });

        return { generated, failures };
    }

    return { runCases, evaluate, flatten };
}

function checkApi(repo, snippets) {
    // Resolve TypeScript from the repository whose component API is being checked.
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const ts = require(path.join(repo, 'node_modules/typescript'));
    const paths = {
        '@alfalab/icons-glyph-26/*': [path.join(repo, 'node_modules/@alfalab/icons-glyph-26/*')],
    };

    for (const entry of fs.readdirSync(path.join(repo, 'packages'), { withFileTypes: true })) {
        if (entry.isDirectory()) {
            const source = path.join(repo, 'packages', entry.name, 'src');

            if (fs.existsSync(source)) {
                const index = ['index.ts', 'index.tsx', 'components/index.ts']
                    .map((p) => path.join(source, p))
                    .find((p) => fs.existsSync(p));

                if (index) {
                    paths[`@alfalab/core-components-${entry.name}`] = [index];
                    paths[`@alfalab/core-components/${entry.name}`] = [index];
                }
                paths[`@alfalab/core-components-${entry.name}/*`] = [path.join(source, '*')];
                paths[`@alfalab/core-components/${entry.name}/*`] = [path.join(source, '*')];
            }
        }
    }
    const program = ts.createProgram(
        [
            ...snippets,
            path.join(repo, 'packages/env/src/react-app.d.ts'),
            path.join(repo, 'packages/markdown/src/mdast-util-gfm-strikethrough.d.ts'),
            path.join(repo, 'packages/masked-input/src/text-mask-core.d.ts'),
        ],
        {
            target: ts.ScriptTarget.ES2021,
            lib: ['lib.es2023.d.ts', 'lib.dom.d.ts'],
            module: ts.ModuleKind.CommonJS,
            moduleResolution: ts.ModuleResolutionKind.Node10,
            jsx: ts.JsxEmit.ReactJSX,
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

    return { diagnostics: ts.getPreEmitDiagnostics(program), ts };
}

module.exports = { createRuntime, checkApi };
