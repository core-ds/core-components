/* eslint no-param-reassign: ["error", { "props": false }] -- Mutators receive only deep-cloned synthetic smoke fixtures. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { validateScreenContext } = require('./verify-screen-context.cjs');

const iconImport = "import { ArrowLeft24Icon } from '@alfalab/icons-glyph-26/ArrowLeft24Icon';";
const profile = {
    figma: { fileKey: 'smokeFile', nodeId: '1:1' },
    theme: { name: 'Default', colorMode: 'Light', palette: 'BlueTint' },
    dependencies: {
        runtime: { package: '@alfalab/core-components', version: '50.23.0' },
        icons: { package: '@alfalab/icons-glyph-26', version: '1.36.0' },
    },
    fullFrameRequired: true,
    nodes: [
        {
            nodeId: '10:1',
            component: 'IconButtonDesktop',
            importPath: '@alfalab/core-components/icon-button/desktop',
            assetImport: iconImport,
        },
        {
            nodeId: '20:1',
            component: 'SelectDesktop',
            importPath: '@alfalab/core-components/select/desktop',
            contextual: true,
        },
        {
            nodeId: '30:1',
            component: 'TagDesktop',
            importPath: '@alfalab/core-components/tag/desktop',
            nested: true,
        },
    ],
};
const iconCode = `${iconImport}
import { IconButtonDesktop } from '@alfalab/core-components/icon-button/desktop';
export default function DIconButton() {
  return <CodeConnectSnippet data-node-id="10:1"><IconButtonDesktop icon={<ArrowLeft24Icon />} /></CodeConnectSnippet>;
}`;
const selectCode = `import { SelectDesktop } from '@alfalab/core-components/select/desktop';
function Example() { return <SelectDesktop options={[]} selected={null} />; }
export default function DSelect() {
  return <CodeConnectSnippet data-node-id="20:1"><Example /></CodeConnectSnippet>;
}`;
const tagCode = `import { TagDesktop as Pill } from '@alfalab/core-components/tag/desktop';
export default function DTagFilled() {
  return <CodeConnectSnippet data-node-id="30:1"><Pill>Tag</Pill></CodeConnectSnippet>;
}`;
const capture = {
    fileKey: 'smokeFile',
    nodeId: '1:1',
    clientFrameworks: 'React',
    fullFrame: { code: `${iconCode}\n${selectCode}` },
    nodes: [
        { nodeId: '10:1', code: iconCode },
        { nodeId: '20:1', code: selectCode },
        { nodeId: '30:1', code: tagCode },
    ],
};
let positives = 0;
let negatives = 0;
const negativeKinds = new Set();

function positive(name, mutate = () => {}) {
    const data = structuredClone(capture);
    const settings = structuredClone(profile);

    mutate(data, settings);
    const result = validateScreenContext(data, settings);

    assert.equal(result.status, 'passed', `${name}: ${JSON.stringify(result.failures)}`);
    assert.equal(result.limitations.typeScriptApiChecked, false);
    assert.equal(result.limitations.visualChecked, false);
    assert.equal(result.limitations.resolvedThemeChecked, false);
    positives += 1;

    return result;
}
function negative(name, expectedKind, mutate) {
    const data = structuredClone(capture);
    const settings = structuredClone(profile);

    mutate(data, settings);
    const result = validateScreenContext(data, settings);

    assert.equal(result.status, 'failed', `${name}: failure not detected`);
    assert(
        result.failures.some((failure) => failure.kind === expectedKind),
        `${name}: expected ${expectedKind}, got ${JSON.stringify(result.failures)}`,
    );
    negatives += 1;
    negativeKinds.add(expectedKind);
}

const baseline = positive(
    'normal wrappers, named alias, contextual helper and optional nested marker',
);

assert.equal(baseline.expectedTopLevelNodes, 2);
assert.equal(baseline.expectedNestedNodes, 1);
assert.equal(baseline.contextualNodes, 1);
assert.deepEqual(baseline.requiresProductContext, ['20:1']);
assert.equal(baseline.fullFrame.status, 'passed');

positive('arrow helper binding is reachable', (data) => {
    data.nodes[1].code = selectCode.replace(
        'function Example() { return <SelectDesktop options={[]} selected={null} />; }',
        'const Example = () => <SelectDesktop options={[]} selected={null} />;',
    );
});
positive('multi-hop named helper is reachable', (data) => {
    data.nodes[1].code = selectCode.replace(
        'function Example() { return <SelectDesktop options={[]} selected={null} />; }',
        'function Inner() { return <SelectDesktop options={[]} selected={null} />; } const Example = () => <Inner />;',
    );
});
positive('asset named alias is accepted', (data) => {
    data.nodes[0].code = iconCode
        .replace(
            iconImport,
            "import { ArrowLeft24Icon as BackIcon } from '@alfalab/icons-glyph-26/ArrowLeft24Icon';",
        )
        .replace('<ArrowLeft24Icon />', '<BackIcon />');
});
positive('exact old glyph mapping stays valid', (data, settings) => {
    const old =
        "import { DotsThreeVerticalMIcon } from '@alfalab/icons-glyph/DotsThreeVerticalMIcon';";

    settings.nodes[0].assetImport = old;
    data.nodes[0].code = iconCode
        .replace(iconImport, old)
        .replace('<ArrowLeft24Icon />', '<DotsThreeVerticalMIcon />');
    data.fullFrame.code = `${data.nodes[0].code}\n${selectCode}`;
});
positive('MCP options form is accepted', (data) => {
    data.nodes[0].code = iconCode.replace(
        '<CodeConnectSnippet data-node-id="10:1"><IconButtonDesktop icon={<ArrowLeft24Icon />} /></CodeConnectSnippet>',
        '<CodeConnectSnippet data-node-id="10:1" options={[<IconButtonDesktop icon={<ArrowLeft24Icon />} />]} />',
    );
});
positive('comment mentioning prohibited CSS is not an import', (data) => {
    data.nodes[0].code += "\n// Do not import '@alfalab/core-components-themes/corp.css'.";
});
positive('hyphen node IDs match colon IDs', (data) => {
    data.nodeId = '1-1';
    data.nodes[0].nodeId = '10-1';
    data.nodes[0].code = iconCode.replace('10:1', '10-1');
});

negative('missing required full frame', 'missing-code', (data) => {
    delete data.fullFrame;
});
negative('frame is a connection gate', 'connection-gate', (data) => {
    data.fullFrame.code =
        'Some Figma design components are not connected to your codebase with Code Connect. Would you like to connect code components to the Figma design?';
});
negative('full frame omits a top-level marker', 'missing-node-marker', (data) => {
    data.fullFrame.code = iconCode;
});
negative(
    'nested marker becomes required when configured as top-level',
    'missing-node-marker',
    (data, settings) => {
        settings.nodes[2].nested = false;
    },
);
negative('capture misses an expected node', 'missing-captured-node', (data) => {
    data.nodes.pop();
});
negative('capture has duplicate node IDs', 'duplicate-captured-node', (data) => {
    data.nodes.push(structuredClone(data.nodes[0]));
});
negative('wrong Figma file', 'figma-identity-mismatch', (data) => {
    data.fileKey = 'anotherFile';
});
negative('wrong framework label', 'framework-mismatch', (data) => {
    data.clientFrameworks = 'unknown';
});
negative('default import does not satisfy named mapping', 'missing-component-import', (data) => {
    data.nodes[2].code = tagCode.replace('import { TagDesktop as Pill }', 'import Pill');
});
negative(
    'type-only import does not satisfy component mapping',
    'missing-component-import',
    (data) => {
        data.nodes[2].code = tagCode.replace('import {', 'import type {');
    },
);
negative('wrong component module', 'missing-component-import', (data) => {
    data.nodes[2].code = tagCode.replace('/tag/desktop', '/tag/mobile');
});
negative('marker points to another node', 'missing-node-marker', (data) => {
    data.nodes[2].code = tagCode.replace('30:1', '30:99');
});
negative('expected component outside marker is insufficient', 'missing-connected-jsx', (data) => {
    data.nodes[2].code = `import { TagDesktop as Pill } from '@alfalab/core-components/tag/desktop';
function Unrelated() { return <Pill />; }
export default function DTagFilled() { return <CodeConnectSnippet data-node-id="30:1"><div /></CodeConnectSnippet>; }`;
});
negative('unrelated helper does not make Core reachable', 'missing-connected-jsx', (data) => {
    data.nodes[1].code = selectCode.replace(
        'function Example() { return <SelectDesktop options={[]} selected={null} />; }',
        'function Unrelated() { return <SelectDesktop options={[]} selected={null} />; } function Example() { return <div />; }',
    );
});
negative('unused nested declaration is not reachable', 'missing-connected-jsx', (data) => {
    data.nodes[1].code = selectCode.replace(
        'function Example() { return <SelectDesktop options={[]} selected={null} />; }',
        'function Example() { function Unused() { return <SelectDesktop options={[]} selected={null} />; } return <div />; }',
    );
});
negative('helper cycles terminate without finding Core', 'missing-connected-jsx', (data) => {
    data.nodes[1].code = selectCode.replace(
        'function Example() { return <SelectDesktop options={[]} selected={null} />; }',
        'function A() { return <B />; } function B() { return <A />; } const Example = () => <A />;',
    );
});
negative(
    'non-contextual mapping requires direct Core JSX',
    'missing-connected-jsx',
    (data, settings) => {
        settings.nodes[1].contextual = false;
    },
);
negative('Logic Instance placeholder', 'unresolved-code-connect', (data) => {
    data.nodes[0].code = iconCode.replace(
        '<ArrowLeft24Icon />',
        '{/* Code Connect Logic Instance */}',
    );
});
negative('missing template placeholder', 'unresolved-code-connect', (data) => {
    data.nodes[2].code += '\n// no Code Connect template found';
});
negative('unrenderable slot placeholder', 'unresolved-code-connect', (data) => {
    data.nodes[2].code += '\n// Slot Content cannot be rendered';
});
negative('Figma arrow attribute fallback', 'figma-property-fallback', (data) => {
    data.nodes[1].code = selectCode.replace('options={[]}', '↳Label={true} options={[]}');
});
negative('Figma state attribute fallback', 'figma-property-fallback', (data) => {
    data.nodes[1].code = selectCode.replace('options={[]}', 'filledState="False" options={[]}');
});
for (const module of [
    'packages/tag/src/Component.tsx',
    './Tag.tsx',
    '../Tag.tsx',
    'https://github.com/example/repo/Tag.tsx',
]) {
    negative(`source import ${module}`, 'source-import', (data) => {
        data.nodes[2].code = tagCode.replace('@alfalab/core-components/tag/desktop', module);
    });
}
negative('Corp CSS import under Default', 'corp-theme-in-default', (data) => {
    data.fullFrame.code += "\nimport '@alfalab/core-components-themes/corp.css';";
});
negative('Corp CSS require under Default', 'corp-theme-in-default', (data) => {
    data.fullFrame.code += "\nrequire('@alfalab/core-components/themes/corp.css');";
});
negative('Corp CSS @import in style template under Default', 'corp-theme-in-default', (data) => {
    data.fullFrame.code += '\nconst style = `@import "@alfalab/core-components-themes/corp.css";`;';
});
negative('asset import is required', 'missing-asset-import', (data) => {
    data.nodes[0].code = iconCode.replace(iconImport, '');
});
negative(
    'wrong glyph family is not substituted for the exact profile import',
    'missing-asset-import',
    (data) => {
        data.nodes[0].code = iconCode.replace('@alfalab/icons-glyph-26/', '@alfalab/icons-glyph/');
    },
);
negative('inline SVG helper instead of imported asset', 'inline-svg-asset', (data) => {
    data.nodes[0].code = `${iconCode.replace(
        '<ArrowLeft24Icon />',
        '<LocalAsset />',
    )}\nfunction LocalAsset() { return <svg width="24" height="24"><path d="M0 0" /></svg>; }`;
});
negative('unquoted Corp CSS @import under Default', 'corp-theme-in-default', (data) => {
    data.fullFrame.code +=
        '\nconst style = `@import url(@alfalab/core-components-themes/corp.css);`;';
});
negative('incomplete environment profile is rejected', 'invalid-profile', (data, settings) => {
    delete settings.dependencies.icons.version;
});
negative('assetImport cannot carry unrelated code', 'invalid-asset-import', (data, settings) => {
    settings.nodes[0].assetImport += '\nconst unrelated = 1;';
});
negative('unused asset import alone is insufficient', 'unused-asset-import', (data) => {
    data.nodes[0].code = iconCode.replace('<ArrowLeft24Icon />', '<span />');
});
negative(
    'Core symbol shadowed by a local binding is not the imported component',
    'missing-connected-jsx',
    (data) => {
        data.nodes[2].code = tagCode.replace(
            'return <CodeConnectSnippet',
            'const Pill = () => <span />; return <CodeConnectSnippet',
        );
    },
);

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'screen-context-smoke-'));
let cliChecks = 0;

