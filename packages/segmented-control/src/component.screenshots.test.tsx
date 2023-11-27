import { setupScreenshotTesting, generateTestCases, createPreview } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'SegmentedControl | main props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SegmentedControl',
            testStory: false,
            knobs: {
                size: ['xs', 'xxs'],
                shape: ['rounded', 'rectangular'],
                selectedId: 1,
            },
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1200, height: 200 },
        },
    }),
);

describe(
    'SegmentedControl | colors props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SegmentedControl',
            testStory: false,
            knobs: {
                size: 'xs',
                shape: 'rounded',
                selectedId: 1,
                colors: 'inverted',
            },
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1200, height: 200 },
        },
    }),
);
