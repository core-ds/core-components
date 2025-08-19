import { execa } from 'execa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const options = {
        stdout: ['inherit', { file: 'package-size.json' }],
        stderr: 'inherit',
    };

    await execa('node', [path.join(dirname, 'analyze-package-size.mjs')], options);
}

await main();