try {
    const capturePath = path.join(temporary, 'capture.json');
    const profilePath = path.join(temporary, 'profile.json');
    const outputPath = path.join(temporary, 'result.json');
    const command = path.join(__dirname, 'verify-screen-context.cjs');

    fs.writeFileSync(capturePath, JSON.stringify(capture));
    fs.writeFileSync(profilePath, JSON.stringify(profile));
    const good = spawnSync(
        process.execPath,
        [command, '--capture', capturePath, '--profile', profilePath, '--output', outputPath],
        { encoding: 'utf8' },
    );

    assert.equal(good.status, 0, good.stderr || good.stdout);
    assert.equal(JSON.parse(good.stdout).status, 'passed');
    assert.equal(JSON.parse(fs.readFileSync(outputPath, 'utf8')).status, 'passed');
    cliChecks += 1;
    const broken = structuredClone(capture);

    delete broken.fullFrame;
    fs.writeFileSync(capturePath, JSON.stringify(broken));
    const bad = spawnSync(
        process.execPath,
        [command, '--capture', capturePath, '--profile', profilePath],
        { encoding: 'utf8' },
    );

    assert.equal(bad.status, 1);
    assert.equal(JSON.parse(bad.stdout).status, 'failed');
    cliChecks += 1;
} finally {
    fs.rmSync(temporary, { recursive: true, force: true });
}

console.log(
    JSON.stringify({
        syntheticSmokeFixtures: true,
        positives,
        negatives,
        negativeKinds: [...negativeKinds].sort(),
        cliChecks,
        networkRequests: 0,
        typeScriptApiChecked: false,
        visualChecked: false,
        status: 'passed',
    }),
);
