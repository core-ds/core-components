const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { URL } = require('node:url');

const repo = path.resolve(__dirname, '../..');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'code-connect-check-'));
const env = { ...process.env };

delete env.FIGMA_ACCESS_TOKEN;
const configs = [
    ['canonical', 'figma.config.json'],
    ['hedging', 'figma.hedging.config.json'],
    ['web-core', 'figma.web-core.config.json'],
    ['libraries', 'figma.web-core-libraries.config.json'],
];
const tsconfigs = [
    'tsconfig.code-connect.json',
    'tsconfig.web-core-code-connect.json',
    'tsconfig.web-core-libraries-code-connect.json',
];

function run(args) {
    try {
        return execFileSync(process.execPath, args, {
            cwd: repo,
            env,
            stdio: 'pipe',
            maxBuffer: 16 * 1024 * 1024,
        });
    } catch (error) {
        if (error.stdout) process.stdout.write(error.stdout);
        if (error.stderr) process.stderr.write(error.stderr);
        throw error;
    }
}
function validateParsedConfig(config, parsedFile) {
    const { codeConnect } = JSON.parse(fs.readFileSync(path.join(repo, config), 'utf8'));
    const { include } = codeConnect;

    assert(Array.isArray(include), `${config}: include must be an explicit array`);
    assert.equal(new Set(include).size, include.length, `${config}: duplicate include entries`);

    const connections = JSON.parse(fs.readFileSync(parsedFile, 'utf8'));

    assert(Array.isArray(connections), `${config}: parse must return an array`);
    assert.equal(
        connections.length,
        include.length,
        `${config}: parsed count differs from include`,
    );

    const identities = new Set();

    for (const connection of connections) {
        assert.equal(
            connection.templateData?.isParserless,
            true,
            `${config}: legacy parser output`,
        );
        assert(
            typeof connection.template === 'string' && connection.template.trim().length > 0,
            `${config}: empty template`,
        );
        assert.equal(typeof connection.figmaNode, 'string', `${config}: missing Figma URL`);

        const url = new URL(connection.figmaNode);

        assert(
            url.origin === 'https://www.figma.com' || url.origin === 'https://figma.com',
            `${config}: invalid Figma URL ${connection.figmaNode}`,
        );

        const file = url.pathname.match(
            /^\/(?:design|file)\/([A-Za-z0-9]+)(?:\/branch\/([A-Za-z0-9]+))?(?:\/|$)/,
        );
        const nodeId = url.searchParams.get('node-id');

        assert(file, `${config}: missing Figma file key`);
        assert(nodeId && /^\d+[:-]\d+$/.test(nodeId), `${config}: invalid Figma node-id`);

        const identity = JSON.stringify([
            file[2] || file[1],
            nodeId.replace('-', ':'),
            connection.label || '',
        ]);

        assert(!identities.has(identity), `${config}: duplicate file/node/label ${identity}`);
        identities.add(identity);
    }

    return connections.length;
}

try {
    for (const tsconfig of tsconfigs) {
        run(['node_modules/typescript/bin/tsc', '-p', tsconfig]);
        console.log(`Code Connect ${tsconfig}: TypeScript passed`);
    }
    for (const [name, config] of configs) {
        const parsedFile = path.join(output, `${name}.json`);

        run([
            'node_modules/@figma/code-connect/bin/figma',
            'connect',
            'parse',
            '--config',
            config,
            '--skip-update-check',
            '--exit-on-unreadable-files',
            '--outFile',
            parsedFile,
        ]);
        const count = validateParsedConfig(config, parsedFile);

        console.log(`Code Connect ${name}: parse passed (${count} templates)`);
    }
    for (const verifier of [
        'verify-hedging.cjs',
        'verify-web-core.cjs',
        'verify-web-core-libraries.cjs',
        'verify-nesting.cjs',
        'verify-diamonds.cjs',
        'verify-select-anatomy.cjs',
        'verify-screen-icons.cjs',
        'verify-screen-context-smoke.cjs',
    ]) {
        const result = run([path.join(__dirname, verifier)]);

        process.stdout.write(result);
    }
} catch (error) {
    process.exitCode = error.status || 1;
} finally {
    fs.rmSync(output, { recursive: true, force: true });
}
