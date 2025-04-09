module.exports = async ({ context, core, inputs }) => {
    const semver = require('semver');

    const versionInput = inputs['version'];

    if (versionInput === '') {
        core.info('Version input is empty');
        return context.ref;
    } else if (semver.valid(versionInput)) {
        core.info('Resolving as @balafla/core-components version');

        return semver.satisfies(versionInput, '>= 49', { includePrerelease: true })
            ? `@balafla/core-components@${semver.clean(versionInput)}`
            : `v${semver.clean(versionInput)}`;
    }

    core.info('Using version input as ref');

    return versionInput;
};
