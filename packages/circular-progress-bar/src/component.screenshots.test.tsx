import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

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
                size: 'xl',
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
                        size: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
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
                        size: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
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
                        size: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
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
                        size: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
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
                        size: 'l',
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
                        size: 'l',
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
                        size: 'l',
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
                        size: 'l',
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
                        size: 'xl',
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
