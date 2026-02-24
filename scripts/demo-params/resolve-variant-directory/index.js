import semver from 'semver';

/**
 * @returns {Promise<string | undefined>}
 */
async function resolveVariantDirectory() {
    const directory = process.env.CORE_COMPONENTS_DEMO_DIRECTORY;

    if (semver.satisfies(directory, '<50', { includePrerelease: true })) {
        return directory;
    }

    const variant = process.env.CORE_COMPONENTS_VARIANT || 'default';

    if (semver.satisfies(directory, '>=50', { includePrerelease: true }) || variant !== 'default') {
        return `${directory}-${variant}`;
    }

    return directory;
}

export default resolveVariantDirectory;
