import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Comment view | main prop',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Comment view',
            testStory: false,
            knobs: {
              children: 'Comment'
            },
        }),
    }),
);
