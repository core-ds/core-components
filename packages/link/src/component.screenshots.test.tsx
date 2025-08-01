import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 350, height: 40 };

describe('Link ', () =>
    createPreview(
        {
            componentName: 'Link',
            knobs: {
                children: 'Ссылка',
                view: 'default',
                underline: true,
            },
        },
        'transform:scale(5.3)',
    ));

describe(
    'Link | pseudo',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Link',
                    size: { width: 250, height: 40 },
                    knobs: {
                        view: ['primary', 'secondary', 'default'],
                        pseudo: [true, false],
                        children: 'Вернуться в интернет-банк',
                        colors: ['default', 'inverted'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Link | pseudo & underline',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Link',
                    size: { width: 250, height: 40 },
                    knobs: {
                        view: ['primary', 'secondary', 'default'],
                        pseudo: [true, false],
                        underline: [true, false],
                        children: 'Вернуться в интернет-банк',
                        colors: ['default', 'inverted'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Link | addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Link',
            knobs: {
                leftAddons: [true, false],
                rightAddons: [true, false],
            },
            testStory: false,
        }),
        screenshotOpts: { clip },
    }),
);
