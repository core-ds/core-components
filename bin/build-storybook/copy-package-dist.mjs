import fs from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd } from 'node:process';
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
            description: 'Destination directory for the dist',
        })
        .parse();

    const basename = path.basename(cwd());

    await fs.cp('dist', path.join(to, basename), { recursive: true });
}

await main(hideBin(argv));
