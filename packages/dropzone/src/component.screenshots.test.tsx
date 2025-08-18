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

const clip = { x: 0, y: 0, width: 450, height: 250 };

describe('Dropzone', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Dropzone',
        },
        'transform: scale(1.3)',
    ));

describe(
    'Dropzone | main props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Dropzone',
            testStory: false,
            knobs: {
                error: [false, true],
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);
