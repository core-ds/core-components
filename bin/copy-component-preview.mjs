import fs from 'fs/promises';

import { globby } from 'globby';
import path from 'node:path';
import * as process from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = await yargs(hideBin(process.argv))
    .option('to', {
        description: 'Destination path',
        type: 'string',
    })
    .demandOption('to')
    .parse();

async function main() {
    const previews = await globby('src/**/*-preview-snap.png');

    await Promise.all(
        previews.map((previewPath) => {
            const targetPath = path.join(argv.to, path.basename(previewPath));

            return fs.cp(previewPath, targetPath);
        }),
    );
}

await main();
