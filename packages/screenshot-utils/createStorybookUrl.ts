import fs from 'fs';
import path from 'path';

import glob from 'glob';
import kebab from 'lodash.kebabcase';

import { STORYBOOK_URL } from './setupScreenshotTesting';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KnobValueType = string | boolean | number | any[];

export type KnobsCombinations = {
    [key: string]: KnobValueType | KnobValueType[];
};

export type Knobs = {
    [key: string]: KnobValueType;
};

export type CreateStorybookUrlParams = {
    url?: string;
    packageName?: string;
    componentName: string;
    subComponentName?: string;
    testStory?: boolean;
    inverted?: boolean;
    knobs?: Knobs;
    mockDate?: number;
};

export type CreateSpriteStorybookUrlParams = {
    url?: string;
    packageName?: string;
    componentName: string;
    subComponentName?: string;
    knobs?: KnobsCombinations;
    inverted?: boolean;
    size?: { width: number; height: number };
    mockDate?: number;
};

const findComponentGroupPath = (() => {
    const cache = new Map();

    return (componentName: string, packageName: string) => {
        if (cache.has(packageName)) return cache.get(packageName);

        const files = glob.sync(
            path.join(path.resolve(__dirname, `../${packageName}`), '**/*.stories.mdx'),
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
                    .map((el) => `${el.toLowerCase().replace(/\s/g, '-')}`)
                    .join('-');

                break;
            }
        }

        cache.set(packageName, result);

        return result;
    };
})();

export function createStorybookUrl({
    url = STORYBOOK_URL,
    componentName,
    subComponentName = '',
    packageName = kebab(componentName),
    testStory = true,
    inverted = false,
    knobs = {},
    mockDate,
}: CreateStorybookUrlParams): string {
    const knobsQuery = Object.keys(knobs).reduce(
        (acc, knobName) => `${acc}&knob-${knobName}=${knobs[knobName]}`,
        '',
    );

    if (testStory) {
        // TODO: укоротить (переписать на qs.stringify)
        return `${url}?id=компоненты--screenshots&package=${packageName}&component=${componentName}&subComponent=${subComponentName}&inverted=${inverted}&${knobsQuery}&mockDate=${
            mockDate || ''
        }`;
    }

    const groupPath = findComponentGroupPath(componentName, packageName);

    const packagePath = packageName.replace(/-/g, '');

    const componentPath = subComponentName
        ? `-${packagePath}--${kebab(subComponentName)}`
        : `-${packagePath}--${kebab(componentName)}`;

    const storybookUrl = `${url}?id=${groupPath}${componentPath}${knobsQuery}&mockDate=${
        mockDate || ''
    }`;

    return storybookUrl;
}

export function createSpriteStorybookUrl({
    url = STORYBOOK_URL,
    componentName,
    subComponentName = '',
    packageName = kebab(componentName),
    knobs = {},
    inverted = false,
    size,
    mockDate,
}: CreateSpriteStorybookUrlParams): string {
    const sizeParam = size ? `&height=${size.height}&width=${size.width}` : '';

    // TODO: укоротить (переписать на qs.stringify)
    return `${url}?id=компоненты--screenshots-sprite&package=${packageName}&component=${componentName}&subComponent=${subComponentName}${sizeParam}&inverted=${inverted}&knobs=${JSON.stringify(
        knobs,
    )}&mockDate=${mockDate || ''}`;
}
