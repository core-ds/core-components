import {
    setupScreenshotTesting,
    createPreview,
    createSpriteStorybookUrl,
    generateTestCases,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const sizes = [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128];

describe('IconView', () => {
    createPreview(
        {
            componentName: 'IconView',
            subComponentName: 'SuperEllipse',
            testStory: false,
            knobs: {
                size: 80,
                backgroundColor: 'var(--color-light-modal-bg-primary)',
                border: true,
            },
        },
        'transform:scale(4)',
    );
});

describe(
    'IconView | sprite',
    screenshotTesting({
        cases: [
            [
                'SuperEllipse size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'SuperEllipse',
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
                'SuperEllipse size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'SuperEllipse',
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
    'IconView | SuperEllipse addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'SuperEllipse',
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
    'IconView | SuperEllipse indicator',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'SuperEllipse',
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
