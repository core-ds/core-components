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

        let result = '';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const doc = fs.readFileSync(file).toString().replace(/\n/g, '');
            const metaTag = (/<Meta.+?\/>/.exec(doc) || [''])[0].trim();

            const titlePropValue = (/(?<=title=').*(?=')/.exec(metaTag) || [''])[0].trim();

            const pathsEls = titlePropValue.split('/');

            if (pathsEls.length > 0 && pathsEls[pathsEls.length - 1] === componentName) {
                result = pathsEls
                    .slice(0, pathsEls.length - 1)
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
