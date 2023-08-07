const req = require.context('../../', true, /^\.\/(.*)\/src\/(index|desktop|mobile).ts$/);

const packages = req.keys().reduce((acc, key) => {
    const packageName = key.split('/')[1];

    acc[packageName] = {
        ...acc[packageName],
        ...req(key),
    };

    return acc;
    // eslint-disable-next-line
}, {} as Record<string, any>);

export const getComponent = (
    packageName: string,
    componentName: string,
    subComponentName?: string,
) => {
    try {
        const component = packages[packageName][componentName];

        return subComponentName ? component[subComponentName] : component;
    } catch (e) {
        return null;
    }
};
