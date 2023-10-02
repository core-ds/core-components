import { generateTestCases, setupScreenshotTesting } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Markdown',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Markdown',
            testStory: false,
            knobs: {},
        }),
        screenshotOpts: { fullPage: true },
    }),
);
