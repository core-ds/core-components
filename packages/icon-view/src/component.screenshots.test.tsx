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

describe('IconView', () => {
    createPreview(
        {
            componentName: 'IconView',
            subComponentName: 'SuperEllipse',
            testStory: false,
            knobs: {
                size: '80',
                backgroundColor: 'var(--color-light-modal-bg-primary)',
                border: true,
            },
        },
        'transform:scale(4)',
    );
});

describe(
    'IconView | SuperEllipse size, border',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'SuperEllipse',
            knobs: {
                size: [24, 48, 64, 80, 128, 16, 20, 32, 40, 56, 72],
                border: [true, false],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 150, height: 150 },
        },
    }),
);

describe(
    'IconView | SuperEllipse size, border, addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'SuperEllipse',
            knobs: {
                size: [48, 64, 80, 128, 72],
                topAddons: [true, false],
                bottomAddons: [true, false],
                border: [true, false],
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
                size: '80',
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
    'IconView | Circle size, border',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'Circle',
            knobs: {
                size: [24, 48, 64, 80, 128, 16, 20, 32, 40, 56, 72],
                border: [true, false],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 150, height: 150 },
        },
    }),
);

describe(
    'IconView | Circle size, border, addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'Circle',
            knobs: {
                size: [48, 64, 80, 72],
                topAddons: [true, false],
                bottomAddons: [true, false],
                border: [true, false],
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
                size: '80',
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
    'IconView | Rectangle size, border',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'Rectangle',
            knobs: {
                size: [24, 48, 64, 80, 128, 20, 32, 40, 56],
                border: [true, false],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 150, height: 150 },
        },
    }),
);

describe(
    'IconView | NoShape size, border',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconView',
            subComponentName: 'NoShape',
            knobs: {
                size: [16, 20, 24, 32, 40, 48, 56, 64, 80, 128, 72],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 150, height: 150 },
        },
    }),
);
