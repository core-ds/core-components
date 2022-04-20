import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('SliderPicker | sprite', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'main props',
                    createSpriteStorybookUrl({
                        componentName: 'SliderPicker',
                        knobs: {
                            label: 'Оставшийся срок по кредиту',
                            value: [0, 50, 100],
                            size: ['s', 'm', 'l', 'xl'],
                        },
                        size: { width: 260, height: 120 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 1100,
                height: 500,
            },
            theme,
        })();

    ['default', 'click', 'mobile'].map(testCase);
});
