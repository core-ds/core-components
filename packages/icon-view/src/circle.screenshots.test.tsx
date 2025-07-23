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

const sizes = [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128];

describe(
    'IconView | sprite',
    screenshotTesting({
        cases: [
            [
                'Circle size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'Circle',
                    knobs: {
                        size: [16, 20, 24, 32, 40, 48],
                        border: [true, false],
                    },
                    size: {
                        width: 100,
                        height: 100,
                    },
                }),
            ],
            [
                'Circle size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'Circle',
                    knobs: {
                        size: [56, 64, 72, 80, 128],
                        border: [true, false],
                    },
                    size: {
                        width: 140,
                        height: 100,
                    },
                }),
            ],
        ],
        viewport: {
            width: 330,
            height: 760,
        },
        screenshotOpts: {
            fullPage: false,
        },
    }),
);

describe(
    'IconView | Circle addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'Circle',
            knobs: {
                size: sizes,
                topAddons: true,
                bottomAddons: true,
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 150, height: 150 },
        },
    }),
);

describe(
    'IconView | Circle indicator',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'Circle',
            knobs: {
                size: sizes,
                indicator: 'true',
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 150, height: 150 },
        },
    }),
);

describe(
    'IconView | Circle with Image scale',
    screenshotTesting({
        cases: [
            [
                'Circle scale',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'Circle',
                    knobs: {
                        size: [32, 64, 80, 128],
                        imageUrl: './images/imgBg.png',
                        scale: ['fit', 'fill'],
                    },
                }),
            ],
        ],
        viewport: {
            width: 600,
            height: 720,
        },
        screenshotOpts: {
            fullPage: false,
        },
    }),
);
