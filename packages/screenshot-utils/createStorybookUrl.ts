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

export function createStorybookUrl({
    url = STORYBOOK_URL,
    componentName,
    subComponentName = '',
    packageName = kebab(componentName),
    testStory = true,
    inverted = false,
    knobs = {},
    mockDate,
}: CreateStorybookUrlParams) {
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

    const componentPath = subComponentName
        ? `-${packageName.replace(/-/g, '')}--${kebab(subComponentName)}`
        : `-${packageName.replace(/-/g, '')}--${kebab(componentName)}`;

    return `${url}?id=компоненты${componentPath}${knobsQuery}&mockDate=${mockDate || ''}`;
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
}: CreateSpriteStorybookUrlParams) {
    const sizeParam = size ? `&height=${size.height}&width=${size.width}` : '';

    // TODO: укоротить (переписать на qs.stringify)
    return `${url}?id=компоненты--screenshots-sprite&package=${packageName}&component=${componentName}&subComponent=${subComponentName}${sizeParam}&inverted=${inverted}&knobs=${JSON.stringify(
        knobs,
    )}&mockDate=${mockDate || ''}`;
}
