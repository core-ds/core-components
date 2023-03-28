import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
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
