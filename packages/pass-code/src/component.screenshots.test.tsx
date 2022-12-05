import { setupScreenshotTesting, createStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
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
