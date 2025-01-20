import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
    generateTestCases,
} from '../../screenshot-utils';
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('CircularProgressBar', () =>
    createPreview(
        {
            componentName: 'CircularProgressBar',
            knobs: {
                view: 'negative',
                value: 15,
                size: 128,
            },
        },
        'transform:scale(2.5)',
    ));

describe(
    'CircularProgressBar',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 30,
                        title: ['', 'Title'],
                        subtitle: ['', 'SubTitle'],
                        view: 'positive',
                        size: [24, 48, 64, 80, 96, 128, 144],
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 60,
                        title: ['', 'Title'],
                        subtitle: ['', 'SubTitle'],
                        view: 'positive',
                        size: [24, 48, 64, 80, 96, 128, 144],
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 30,
                        title: ['', 'Title'],
                        subtitle: ['', 'SubTitle'],
                        view: 'negative',
                        size: [24, 48, 64, 80, 96, 128, 144],
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 60,
                        title: ['', 'Title'],
                        subtitle: ['', 'SubTitle'],
                        view: 'negative',
                        size: [24, 48, 64, 80, 96, 128, 144],
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CircularProgressBar | contentColor',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 60,
                        title: 'Title',
                        subtitle: ['', 'SubTitle'],
                        contentColor: ['primary', 'secondary', 'tertiary', 'positive', 'negative'],
                        view: 'positive',
                        size: 80,
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 60,
                        title: ['', 'Title'],
                        subtitle: 'SubTitle',
                        contentColor: ['primary', 'secondary', 'tertiary', 'positive', 'negative'],
                        view: 'positive',
                        size: 80,
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CircularProgressBar | icon, stroke, fillComplete, completeIconColor',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: [0, 25, 100],
                        title: 'Title',
                        view: 'positive',
                        stroke: [true, false],
                        size: 80,
                        completeTextColor: 'primary-inverted',
                        fillComplete: true,
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CircularProgressBar | direction',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: [25, 50, 95],
                        title: 'Title',
                        view: 'positive',
                        stroke: [true, false],
                        size: 80,
                        direction: ['Clockwise', 'CounterClockwise'],
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CircularProgressBar | subtitleComplete, titleComplete',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: [25, 100],
                        title: 'Title',
                        subtitle: 'SubTitle',
                        titleComplete: 'Title2',
                        subtitleComplete: 'SubTitle2',
                        view: 'positive',
                        size: 128,
                    },
                    size: { width: 200, height: 200 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CircularProgressBar | color overriding',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 50,
                        title: 'Title',
                        subtitle: 'SubTitle',
                        size: 80,
                        contentColor: ['primary', 'tomato'],
                        titleColor: ['positive', 'blue'],
                    },
                    size: { width: 96, height: 96 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CircularProgressBar',
                    knobs: {
                        value: 50,
                        title: 'Title',
                        subtitle: 'SubTitle',
                        size: 80,
                        contentColor: ['primary', 'tomato'],
                        subtitleColor: ['positive', 'blue'],
                    },
                    size: { width: 96, height: 96 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: false,
            clip: { x: 0, y: 0, width: 1024, height: 150 },
        },
    }),
);

describe(
    'CircularProgressBar | Timer',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CircularProgressBar',
            subComponentName: 'Timer',
            testStory: false,
            knobs: {
                value: 60,
                counting: ['backward', 'forward'],
                directionType: ['desc', 'asc'],
            },
        }),
        evaluate: (page: Page) => page.waitForTimeout(16000),
        screenshotOpts: {
            fullPage: false,
            clip: { x: 0, y: 0, width: 96, height: 96 },
        },
    }),
);
