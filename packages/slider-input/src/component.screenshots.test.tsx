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

describe('SliderInput ', () =>
    createPreview(
        {
            componentName: 'SliderInput',
            knobs: {
                label: 'Поле со слайдером',
                value: 5,
                steps: '[1,10,20]',
                size: 56,
                min: 1,
                max: 20,
                block: true,
            },
        },
        'padding: 28px 270px 0;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('SliderInput | sprite', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'main props',
                    createSpriteStorybookUrl({
                        componentName: 'SliderInput',
                        knobs: {
                            label: 'Оставшийся срок по кредиту',
                            value: [0, 50, 100],
                            size: [48, 56, 64, 72],
                        },
                        size: { width: 260, height: 120 },
                    }),
                ],
                [
                    'additional props',
                    createSpriteStorybookUrl({
                        componentName: 'SliderInput',
                        knobs: {
                            value: 50,
                            info: 'Р',
                            label: ['', 'Оставшийся срок по кредиту'],
                            error: ['', 'Ошибка'],
                            steps: [['36 мес', '180 мес', '360 мес']],
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

    ['default', 'mobile'].map(testCase);
});
