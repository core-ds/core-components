const glob = require('glob');
const path = require('path');
const fs = require('fs');

const findComponentPath = (() => {
    const cache = new Map();

    return (componentName, packageName) => {
        if (cache.has(packageName)) return cache.get(packageName);

        const files = glob.sync(
            path.join(path.resolve(__dirname, `../../packages/${packageName}`), '**/*.stories.mdx'),
            {},
        );

        let result = { url: '' };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const doc = fs.readFileSync(file).toString();
            const idProp = /<Meta[^>]*?id=['"](.*?)['"]/.exec(doc)?.[1].trim() || '';
            const titleProp = /<Meta[^>]*?title=['"](.*?)['"]/.exec(doc)?.[1].trim() || '';
            const urlSegments = idProp ? idProp.split('/') : titleProp.split('/');

            if (urlSegments.length > 0 && urlSegments[urlSegments.length - 1] === componentName) {
                const group = titleProp.split('/') || [];

                result.group =
                    group.length > 1 ? group.slice(0, group.length - 1).join('/') : undefined;
                result.url = urlSegments
                    .map((el) => `${el.toLowerCase().replace(/[\s&]/g, '-')}`)
                    .join('-');

                break;
            }
        }

        cache.set(packageName, result);

        return result;
    };
})();

module.exports = findComponentPath;