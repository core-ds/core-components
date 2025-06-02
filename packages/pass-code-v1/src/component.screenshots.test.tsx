import {
    setupScreenshotTesting,
    createStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PassCodeV1 ', () => {
    createPreview(
        {
            componentName: 'PassCodeV1',
            packageName: 'pass-code-v1',
            knobs: {},
        },
        'transform:scale(0.9);padding-bottom:100px',
    );
});

describe(
    'PassCodeV1',
    screenshotTesting({
        cases: [
            [
                'default',
                createStorybookUrl({
                    componentName: 'PassCodeV1',
                    packageName: 'pass-code-v1',
                    testStory: false,
                    knobs: { value: '1234' },
                }),
            ],
            [
                'with error',
                createStorybookUrl({
                    componentName: 'PassCodeV1',
                    packageName: 'pass-code-v1',
                    testStory: false,
                    knobs: { value: '1234', error: 'Error message' },
                }),
            ],
            [
                'with message',
                createStorybookUrl({
                    componentName: 'PassCodeV1',
                    packageName: 'pass-code-v1',
                    testStory: false,
                    knobs: { value: '1234', message: 'Message' },
                }),
            ],
            [
                'with addons',
                createStorybookUrl({
                    componentName: 'PassCodeV1',
                    packageName: 'pass-code-v1',
                    testStory: false,
                    knobs: { leftAddons: true, rightAddons: true },
                }),
            ],
            [
                'with codeLength prop',
                createStorybookUrl({
                    componentName: 'PassCodeV1',
                    packageName: 'pass-code-v1',
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
