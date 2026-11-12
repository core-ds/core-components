import {
    setupScreenshotTesting,
    createStorybookUrl,
    createSpriteStorybookUrl,
    createPreview,
    generateTestCases,
    customSnapshotIdentifier,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Textarea | clear', () => {
    screenshotTesting({
        cases: [
            ...generateTestCases({
                testStory: false,
                componentName: 'Textarea',
                knobs: {
                    value: 'Многострочный текст для проверки кнопки очистки и правого аддона.\nВторая строка текста.',
                    clear: 'always',
                    block: true,
                    minRows: 3,
                    label: 'Комментарий',
                    size: [56],
                    rightAddons: [false, true],
                },
            }),
            [
                'without autosize',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'Многострочный текст для очистки.\nВторая строка текста.',
                        clear: 'always',
                        block: true,
                        autosize: false,
                        label: 'Комментарий',
                        rightAddons: true,
                    },
                }),
            ],
            [
                'overflow',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'Длинный текст с подсветкой превышения лимита символов.',
                        clear: 'always',
                        block: true,
                        maxLength: 10,
                        showCounter: true,
                        rightAddons: true,
                    },
                }),
            ],
            ...['empty', 'disabled', 'readOnly'].map((state): [string, string] => [
                state,
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: state === 'empty' ? '' : 'Текст для очистки',
                        clear: 'always',
                        block: true,
                        label: 'Комментарий',
                        disabled: state === 'disabled',
                        readOnly: state === 'readOnly',
                    },
                }),
            ]),
        ],
        viewport: { width: 320, height: 240 },
        screenshotOpts: { fullPage: true },
    })();
});

['idle', 'hover', 'focus'].forEach((interaction) => {
    describe(`Textarea | auto clear | ${interaction}`, () => {
        screenshotTesting({
            cases: [
                [
                    'filled with right addon',
                    createStorybookUrl({
                        testStory: false,
                        componentName: 'Textarea',
                        knobs: {
                            value: 'Текст для очистки',
                            clear: 'auto',
                            block: true,
                            label: 'Комментарий',
                            rightAddons: true,
                        },
                    }),
                ],
            ],
            evaluate: async (page) => {
                if (interaction === 'hover') {
                    await page.hover('textarea');
                    await page.waitForTimeout(500);
                }

                if (interaction === 'focus') {
                    await page.focus('textarea');
                    await page.waitForTimeout(500);
                }
            },
            viewport: { width: 320, height: 240 },
            screenshotOpts: { fullPage: true },
        })();
    });
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
                            size: 56,
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
                            size: 56,
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

describe('Textarea | rightAddons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'TextareaAutosize Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение.',
                        block: true,
                        minRows: 3,
                        size: [56],
                        allowOverflow: false,
                        autosize: true,
                        rightAddons: true,
                    },
                }),
                ...generateTestCases({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'PseudoTextArea Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение.',
                        block: true,
                        minRows: 3,
                        size: [56],
                        allowOverflow: true,
                        autosize: true,
                        rightAddons: true,
                        maxLength: 10,
                    },
                }),
                ...generateTestCases({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'textarea Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение.',
                        block: true,
                        minRows: 3,
                        size: [56],
                        allowOverflow: false,
                        autosize: false,
                        rightAddons: true,
                        maxLength: 500,
                    },
                }),
                // disabled case
                ...generateTestCases({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'textarea Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение.',
                        block: true,
                        size: [56],
                        disabled: [true],
                    },
                }),
                // readOnly case
                ...generateTestCases({
                    testStory: false,
                    componentName: 'Textarea',
                    knobs: {
                        value: 'textarea Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение. Длинное значение в несколько строк. И вдруг, как пошло переполнение.',
                        block: true,
                        size: [56],
                        readOnly: [true],
                    },
                }),
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: { width: 320, height: 320 },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) => {
                    return `${theme}-${customSnapshotIdentifier(...args)}`;
                },
            },
        })();

    ['default'].map(testCase);
});
