module.exports = async ({ inputs }) => {
    const publishedPackages = inputs['published-packages'];

    return [
        '# Snapshot Release',
        'Successfully released the following packages:',
        ...JSON.parse(publishedPackages)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ name, version }) => `## ${name}@${version}`),
    ].join('\n\n');
};
