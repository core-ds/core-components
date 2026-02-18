import { toPlatformPath } from '@actions/core';
import { getExecOutput } from '@actions/exec';
import dedent from 'dedent';
import fs from 'node:fs/promises';
import path from 'node:path';
import * as process from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { getPackages } from '../tools/monorepo.cjs';

/**
 * @param {string} pkg
 */
function bin(pkg) {
    return path.join(process.cwd(), toPlatformPath(`node_modules/.bin/${pkg}`));
}

async function main() {
    const { packages } = getPackages();
    const argv = await yargs(hideBin(process.argv))
        .option('include', {
            type: 'array',
            description: 'Included packages to generate tsconfig for',
            choices: packages.map(({ packageJson: { name } }) => name),
            demandOption: true,
        })
        .strict()
        .parse();

    const result = new Set(argv.include);

    do {
        const { size } = result;

        packages.forEach(({ packageJson: { name, dependencies } }) => {
            if (
                !result.has(name) &&
                dependencies &&
                Object.keys(dependencies).some((dependency) => result.has(dependency))
            ) {
                result.add(name);
            }
        });

        if (size === result.size) {
            break;
        }
        // eslint-disable-next-line no-constant-condition
    } while (true);

    const changeset = await getExecOutput(bin('changeset'), ['--empty'], { silent: true });
    // matches '🦋  info file' string
    const [, file] = changeset.stdout.match(/^\ud83e\udd8b\s+info\s+(.*)$/m);

    const content = dedent`---
                           ${Array.from(result)
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

await main();
