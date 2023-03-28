import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

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
        'transform:scale(2.5)',
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
