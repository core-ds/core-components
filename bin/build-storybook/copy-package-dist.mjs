import { existsSync } from 'node:fs';
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

    const target = path.join(to, path.basename(cwd()));

    await fs.cp('dist', target, { recursive: true });

    /**
     * Dependencies from one to another package might have different major versions
     */
    if (existsSync('node_modules')) {
        await fs.cp('node_modules', path.join(target, 'node_modules'), { recursive: true });
    }
}

await main(hideBin(argv));
