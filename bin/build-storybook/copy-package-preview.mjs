import fs from 'node:fs/promises';
import path from 'node:path';
import { argv } from 'node:process';
import { glob } from 'tinyglobby';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * @param {string[]} args
 */
async function main(args) {
    const { to } = await yargs(args)
        .option('to', {
            type: 'string',
            demandOption: true,
            description: 'Destination directory for the preview',
        })
        .parse();

    const previews = await glob('src/**/*-preview-snap.png', { absolute: true });

    await Promise.all(
        previews.map((preview) => {
            const targetPath = path.join(to, path.basename(preview));

            return fs.cp(preview, targetPath);
        }),
    );
}

await main(hideBin(argv));
