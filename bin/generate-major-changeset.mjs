import { toPlatformPath } from '@actions/core';
import { getExecOutput } from '@actions/exec';
import dedent from 'dedent';
import fs from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd } from 'node:process';
import { hideBin } from 'yargs/helpers';

/**
 * @param {string} pkg
 */
function bin(pkg) {
    return path.join(cwd(), toPlatformPath(`node_modules/.bin/${pkg}`));
}

async function main(args) {
    const changeset = await getExecOutput(bin('changeset'), ['--empty'], { silent: true });
    // matches '🦋  info file' string
    const [, file] = changeset.stdout.match(/^\ud83e\udd8b\s+info\s+(.*)$/m);
    const lerna = await getExecOutput(
        bin('lerna'),
        [
            'ls',
            ...args,
            /**
             * Include all transitive dependencies when running a command regardless of --scope, --ignore, or --since
             *
             * @see https://lerna.js.org/docs/api-reference/commands#--include-dependencies
             */
            '--include-dependents',
        ],
        {
            silent: true,
        },
    );
    const content = dedent`---
                           ${lerna.stdout
                               .trim()
                               .split(/\s+/)
                               .sort((a, b) => a.localeCompare(b))
                               .map((name) => `'${name}': major`)
                               .join('\n')}
                           ---

                           TODO: Changeset description
                           `.concat('\n');

    await fs.writeFile(file, content, { encoding: 'utf8' });

    console.log('Changeset added!');
    console.log(`info ${file}`);
}

await main(hideBin(argv));
