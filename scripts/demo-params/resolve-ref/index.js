// @ts-check

import semver from 'semver';

/**
 * @param {Pick<import('@actions/github-script').AsyncFunctionArguments, 'core'>} args
 * @returns {Promise<string>}
 */
async function resolveRef({ core }) {
    const versionInput = core.getInput('version');

    if (semver.valid(versionInput)) {
        core.info('Resolving as @alfalab/core-components version');

        const cleanVersion = semver.clean(versionInput);

        return semver.satisfies(versionInput, '>=49', { includePrerelease: true })
            ? `@alfalab/core-components@${cleanVersion}`
            : `v${cleanVersion}`;
    }

    core.info('Using version input as ref');

    return versionInput;
}

export default resolveRef;
