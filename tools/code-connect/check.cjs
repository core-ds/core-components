const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const repo = path.resolve(__dirname, '../..');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'code-connect-check-'));
const env = { ...process.env };

delete env.FIGMA_ACCESS_TOKEN;
const configs = [
    ['hedging', 'figma.hedging.config.json', 'tsconfig.code-connect.json'],
    ['web-core', 'figma.web-core.config.json', 'tsconfig.web-core-code-connect.json'],
    [
        'libraries',
        'figma.web-core-libraries.config.json',
        'tsconfig.web-core-libraries-code-connect.json',
    ],
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
try {
    for (const [name, config, tsconfig] of configs) {
        run(['node_modules/typescript/bin/tsc', '-p', tsconfig]);
        run([
            'node_modules/@figma/code-connect/bin/figma',
            'connect',
            'parse',
            '--config',
            config,
            '--skip-update-check',
            '--exit-on-unreadable-files',
            '--outFile',
            path.join(output, `${name}.json`),
        ]);
        console.log(`Code Connect ${name}: TypeScript and parse passed`);
    }
    for (const verifier of [
        'verify-hedging.cjs',
        'verify-web-core.cjs',
        'verify-web-core-libraries.cjs',
    ]) {
        const result = run([path.join(__dirname, verifier)]);

        process.stdout.write(result);
    }
} catch (error) {
    process.exitCode = error.status || 1;
} finally {
    fs.rmSync(output, { recursive: true, force: true });
}
