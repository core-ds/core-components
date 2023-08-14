import { createStorybookUrl, setupScreenshotTesting } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

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
