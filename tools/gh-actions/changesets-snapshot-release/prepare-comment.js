module.exports = async ({ inputs }) => {
    const publishedPackages = inputs['published-packages'];

    return [
        '# Snapshot Release',
        'Successfully released the following packages:',
        ...JSON.parse(publishedPackages).map(
            ({ name, version }, index) => `${index + 1}. \`${name}@${version}\``,
        ),
    ].join('\n\n');
};
