module.exports = async ({ exec, inputs }) => {
    const assert = require('node:assert/strict');
    const path = require('node:path');

    const version = inputs['version'];
    const pullRequestNumber = inputs['pull-request-number'];

    if (version === '') {
        if (pullRequestNumber === '') {
            switch (process.env.GITHUB_REF_NAME) {
                case 'master':
                case 'beta':
                case 'next':
                    return process.env.GITHUB_REF_NAME;
                default:
                    throw new Error(
                        `Resolving dir for unsupported branch: ${process.env.GITHUB_REF_NAME}`,
                    );
            }
        } else {
            assert(/^\d+$/.test(pullRequestNumber));

            return pullRequestNumber;
        }
    } else if (/^\d+\.\d+\.\d+$/.test(version)) {
        return version;
    }

    async function git(args) {
        const { stdout } = await exec.getExecOutput('git', args, {
            failOnStdErr: true,
            cwd: path.join(process.env.GITHUB_WORKSPACE, 'checkout-ref'),
        });

        return stdout;
    }

    let sha;

    if (version.startsWith('@balafla/core-components-')) {
        const output = (await git(['rev-list', '-n', '1', version])).trim();

        assert(output.length > 0);

        sha = output;
    } else {
        sha = version;
    }

    const tags = (await git(['tag', '--points-at', sha])).split('\n');

    for (const tag of tags) {
        const match = tag.match(/^v(\d+\.\d+\.\d+)$|^@balafla\/core-components@(\d+\.\d+\.\d+.*)$/);

        if (match) {
            const [, v1, v2] = match;
            return `v${v1 ?? v2}`;
        }
    }

    return sha;
};
