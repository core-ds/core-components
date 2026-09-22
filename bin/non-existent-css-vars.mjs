import { globbyStream } from 'globby';
import fs from 'node:fs/promises';
import { EOL } from 'node:os';
import { pipeline } from 'node:stream/promises';
import postcss from 'postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import slash from 'slash';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import config from '../postcss.config.js';

await yargs(hideBin(process.argv))
    .command(
        '$0',
        'Search non-existent css vars',
        (y) =>
            y
                .option('ignore', { type: 'array', description: 'Ignored files', default: [] })
                .coerce('ignore', (args) => args.map(String)),
        (argv) =>
            main(
                argv._.map((v) => slash(`${v}`)),
                argv.ignore,
            ),
    )
    .parse();

/**
 * @param {string[]} patterns
 * @param {string[]} [ignore]
 * @returns {Promise<void>}
 */
async function main(patterns, ignore = []) {
    const preset = postcss([...config.plugins, postcssCustomProperties({ preserve: false })]);

    await pipeline(
        globbyStream(patterns, { ignore, absolute: true }),
        async function* handle(files) {
            for await (const file of files) {
                const content = await fs.readFile(file, { encoding: 'utf8' });
                const { css } = await preset.process(content, { from: file });
                const match = css.match(/(?<=var\(\s*)\S+(?=\s*\))/g);

                if (match) {
                    /**
                     * @type {[string, string[]]}
                     */
                    const result = [file, Array.from(match)];

                    yield result;
                }
            }
        },
        async function* print(results) {
            let exitCode = null;

            for await (const [file, variables] of results) {
                if (exitCode === null) {
                    exitCode = 1;
                    yield `Found non-existent css vars:${EOL}`;
                }
                yield `${' '.repeat(4)}${file}${EOL}`;
                for (const variable of variables) {
                    yield `${' '.repeat(8)}${variable}${EOL}`;
                }
            }

            process.exitCode = exitCode;
        },
        process.stdout,
    );
}
