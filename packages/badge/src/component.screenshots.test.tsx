import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Badge | screenshots view=`count`',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Badge',
                    knobs: {
                        view: ['count'],
                        size: ['s', 'm', 'l'],
                        content: [1, 10, 100],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 150 },
        },
    }),
);

describe(
    'Badge | screenshots view=`count` and props `color`',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Badge',
                    knobs: {
                        view: 'count',
                        height: [24],
                        content: [undefined, 1, 99, 100],
                        color: 'specialbg-secondary-transparent',
                    },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Badge',
                    inverted: true,
                    knobs: {
                        view: 'count',
                        height: [24],
                        content: [undefined, 1, 99, 100],
                        color: 'primary',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1000, height: 150 },
        },
    }),
);

describe(
    'Badge | screenshots view=`icon`',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Badge',
            knobs: {
                view: ['icon'],
                visibleIconOutline: [true, false],
                iconColor: [
                    'positive',
                    'attention',
                    'negative',
                    'tertiary',
                    'secondary',
                    'primary',
                    'link',
                ],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 50, height: 50 },
        },
    }),
);

describe(
    'Badge color outline| screenshots view=`icon`',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Badge',
            knobs: {
                view: ['icon'],
                visibleColorOutline: [true, false],
                iconColor: [
                    'positive',
                    'attention',
                    'negative',
                    'tertiary',
                    'secondary',
                    'primary',
                    'link',
                ],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 50, height: 50 },
        },
    }),
);
