import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Slider', () => {
    createPreview(
        {
            componentName: 'Slider',
            knobs: {
                value: 5,
                size: 4,
                min: 0,
                max: 20,
                block: true,
                pips: JSON.stringify({ mode: 'values', values: [0, 10, 20] }),
            },
        },
        'padding: 0 270px;transform:scale(2.3)',
    );
});

describe('Slider | main props', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Slider',
                        knobs: {
                            value: [0, 50, 100],
                            disabled: [false, true],
                        },
                        size: { width: 200, height: 30 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 300,
                height: 100,
            },
            theme,
        })();

    ['default', 'mobile'].map(testCase);
});

describe(
    'Slider | valueTo props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Slider',
            knobs: {
                value: 50,
                valueTo: 75,
                min: 0,
                max: 100,
            },
            testStory: false,
        }),
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 300,
            height: 100,
        },
    }),
);

describe(
    'Slider | dots and pips props',
    screenshotTesting({
        cases: [
            [
                'step dots',
                createSpriteStorybookUrl({
                    componentName: 'Slider',
                    knobs: {
                        min: 1,
                        max: 10,
                        step: 0.5,
                        value: 2.5,
                        size: 4,
                        dots: true,
                        pips: JSON.stringify({
                            mode: 'values',
                            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        }),
                    },
                    size: { width: 500, height: 120 },
                }),
            ],
            [
                'custom dots with pips only',
                createSpriteStorybookUrl({
                    componentName: 'Slider',
                    knobs: {
                        min: 1,
                        max: 7,
                        step: 0.5,
                        value: 2.5,
                        size: 4,
                        dots: true,
                        dotsSlider: 'custom',
                        pipsLabel: 'pipsOnly',
                        customDots: JSON.stringify([1, 4, 5.5, 7]),
                        pips: JSON.stringify({
                            mode: 'values',
                            values: [1, 2, 3, 4, 5, 6, 7],
                        }),
                    },
                    size: { width: 500, height: 120 },
                }),
            ],
            [
                'custom dots with visible pips dots',
                createSpriteStorybookUrl({
                    componentName: 'Slider',
                    knobs: {
                        min: 1,
                        max: 7,
                        step: 0.5,
                        value: 2.5,
                        size: 4,
                        dots: true,
                        dotsSlider: 'custom',
                        pipsLabel: 'all',
                        showPipsDots: true,
                        customDots: JSON.stringify([1, 4, 5.5, 7]),
                        pips: JSON.stringify({
                            mode: 'values',
                            values: [1, 2, 3, 4, 5, 6, 7],
                        }),
                    },
                    size: { width: 500, height: 120 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 600,
            height: 180,
        },
    }),
);
