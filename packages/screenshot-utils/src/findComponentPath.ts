import fs from 'fs';
import path from 'path';

import glob from 'glob';

type PathData = { url: string; group?: string };

const cache = new Map<string, PathData>();

export const findComponentPath = (componentName: string, packageName: string) => {
    if (cache.has(packageName)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return cache.get(packageName)!;
    }

    const mdxStory = glob.sync(
        path.join(path.resolve(__dirname, `../../../packages/${packageName}`), '**/*.stories.mdx'),
        {},
    )?.[0];

    const tsxStory = glob.sync(
        path.join(path.resolve(__dirname, `../../../packages/${packageName}`), '**/*.stories.tsx'),
        {},
    )?.[0];

    const result: PathData = { url: '' };
    let idProp = '';
    let titleProp = '';

    if (mdxStory) {
        const doc = fs.readFileSync(mdxStory, { encoding: 'utf8' });

        idProp = /<Meta[^>]*?id=['"](.*?)['"]/.exec(doc)?.[1].trim() || '';
        titleProp = /<Meta[^>]*?title=['"](.*?)['"]/.exec(doc)?.[1].trim() || '';
    } else if (tsxStory) {
        const doc = fs.readFileSync(tsxStory, { encoding: 'utf8' });
        const metaString =
            /const\s+meta.*\{((?:.|\s)*?)\}/.exec(doc)?.[1]?.replace(/\s/g, '') || '';
        const parsedMeta = metaString.split(',').reduce<Record<string, string>>((acc, str) => {
            const [key, value] = str.split(':').map((v) => v.replace(/['"]/g, ''));

            acc[key] = value;

            return acc;
        }, {});

        idProp = parsedMeta.id;
        titleProp = parsedMeta.title;
    }

    const urlSegments = idProp ? idProp.split('/') : titleProp.split('/');

    if (urlSegments.length > 0 && urlSegments[urlSegments.length - 1] === componentName) {
        const group = titleProp.split('/') || [];

        result.group = group.length > 1 ? group.slice(0, group.length - 1).join('/') : undefined;
        result.url = urlSegments
            .map((el) => `${el.toLowerCase().replace(/[\s&]/g, '-')}`)
            .join('-');
    }

    cache.set(packageName, result);

    return result;
};
