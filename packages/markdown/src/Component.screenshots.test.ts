import {
    generateTestCases,
    setupScreenshotTesting,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Markdown ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Markdown',
            knobs: {},
        },
        'transform:scale(1.9)',
    ));

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
