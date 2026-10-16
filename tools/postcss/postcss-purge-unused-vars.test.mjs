import assert from 'node:assert/strict';
import { test } from 'node:test';
import postcss from 'postcss';

import postcssPurgeUnusedVars from './postcss-purge-unused-vars.cjs';

const processCss = async (css, plugin = postcssPurgeUnusedVars()) =>
    (await postcss([plugin]).process(css, { from: undefined })).root;

const getVariables = (root) => {
    const variables = new Map();

    root.walkDecls(/^--/, ({ prop, value }) => variables.set(prop, value));

    return variables;
};

test('keeps keyframe variables and forward dependencies, but removes unused tokens', async () => {
    const root = await processCss(`
        :root {
            --reject-color: var(--alias);
            --alias: var(--negative);
            --negative: #ff0000;
            --unused: #ffffff;
        }
        .inputReject { animation: reject 0.3s; }
        .other { display: block; }
        @keyframes reject { from { background-color: var(--reject-color); } }
    `);

    assert.deepEqual(
        [...getVariables(root)],
        [
            ['--reject-color', 'var(--alias)'],
            ['--alias', 'var(--negative)'],
            ['--negative', '#ff0000'],
        ],
    );
    assert.match(root.toString(), /\.other\s*\{/);
    assert.match(root.toString(), /@keyframes reject/);
});

test('keeps nested fallback variables and whitespace inside var()', async () => {
    const root = await processCss(`
        :root { --fallback: var( --color ); --color: red; --unused: blue; }
        @keyframes reject {
            from { background: var( --missing, var(--fallback)); }
        }
    `);

    assert.deepEqual([...getVariables(root).keys()], ['--fallback', '--color']);
});

test('keeps variables in prefixed keyframes', async () => {
    const root = await processCss(`
        :root { --offset: 10px; --unused: 20px; }
        @-webkit-keyframes slide { to { transform: translateX(var(--offset)); } }
    `);

    assert.deepEqual([...getVariables(root).keys()], ['--offset']);
});

test('follows every declaration of a token and terminates on cyclic dependencies', async () => {
    const root = await processCss(`
        :root { --reject: var(--light); --light: var(--reject); }
        .dark { --reject: var(--dark); --dark: red; --unused: blue; }
        @keyframes reject { from { color: var(--reject); } }
    `);

    assert.deepEqual([...getVariables(root).keys()], ['--reject', '--light', '--dark']);
});

test('preserves normal usages and does not leak keyframe variables between files', async () => {
    const plugin = postcssPurgeUnusedVars();

    await processCss(
        `
        :root { --reject: red; }
        @keyframes reject { from { color: var(--reject); } }
    `,
        plugin,
    );

    const root = await processCss(
        `
        :root { --reject: red; --text: black; }
        .text { color: var(--text); }
    `,
        plugin,
    );

    assert.deepEqual([...getVariables(root)], [['--text', 'black']]);
});
