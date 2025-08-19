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

describe('List', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'List',
            knobs: {},
        },
        'transform:scale(1.9)',
    ));

describe(
    'List | ul',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'List',
            knobs: {
                tag: ['ul'],
                marker: ['', 'custom'],
            },
            testStory: false,
        }),
    }),
);

describe(
    'List | ol',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'List',
            knobs: {
                tag: ['ol'],
                marker: ['', 'lower-alpha', 'custom'],
            },
            testStory: false,
        }),
    }),
);
