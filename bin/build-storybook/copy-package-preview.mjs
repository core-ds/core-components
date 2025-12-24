import fs from 'node:fs/promises';
import path from 'node:path';
import { argv, env } from 'node:process';
import { glob } from 'tinyglobby';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * @param {string[]} args
 */
async function main(args) {
    const CORE_COMPONENTS_VARIANT = env.CORE_COMPONENTS_VARIANT || 'default';

    const { to } = await yargs(args)
        .option('to', {
            type: 'string',
            demandOption: true,
            description: 'Destination directory for the preview',
        })
        .parse();

    const previews = await glob(
        `src/**/*-preview${CORE_COMPONENTS_VARIANT === 'default' ? '' : `-${CORE_COMPONENTS_VARIANT}`}-snap.png`,
        { absolute: true },
    );

    await Promise.all(
        previews.map((preview) => {
            const targetPath = path.join(to, path.basename(preview));

            return fs.cp(preview, targetPath);
        }),
    );
}

await main(hideBin(argv));
