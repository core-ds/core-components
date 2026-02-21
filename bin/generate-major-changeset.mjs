import { getExecOutput } from '@actions/exec';
import dedent from 'dedent';
import fs from 'node:fs/promises';
import path from 'node:path';
import * as process from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { getPackages } from '../tools/monorepo.cjs';

/**
 * @param {Array<import('@manypkg/get-packages').Package>} packages
 * @param {Array<string>} include
 * @returns {Array<string>}
 */
function includeDependents(packages, include) {
    /**
     * @type {number}
     */
    let size;
    const set = new Set(include);

    do {
        ({ size } = set);

        packages.forEach(({ packageJson: { name, dependencies, peerDependencies } }) => {
            if (
                !set.has(name) &&
                Object.keys({ ...dependencies, ...peerDependencies }).some((dependency) =>
                    set.has(dependency),
                )
            ) {
                set.add(name);
            }
        });
    } while (set.size !== size);

    return Array.from(set);
}

async function main() {
    const { packages } = getPackages();
    const argv = await yargs(hideBin(process.argv))
        .option('include', {
            type: 'array',
            description: 'Included packages to generate changeset for',
            choices: packages.map(({ packageJson: { name } }) => name),
            demandOption: true,
        })
        .strict()
        .parse();
    const changeset = await getExecOutput('yarn', ['changeset', '--empty'], { silent: true });
    // matches '🦋  info file' string
    const match = changeset.stdout.match(/^\ud83e\udd8b\s+info\s+(.*)$/m);

    if (match) {
        const [, file] = match;
        const names = includeDependents(packages, argv.include);

        const content = dedent`
        ---
        ${names
            .sort((a, b) => a.localeCompare(b))
            .map((name) => `'${name}': major`)
            .join('\n')}
        ---

        TODO: Changeset description
        `.concat('\n');

        await fs.writeFile(file, content, { encoding: 'utf8' });

        console.log(`Changeset added: ${path.relative(process.cwd(), file)}`);
    } else {
        console.error('Changeset is not found');
        process.exit(1);
    }
}

await main();
