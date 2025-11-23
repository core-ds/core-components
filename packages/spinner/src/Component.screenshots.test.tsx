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

describe('Spinner', () =>
    createPreview(
        {
            componentName: 'Spinner',
            knobs: {
                size: 40,
                lineWidth: 4,
                style: JSON.stringify({ padding: 4 }),
                visible: true,
            },
        },
        'transform:scale(3.2)',
    ));

describe(
    'Spinner | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Spinner',
                    knobs: {
                        size: [48, 64, 80],
                        lineWidth: [4, 8, 12],
                        visible: [false, true],
                        style: [
                            JSON.stringify({ color: 'var(--color-light-decorative-text-red)' }),
                            JSON.stringify({ color: 'var(--color-light-decorative-text-blue)' }),
                        ],
                    },
                    size: { width: 100, height: 100 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 250,
            height: 100,
        },
    }),
);

describe('Spinner preset', () =>
    createPreview(
        {
            componentName: 'Spinner',
            knobs: {
                preset: 48,
                visible: true,
            },
        },
        'transform:scale(3.2)',
    ));

describe(
    'Spinner preset | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Spinner',
                    knobs: {
                        preset: [24, 48, 16],
                        visible: [false, true],
                    },
                    size: { width: 100, height: 60 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 250,
            height: 100,
        },
    }),
);
