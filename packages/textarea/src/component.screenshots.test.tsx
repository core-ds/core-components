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

describe('Textarea ', () =>
    createPreview(
        {
            componentName: 'Textarea',
            knobs: {
                label: 'Текстовая область',
                value: 'Текст',
                size: 56,
                block: true,
                minRows: 2,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('Textarea | sprite', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} - main props`,
                    createSpriteStorybookUrl({
                        componentName: 'Textarea',
                        knobs: {
                            value: 'Компонент текстового поля ввода.',
                            block: true,
                            size: [40, 48, 56, 64, 72],
                            label: ['', 'Лейбл'],
                            labelView: 'inner',
                            placeholder: 'Плейсхолдер',
                        },
                        size: { width: 240, height: 100 },
                    }),
                ],
                [
                    `${theme} - main props`,
                    createSpriteStorybookUrl({
                        componentName: 'Textarea',
                        knobs: {
                            value: 'Компонент текстового поля ввода.',
                            block: true,
                            size: [40, 48, 56, 64, 72],
                            label: ['', 'Лейбл'],
                            labelView: 'outer',
                            placeholder: 'Плейсхолдер',
                        },
                        size: { width: 240, height: 100 },
                    }),
                ],
                [
                    'inverted',
                    createSpriteStorybookUrl({
                        componentName: 'Textarea',
                        knobs: {
                            value: 'Компонент текстового поля ввода.',
                            block: true,
                            label: 'Лейбл',
                            colors: 'inverted',
                            error: ['', 'error'],
                        },
                        size: { width: 240, height: 100 },
                    }),
                ],
                [
                    `${theme} - hint & error`,
                    createSpriteStorybookUrl({
                        componentName: 'Textarea',
                        knobs: {
                            value: 'Компонент текстового поля ввода.',
                            block: true,
                            error: ['', 'Ошибка'],
                            hint: ['', 'Подсказка'],
                        },
                        size: { width: 240, height: 100 },
                    }),
                ],
                [
                    `${theme} - counter`,
                    createSpriteStorybookUrl({
                        componentName: 'Textarea',
                        knobs: {
                            value: 'Компонент текстового поля ввода.',
                            block: true,
                            showCounter: true,
                            maxLength: 500,
                        },
                        size: { width: 240, height: 100 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: { width: 1024, height: 100 },
            theme,
        })();

    ['default', 'click'].map(testCase);
});

describe('Textarea | sprite', () => {
    screenshotTesting({
        cases: [
            [
                'overflow',
                createSpriteStorybookUrl({
                    componentName: 'Textarea',
                    knobs: {
                        value: 'Длинное значение в несколько строк. И вдруг, как пошло переполнение',
                        block: true,
                        showCounter: true,
                        maxLength: 35,
                        minRows: 3,
                    },
                    size: { width: 240, height: 150 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: { width: 1024, height: 100 },
    })();
});
