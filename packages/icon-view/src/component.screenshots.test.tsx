import { setupScreenshotTesting, generateTestCases, createPreview } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

xdescribe(
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

xdescribe(
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
