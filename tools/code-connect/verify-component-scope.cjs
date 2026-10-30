const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const repo = path.resolve(__dirname, '../..');
const json = (file) => JSON.parse(fs.readFileSync(path.join(repo, file), 'utf8'));
const canonical = json('figma.config.json').codeConnect.include;
const componentFiles = [
    ...json('figma.web-core.config.json').codeConnect.include,
    ...json('figma.web-core-libraries.config.json').codeConnect.include,
];
const main = json('docs/code-connect-web-core.json');
const libraries = json('docs/code-connect-web-core-libraries.json');
const sourceFiles = new Set([main.figmaFile, ...libraries.figmaFiles.map((file) => file.fileKey)]);

assert.deepEqual([...canonical].sort(), [...new Set(componentFiles)].sort());
function validate(file, source) {
    const owner = /^packages\/([^/]+)\/code-connect\//.exec(file)?.[1];

    assert(owner, 'Code Connect template must belong to a component package');
    assert(json(`packages/${owner}/package.json`).name.startsWith('@alfalab/core-components-'));
    const rawUrl = /^\/\/ url=(\S+)/m.exec(source)?.[1];

    assert(rawUrl, 'Template must declare its Figma source');
    const url = new URL(rawUrl);
    const key = /^\/(?:design|file)\/([A-Za-z0-9]+)\//.exec(url.pathname)?.[1];

    assert(sourceFiles.has(key), 'Figma source must belong to the documented Core libraries');
    const implementation = /^\/\/ source=(.+)$/m.exec(source)?.[1];

    assert(implementation?.startsWith('packages/'), 'Code implementation must belong to Core');
}
for (const file of canonical) validate(file, fs.readFileSync(path.join(repo, file), 'utf8'));
const sample = canonical[0];
const source = fs.readFileSync(path.join(repo, sample), 'utf8');

assert.throws(
    () =>
        validate(
            sample,
            source.replace(
                /^\/\/ url=.+$/m,
                '// url=https://www.figma.com/design/foreignFile/Library?node-id=1-1',
            ),
        ),
    /documented Core libraries/,
);
assert.throws(
    () =>
        validate(
            sample,
            source.replace(/^\/\/ source=.+$/m, '// source=https://example.invalid/component.tsx'),
        ),
    /implementation must belong to Core/,
);
console.log(
    JSON.stringify({
        componentTemplates: canonical.length,
        sourceLibraries: sourceFiles.size,
        componentScope: 'passed',
        foreignSourceNegativeControls: 2,
    }),
);
