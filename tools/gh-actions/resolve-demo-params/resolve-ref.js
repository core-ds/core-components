module.exports = async ({ inputs }) => {
    const version = inputs['version'];

    if (version === '') {
        return process.env.GITHUB_REF;
    } else if (/^\d+\.\d+\.\d+$/.test(version)) {
        const major = parseInt(version.replace(/^(\d+)(.*)/, '$1'));

        return major < 49 ? `v${version}` : `@balafla/core-components@${version}`;
    }

    return version;
};
