const { existsSync } = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path');
const { default: readChangesets } = require('@changesets/read');

module.exports = async ({ core, exec, inputs }) => {
    const changesets = await core.group('Reading changesets', () => readChangesets(process.cwd()));

    if (changesets.length === 0) {
        core.warning("Didn't find any changeset. Nothing to publish");

        core.setOutput('published', 'false');

        return;
    }

    await core.group('Version packages', async () => {
        const versionScript = inputs['version'];
        const [versionCmd, ...versionCmdArgs] = versionScript.split(/\s+/);

        await exec.exec(versionCmd, versionCmdArgs);
    });

    await core.group('Setup .npmrc', async () => {
        const userNpmrcPath = path.join(process.env.HOME, '.npmrc');

        if (existsSync(userNpmrcPath)) {
            core.info('Found existing user .npmrc file');
            const userNpmrcContent = await fs.readFile(userNpmrcPath, { encoding: 'utf8' });
            const hasAuthLine = userNpmrcContent.split('\n').some((line) =>
                // check based on https://github.com/npm/cli/blob/8f8f71e4dd5ee66b3b17888faad5a7bf6c657eed/test/lib/adduser.js#L103-L105
                /^\s*\/\/registry\.npmjs\.org\/:[_-]authToken=/i.test(line),
            );

            if (hasAuthLine) {
                core.info('Found existing auth token for the npm registry in the user .npmrc file');
            } else {
                core.info(
                    "Didn't find existing auth token for the npm registry in the user .npmrc file, creating one",
                );
                await fs.appendFile(
                    userNpmrcPath,
                    `\n//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`,
                    { encoding: 'utf8' },
                );
            }
        } else {
            core.info('No user .npmrc file found, creating one');
            await fs.writeFile(
                userNpmrcPath,
                `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`,
                { encoding: 'utf8' },
            );
        }
    });

    const publishedPackages = await core.group('Publishing packages', async () => {
        const publishScript = inputs['publish'];
        const [publishCmd, ...publishCmdArgs] = publishScript.split(/\s+/);
        const { stdout } = await exec.getExecOutput(publishCmd, publishCmdArgs);

        // text from https://github.com/changesets/changesets/blob/dc83cb4dce0de726ca70593d4bef6f3f2c3d5278/packages/cli/src/commands/publish/index.ts#L91
        const successText = 'packages published successfully:';
        const startIndex = stdout.indexOf(successText);

        if (startIndex === -1) {
            core.warning('No packages published successfully');

            return [];
        }

        // text from https://github.com/changesets/changesets/blob/dc83cb4dce0de726ca70593d4bef6f3f2c3d5278/packages/cli/src/commands/publish/index.ts#L112
        const failedText = 'packages failed to publish:';
        let endIndex = stdout.indexOf(failedText);

        if (endIndex === -1) {
            endIndex = stdout.length;
        }

        return stdout
            .slice(startIndex, endIndex)
            .split('\n')
            .reduce((packages, line) => {
                // regexp based on https://github.com/changesets/action/blob/06245a4e0a36c064a573d4150030f5ec548e4fcc/src/run.ts#L139
                const match = line.match(/(@[^/\s]+\/[^@]+|[^/\s]+)@([^\s]+)/);

                if (match) {
                    const [, name, version] = match;

                    packages.push({ name, version });
                }

                return packages;
            }, []);
    });

    core.setOutput('published', JSON.stringify(publishedPackages.length > 0));
    core.setOutput('published-packages', JSON.stringify(publishedPackages));
};
