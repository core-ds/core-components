import { setupScreenshotTesting, createStorybookUrl, createPreview } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PassCode ', () => {
    createPreview(
        {
            componentName: 'PassCode',
            packageName: 'pass-code',
            knobs: {},
        },
        'transform:translateX(-8px)',
        {
            screenshotOpts: {
                fullPage: true,
            },
            viewport: { width: 360, height: 640 },
        },
    );
});

describe(
    'PassCode',
    screenshotTesting({
        cases: [
            [
                'default',
                createStorybookUrl({
                    componentName: 'PassCode',
                    packageName: 'pass-code',
                    testStory: false,
                    knobs: { value: '1234' },
                }),
            ],
            [
                'with addons',
                createStorybookUrl({
                    componentName: 'PassCode',
                    packageName: 'pass-code',
                    testStory: false,
                    knobs: { leftAddons: true, rightAddons: true },
                }),
            ],
            [
                'with codeLength prop',
                createStorybookUrl({
                    componentName: 'PassCode',
                    packageName: 'pass-code',
                    testStory: false,
                    knobs: { codeLength: 4, value: '12' },
                }),
            ],
            [
                'with error',
                createStorybookUrl({
                    componentName: 'PassCode',
                    packageName: 'pass-code',
                    testStory: false,
                    knobs: { codeLength: 4, value: '1234', error: true },
                }),
            ],
            [
                'with success',
                createStorybookUrl({
                    componentName: 'PassCode',
                    packageName: 'pass-code',
                    testStory: false,
                    knobs: { codeLength: 4, value: '1234', success: true },
                }),
            ],
        ],
        viewport: { width: 360, height: 640 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
