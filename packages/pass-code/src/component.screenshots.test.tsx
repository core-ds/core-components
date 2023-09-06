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
            knobs: {},
        },
        'transform:scale(0.9);padding-bottom:100px',
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
                    testStory: false,
                    knobs: { value: '1234' },
                }),
            ],
            [
                'with error',
                createStorybookUrl({
                    componentName: 'PassCode',
                    testStory: false,
                    knobs: { value: '1234', error: 'Error message' },
                }),
            ],
            [
                'with message',
                createStorybookUrl({
                    componentName: 'PassCode',
                    testStory: false,
                    knobs: { value: '1234', message: 'Message' },
                }),
            ],
            [
                'with addons',
                createStorybookUrl({
                    componentName: 'PassCode',
                    testStory: false,
                    knobs: { leftAddons: true, rightAddons: true },
                }),
            ],
            [
                'with codeLength prop',
                createStorybookUrl({
                    componentName: 'PassCode',
                    testStory: false,
                    knobs: { codeLength: 4, value: '12' },
                }),
            ],
        ],
        screenshotOpts: {
            clip: {
                x: 0,
                y: 0,
                width: 520,
                height: 550,
            },
        },
    }),
);
