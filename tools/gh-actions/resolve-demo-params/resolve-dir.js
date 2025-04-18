module.exports = async ({ context, core, exec, inputs }) => {
    const path = require('node:path');
    const semver = require('semver');

    async function git(args) {
        const { stdout } = await exec.getExecOutput('git', args, {
            cwd: path.join(process.env.GITHUB_WORKSPACE, 'checkout-ref'),
        });

        return stdout;
    }

    function demoDirName(coreComponentsVersion) {
        return `v${semver.clean(coreComponentsVersion)}`;
    }

    const HEADS_PREFIX = 'refs/heads/';
    const TAGS_PREFIX = 'refs/tags/';
    // regexp based on https://github.com/changesets/action/blob/06245a4e0a36c064a573d4150030f5ec548e4fcc/src/run.ts#L139
    const PACKAGE_TAG_REGEXP = /(@[^/\s]+\/[^@]+|[^/\s]+)@([^\s]+)/;

    const dirInput = inputs['dir'];

    if (dirInput === '') {
        let versionInput = inputs['version'];
        let unsupportedRef = false;

        if (versionInput === context.ref) {
            if (context.ref.startsWith(HEADS_PREFIX)) {
                const refName = context.ref.replace(HEADS_PREFIX, '');

                switch (refName) {
                    case 'master':
                    case 'beta':
                    case 'next':
                        return refName;
                }

                unsupportedRef = true;
            } else if (context.ref.startsWith(TAGS_PREFIX)) {
                const tagName = context.ref.replace(TAGS_PREFIX, '');
                const tagMatch = tagName.match(PACKAGE_TAG_REGEXP);

                if (tagMatch) {
                    const [, pkgName] = tagMatch;

                    if (pkgName.startsWith('@alfalab/core-components')) {
                        versionInput = tagName;
                    } else {
                        unsupportedRef = true;
                    }
                } else {
                    unsupportedRef = true;
                }
            }
        }

        if (unsupportedRef) {
            core.setFailed(`Resolving dir for unsupported ref: ${context.ref}`);

            return;
        }

        if (semver.valid(versionInput)) {
            return demoDirName(versionInput);
        }

        const packageTagMatch = versionInput.match(PACKAGE_TAG_REGEXP);

        if (packageTagMatch) {
            core.info('Using version inpit as package tag');

            const [, pkgName, pkgVersion] = packageTagMatch;

            if (!semver.valid(pkgVersion)) {
                core.setFailed(`Invalid ${pkgName} version: ${pkgVersion}`);

                return;
            }

            if (pkgName === '@alfalab/core-components') {
                return demoDirName(pkgVersion);
            } else if (pkgName.startsWith('@alfalab/core-components')) {
                const sha = (await git(['rev-list', '-n', '1', versionInput])).trim();

                if (sha === '') {
                    core.setFailed(`Didn't find sha for tag: ${versionInput}`);

                    return;
                }

                const tags = (await git(['tag', '--points-at', sha])).split('\n');

                for (const tag of tags) {
                    if (semver.valid(tag)) {
                        return demoDirName(tag);
                    }

                    const tagMatch = tag.match(PACKAGE_TAG_REGEXP);

                    if (tagMatch) {
                        const [, pkgName, pkgVersion] = tagMatch;

                        if (pkgName === '@alfalab/core-components') {
                            return demoDirName(pkgVersion);
                        }
                    }
                }

                return sha;
            } else {
                core.setFailed(`Resolving dir for unsupported version input: ${versionInput}`);

                return;
            }
        }

        core.info('Resolving version input as sha');

        return versionInput;
    }

    return dirInput;
};
