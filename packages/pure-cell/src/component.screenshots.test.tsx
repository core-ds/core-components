import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'PureCell | screenshots direction=`horizontal`',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'PureCell',
            knobs: {
                direction: ['horizontal'],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 600 },
        },
    }),
);
