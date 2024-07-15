import kebab from 'lodash.kebabcase';

import findComponentPath from '../../tools/storybook/findComponentPath';

import { STORYBOOK_URL } from './setupScreenshotTesting';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KnobValueType = string | boolean | number | any[];

export type KnobsObj = {
    [key: string]: KnobValueType;
};

export type KnobsCombinations = {
    [key: string]: KnobValueType | KnobValueType[] | KnobsObj;
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
    darkMode?: boolean;
    wrapperStyles?: string;
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
    darkMode = false,
    wrapperStyles = '',
    knobs = {},
    mockDate,
}: CreateStorybookUrlParams): string {
    const knobsQuery = Object.keys(knobs).reduce(
        (acc, knobName) => `${acc}&knob-${knobName}=${knobs[knobName]}`,
        '',
    );

    if (testStory) {
        // TODO: укоротить (переписать на qs.stringify)
        return `${url}?id=components--screenshots&package=${packageName}&component=${componentName}&subComponent=${subComponentName}&darkMode=${darkMode}&wrapperStyles=${wrapperStyles}&inverted=${inverted}&${knobsQuery}&mockDate=${
            mockDate || ''
        }`;
    }

    const cPath = findComponentPath(componentName, packageName).url;
    const cTitle = subComponentName ? kebab(subComponentName) : kebab(componentName);
    const storybookUrl = `${url}?id=${cPath}--${cTitle}${knobsQuery}&darkMode=${darkMode}&wrapperStyles=${wrapperStyles}&mockDate=${
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
    return `${url}?id=components--screenshots-sprite&package=${packageName}&component=${componentName}&subComponent=${subComponentName}${sizeParam}&inverted=${inverted}&knobs=${JSON.stringify(
        knobs,
    )}&mockDate=${mockDate || ''}`;
}
