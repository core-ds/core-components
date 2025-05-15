import {
    createStorybookUrl,
    setupScreenshotTesting,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PopupSheet', () =>
    createPreview(
        {
            componentName: 'PopupSheet',
            testStory: false,
            knobs: {},
        },
        'transform:scale(4);',
        {
            viewport: {
                width: 860,
                height: 600,
            },
            screenshotOpts: {
                clip: {
                    x: 8,
                    y: 8,
                    width: 860,
                    height: 600,
                },
            },
        },
    ));

describe(
    'PopupSheet',
    screenshotTesting({
        cases: [
            [
                'default',
                createStorybookUrl({
                    componentName: 'PopupSheet',
                    testStory: false,
                    knobs: {
                        open: true,
                        hasCloser: true,
                    },
                }),
            ],
        ],
        viewport: { width: 400, height: 640 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
