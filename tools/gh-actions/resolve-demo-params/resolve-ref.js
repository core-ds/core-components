const semver = require('semver');

module.exports = async ({ core, inputs }) => {
    const versionInput = inputs['version'];

    if (semver.valid(versionInput)) {
        core.info('Resolving as @alfalab/core-components version');

        return semver.satisfies(versionInput, '>= 49', { includePrerelease: true })
            ? `@alfalab/core-components@${semver.clean(versionInput)}`
            : `v${semver.clean(versionInput)}`;
    }

    core.info('Using version input as ref');

    return versionInput;
};
