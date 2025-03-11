import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

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
                size: 56,
                bold: false,
                block: true,
            },
        },
        'width:800px;padding: 0 270px; transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
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
            [
                'sprite disabled prop',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        value: 123456,
                        minority: 100,
                        colors: ['default', 'inverted'],
                        disabled: [false, true],
                    },
                }),
            ],
            [
                'sprite readOnly prop',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        value: 123456,
                        minority: 100,
                        colors: ['default', 'inverted'],
                        readOnly: [false, true],
                    },
                }),
            ],
            [
                'sprite size',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        minority: 100,
                        size: [40, 48, 56, 64, 72],
                    },
                }),
            ],
        ],
    }),
);
