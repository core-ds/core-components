import { globby } from 'globby';
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
            description: 'Destination directory for css files',
        })
        .parse();

    const cssFiles = await globby('src/**/*.css');

    await Promise.all(
        cssFiles.map((cssFile) => {
            const [rootDir] = cssFile.split(path.sep);
            const targetPath = path.join(to, path.relative(path.resolve(cwd(), rootDir), cssFile));

            return fs.cp(cssFile, targetPath);
        }),
    );
}

await main(hideBin(argv));
