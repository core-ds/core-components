import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { $ } from '../../tools/execa.mjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));

    // clean
    await Promise.all([
        $('rimraf', ['package-sizes.json']),
        $('yarn', [
            'workspaces',
            'foreach',
            '-Ap',
            ...IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
            'exec',
            'rimraf',
            'package-size.json',
        ]),
    ]);

    await $(
        'yarn',
        [
            'workspaces',
            'foreach',
            '-Ap',
            ...IGNORED_PACKAGES.flatMap((pkg) => ['--exclude', pkg]),
            'exec',
            'node',
            path.join(dirname, 'analyze-and-report.mjs'),
        ],
        { preferLocal: true, stderr: 'inherit' },
    ).pipe('node', [path.join(dirname, 'generate-report.mjs')], {
        stderr: 'inherit',
        stdout: { file: 'package-sizes.json' },
    });
}

await main();
