import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
    generateTestCases,
} from '@alfalab/core-components-screenshot-utils';
import { Page } from 'playwright';

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

describe('AmountInput with stepper', () =>
    createPreview(
        {
            componentName: 'AmountInput',
            knobs: {
                label: 'Сумма',
                value: 123400,
                size: 56,
                bold: false,
                block: true,
                stepper: ['{"step": 1}'],
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
        ],
    }),
);

describe(
    'AmountInput | size',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        minority: 100,
                        size: [40, 48, 56, 64, 72],
                        colors: 'default',
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        minority: 100,
                        size: [40, 48, 56, 64, 72],
                        colors: 'inverted',
                    },
                }),
            ],
            [
                'with stepper sprite',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        minority: 100,
                        size: [40, 48, 56, 64, 72],
                        colors: 'default',
                        stepper: ['{"step": 1}'],
                    },
                }),
            ],
            [
                'with stepper sprite',
                createSpriteStorybookUrl({
                    componentName: 'AmountInput',
                    knobs: {
                        minority: 100,
                        size: [40, 48, 56, 64, 72],
                        colors: 'inverted',
                        stepper: ['{"step": 1}'],
                    },
                }),
            ],
        ],
    }),
);

describe(
    'AmountInput | disableUserInput focus state with stepper',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'AmountInput',
                knobs: {
                    label: 'Сумма',
                    value: 123400,
                    size: 56,
                    bold: false,
                    stepper: ['{"step": 1}'],
                    disableUserInput: false,
                },
            }),
            ...generateTestCases({
                componentName: 'AmountInput',
                knobs: {
                    label: 'Сумма',
                    value: 123400,
                    size: 56,
                    bold: false,
                    stepper: ['{"step": 1}'],
                    disableUserInput: true,
                },
            }),
            ...generateTestCases({
                componentName: 'AmountInput',
                knobs: {
                    label: 'Сумма',
                    value: 123400,
                    size: 56,
                    bold: false,
                    stepper: ['{"step": 1}'],
                    disableUserInput: false,
                    colors: 'inverted',
                },
            }),
            ...generateTestCases({
                componentName: 'AmountInput',
                knobs: {
                    label: 'Сумма',
                    value: 123400,
                    size: 56,
                    bold: false,
                    stepper: ['{"step": 1}'],
                    disableUserInput: true,
                    colors: 'inverted',
                },
            }),
        ],
        evaluate: (page: Page) => {
            return page.mouse
                .move(26, 26)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        screenshotOpts: {},
        viewport: {
            width: 360,
            height: 100,
        },
    }),
);
