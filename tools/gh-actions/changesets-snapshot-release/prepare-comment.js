module.exports = async ({ inputs }) => {
    const publishedPackages = inputs['published-packages'];

    return JSON.parse(publishedPackages)
        .map(({ name, version }, index) => `${index + 1}. \`${name}@${version}\``)
        .join('\n\n');
};
