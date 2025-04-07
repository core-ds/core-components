module.exports = async ({ core, inputs }) => {
    const { default: readChangesets } = await import('@changesets/read');

    const changesets = await readChangesets(process.cwd());

    if (changesets.length === 0) {
        core.setOutput('published', 'false');

        return;
    }

    const versionScript = inputs['version'];
    const publishScript = inputs['publish'];

    const [versionCmd, ...versionCmdArgs] = versionScript.split(/\s+/);

    await exec.exec(versionCmd, versionCmdArgs, { failOnStdErr: true });

    const [publishCmd, ...publishCmdArgs] = publishScript.split(/\s+/);
    const publishResult = await exec.getExecOutput(publishCmd, publishCmdArgs, {
        failOnStdErr: true,
    });
    const publishedPackages = publishResult.stdout.split('\n').reduce((packages, line) => {
        const match = line.match(/^(@[^/\s]+\/[^@]+|[^/\s]+)@([^\s]+)$/);

        if (match) {
            const [, name, version] = match;

            packages.push({ name, version });
        }

        return packages;
    }, []);

    if (publishedPackages.length > 0) {
        core.setOutput('published', 'true');
        core.setOutput('published-packages', JSON.stringify(publishedPackages));
    }
};
