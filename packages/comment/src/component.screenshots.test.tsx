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

describe('Comment', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Comment',
            knobs: {
                children: 'Comment',
            },
        },
        'transform:scale(4)',
    ));

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
