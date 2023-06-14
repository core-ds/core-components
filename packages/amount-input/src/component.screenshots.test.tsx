import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('AmountInput ', () =>
    createPreview(
        {
            componentName: 'AmountInput',
            knobs: {
                label: 'Сумма',
                value: 123400,
                size: 'm',
                block: true,
                breakpoint: 1
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
    ));

describe(
    'AmountInput | screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        value: [12300],
                        currency: ['RUR', 'USD'],
                        minority: [100],
                        bold: [true, false],
                    },
                    size: { width: 300, height: 70 },
                }),
            ],
            [
                'inverted',
                createStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        value: 12300,
                        minority: 100,
                        colors: 'inverted',
                    },
                }),
            ],
        ],
    }),
);
