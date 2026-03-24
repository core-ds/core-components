// @ts-check

import path from 'node:path';
import semver from 'semver';

const HEADS_PREFIX = 'refs/heads/';
const TAGS_PREFIX = 'refs/tags/';
// version/49
const VERSION_BRANCH_PREFIX = 'version/';
// regexp based on https://github.com/changesets/action/blob/06245a4e0a36c064a573d4150030f5ec548e4fcc/src/run.ts#L139
const PACKAGE_TAG_REGEXP = /(@[^/\s]+\/[^@]+|[^/\s]+)@([^\s]+)/;

/**
 * @param {Pick<import('@actions/github-script').AsyncFunctionArguments, 'context' | 'core' | 'exec'>} args
 * @returns {Promise<string | undefined>}
 */
// eslint-disable-next-line complexity
async function resolveDirectory({ context, core, exec }) {
    /**
     * @param {string[]} args
     * @returns {Promise<string>}
     */
    async function git(args) {
        const { stdout } = await exec.getExecOutput('git', args, {
            cwd: path.join(process.env.GITHUB_WORKSPACE, 'checkout-ref'),
        });

        return stdout;
    }

    /**
     * @param {string} coreComponentsVersion
     * @returns {string}
     */
    function demoDirName(coreComponentsVersion) {
        return `v${semver.clean(coreComponentsVersion)}`;
    }

    const dirInput = process.env.CORE_COMPONENTS_DEMO_DIRECTORY;

    if (dirInput === '') {
        let versionInput = process.env.CORE_COMPONENTS_DEMO_VERSION;
        let refIsNotSupported = false;

        if (versionInput === context.ref) {
            if (context.ref.startsWith(HEADS_PREFIX)) {
                const refName = context.ref.replace(HEADS_PREFIX, '');

                if (refName === 'master' || refName === 'next') {
                    return refName;
                }

                if (refName.startsWith(VERSION_BRANCH_PREFIX)) {
                    return refName.replace(VERSION_BRANCH_PREFIX, 'v');
                }

                refIsNotSupported = true;
            } else if (context.ref.startsWith(TAGS_PREFIX)) {
                const tagName = context.ref.replace(TAGS_PREFIX, '');
                const tagMatch = tagName.match(PACKAGE_TAG_REGEXP);

                if (tagMatch) {
                    const [, pkgName] = tagMatch;

                    if (pkgName.startsWith('@alfalab/core-components')) {
                        versionInput = tagName;
                    } else {
                        refIsNotSupported = true;
                    }
                } else {
                    refIsNotSupported = true;
                }
            }
        }

        if (refIsNotSupported) {
            core.setFailed(`Resolving dir for unsupported ref: ${context.ref}`);

            return undefined;
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

                return undefined;
            }

            if (pkgName === '@alfalab/core-components') {
                return demoDirName(pkgVersion);
            }
            if (pkgName.startsWith('@alfalab/core-components')) {
                const sha = (await git(['rev-list', '-n', '1', versionInput])).trim();

                if (sha === '') {
                    core.setFailed(`Didn't find sha for tag: ${versionInput}`);

                    return undefined;
                }

                const tags = (await git(['tag', '--points-at', sha])).split('\n');

                for (const tag of tags) {
                    if (semver.valid(tag)) {
                        return demoDirName(tag);
                    }

                    const tagMatch = tag.match(PACKAGE_TAG_REGEXP);

                    if (tagMatch) {
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        const [, pkgName, pkgVersion] = tagMatch;

                        if (pkgName === '@alfalab/core-components') {
                            return demoDirName(pkgVersion);
                        }
                    }
                }

                return sha;
            }
            core.setFailed(`Resolving dir for unsupported version input: ${versionInput}`);

            return undefined;
        }

        core.info('Resolving version input as sha');

        return versionInput;
    }

    return dirInput;
}

export default resolveDirectory;
