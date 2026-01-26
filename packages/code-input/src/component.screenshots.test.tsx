import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('CodeInput ', () =>
    createPreview(
        {
            componentName: 'CodeInput',
            knobs: {
                initialValues: '"0451"',
            },
        },
        'width:800px;transform:scale(2.5)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'CodeInput',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CodeInput',
                    size: { width: 200, height: 80 },
                    knobs: {
                        initialValues: ['', '1234'],
                        disabled: [true, false],
                        error: ['', 'Error'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.05,
        },
    }),
);

describe(
    'CodeInput border radius',
    screenshotTesting({
        cases: [
            [
                'desktop component sprite',
                createSpriteStorybookUrl({
                    packageName: 'code-input',
                    componentName: 'CodeInputDesktop',
                    knobs: {
                        initialValues: ['', '1234'],
                    },
                }),
            ],
            [
                'mobile component sprite',
                createSpriteStorybookUrl({
                    packageName: 'code-input',
                    componentName: 'CodeInputMobile',
                    knobs: {
                        initialValues: ['', '1234'],
                    },
                }),
            ],
        ],
        viewport: {
            width: 200,
            height: 200,
        },
    }),
);
