import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Comment | main prop',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Comment',
            testStory: false,
            knobs: {
                children: 'Comment',
            },
        }),
    }),
);
