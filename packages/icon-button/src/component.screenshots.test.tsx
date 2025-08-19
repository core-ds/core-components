import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 100, height: 100 };

describe('IconButton', () =>
    createPreview(
        {
            componentName: 'IconButton',
            knobs: {
                view: 'primary',
                icon: 'DiamondsMIcon',
            },
            testStory: false,
        },
        'transform:scale(4);position:static',
    ));

describe(
    'IconButton | screenshots views and sizes',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconButton',
            knobs: {
                view: ['primary', 'secondary', 'transparent', 'tertiary', 'negative'],
                size: [24, 32, 40, 48, 56],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'IconButton | inverted views',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconButton',
            knobs: {
                view: ['primary', 'secondary', 'transparent', 'tertiary', 'negative'],
                colors: 'inverted',
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'IconButton | hover',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconButton',
            knobs: {
                view: ['primary', 'secondary', 'transparent', 'tertiary', 'negative'],
                colors: ['default', 'inverted'],
                size: 48,
            },
            testStory: false,
        }),
        evaluate: (page: Page) =>
            page.hover('button[class*=component]').then(() => page.waitForTimeout(500)),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'IconButton | press',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconButton',
            knobs: {
                view: ['primary', 'secondary', 'transparent', 'tertiary', 'negative'],
                colors: ['default', 'inverted'],
                size: 48,
            },
            testStory: false,
        }),
        evaluate: (page: Page) => {
            return page.mouse
                .move(30, 30)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'IconButton | screenshots disabled',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconButton',
            knobs: {
                view: ['primary', 'secondary', 'transparent', 'tertiary', 'negative'],
                colors: ['default', 'inverted'],
                size: 48,
                disabled: 'true',
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip,
        },
    }),
);
