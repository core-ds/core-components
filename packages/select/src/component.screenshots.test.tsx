import {
    setupScreenshotTesting,
    createStorybookUrl,
    closeBrowser,
    matchHtml,
    openBrowserPage,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
    { key: '3', content: 'Americium' },
    { key: '4', content: 'Curium' },
    { key: '5', content: 'Berkelium' },
    { key: '6', content: 'Californium' },
];

const groups = [
    {
        label: 'Группа №1',
        options: [
            { key: '1', content: 'Neptunium' },
            { key: '2', content: 'Plutonium' },
            { key: '3', content: 'Berkelium' },
            { key: '4', content: 'Californium' },
        ],
    },
    {
        label: 'Группа №2',
        options: [
            { key: '5', content: 'Americium' },
            { key: '6', content: 'Curium' },
        ],
    },
];

describe('Select', () => {
    createPreview(
        {
            packageName: 'select',
            componentName: 'SelectDesktop',
            knobs: {
                label: 'Селект',
                size: 56,
                block: true,
                selected: '["1"]',
                options: '[{"key": "1", "content": "Вариант из списка"}]',
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
        {
            matchImageSnapshotOptions: {
                failureThreshold: 0.005,
            },
        },
    );

    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme — main props`,
                    createSpriteStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectDesktop',
                        knobs: {
                            options: [[]],
                            block: true,
                            placeholder: 'Выберите элемент',
                            size: [40, 48, 56, 64],
                            label: ['Элемент', ''],
                        },
                        size: { width: 300, height: 120 },
                    }),
                ],
                [
                    `${theme} theme - additional props`,
                    createSpriteStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectDesktop',
                        knobs: {
                            options: [[]],
                            block: true,
                            Arrow: [false, undefined],
                            placeholder: 'Выберите элемент',
                            label: ['Элемент', ''],
                            hint: 'Hint',
                            error: '',
                            disabled: [false, true],
                        },
                        size: { width: 300, height: 120 },
                    }),
                ],
                [
                    `${theme} theme - additional props`,
                    createSpriteStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectDesktop',
                        knobs: {
                            options: [[]],
                            block: true,
                            Arrow: [false, undefined],
                            placeholder: 'Выберите элемент',
                            label: ['Элемент', ''],
                            hint: 'Hint',
                            error: 'Error',
                            disabled: [false, true],
                        },
                        size: { width: 300, height: 120 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 700,
                height: 100,
            },
            theme,
        })();

    ['default', 'click'].map(testCase);
});

describe(
    'Select',
    screenshotTesting({
        cases: [
            [
                'placeholder + label',
                createSpriteStorybookUrl({
                    packageName: 'select',
                    componentName: 'SelectDesktop',
                    knobs: {
                        options: JSON.stringify(options.slice(0, 1)),
                        selected: [undefined, options[0].key],
                        placeholder: ['', 'Выберите элемент'],
                        label: ['', 'Элемент'],
                        labelView: 'inner',
                    },
                    size: { width: 300, height: 120 },
                }),
            ],
            [
                'placeholder + label',
                createSpriteStorybookUrl({
                    packageName: 'select',
                    componentName: 'SelectDesktop',
                    knobs: {
                        options: JSON.stringify(options.slice(0, 1)),
                        selected: [undefined, options[0].key],
                        placeholder: ['', 'Выберите элемент'],
                        label: ['', 'Элемент'],
                        labelView: 'outer',
                    },
                    size: { width: 300, height: 120 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 700,
            height: 100,
        },
    }),
);

describe('Select | interactions tests', () => {
    const testCase = async (theme: string) =>
        test(`${theme} - open select, select one item`, async () => {
            const pageUrl = createStorybookUrl({
                packageName: 'select',
                componentName: 'SelectDesktop',
                knobs: {
                    block: true,
                    label: 'Элемент',
                    placeholder: 'Выберите элемент',
                    options: JSON.stringify(options),
                },
            });
            const { browser, context, page } = await openBrowserPage(`${pageUrl}&theme=${theme}`);

            const viewport = { width: 260, height: 768 };

            await page.setViewportSize(viewport);

            const match = async () => matchHtml({ context, page, expect, viewport });

            try {
                await match();

                await page.click('[role="combobox"]');

                await match();

                await page.click('[role="option"]');

                await match();

                await page.click('[role="combobox"]');

                await match();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error((error as Error).message);

                throw error;
            } finally {
                await closeBrowser({ browser, context, page });
            }
        });

    ['default', 'click'].map(testCase);

    test('Visible options', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'select',
            componentName: 'SelectDesktop',
            knobs: {
                block: true,
                label: 'Элемент',
                placeholder: 'Выберите элемент',
                visibleOptions: 3,
                options: JSON.stringify(options),
            },
        });
        const { browser, context, page } = await openBrowserPage(pageUrl);

        const viewport = { width: 260, height: 768 };

        await page.setViewportSize(viewport);

        try {
            await page.click('[role="combobox"]');

            await matchHtml({ context, page, expect, viewport });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('Long options', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'select',
            componentName: 'SelectDesktop',
            knobs: {
                block: true,
                label: 'Элемент',
                placeholder: 'Выберите элемент',
                optionsListWidth: 'field',
                options: JSON.stringify([
                    { key: '1', content: 'ВеликийНовгород' },
                    { key: '2', content: 'ГусьХрустальный' },
                    { key: '3', content: 'КаменскШахтинский' },
                    { key: '4', content: 'ОченьДлинноеНазвание' },
                ]),
            },
        });
        const { browser, context, page } = await openBrowserPage(pageUrl);

        const viewport = { width: 200, height: 768 };

        await page.setViewportSize(viewport);

        try {
            await page.click('[role="combobox"]');

            await matchHtml({ context, page, expect, viewport });

            await page.click('[role="option"]');

            await page.click('[role="combobox"]');

            await matchHtml({ context, page, expect, viewport });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

describe('Select | optgroup', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme}`,
                    createStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectDesktop',
                        knobs: {
                            options: JSON.stringify(groups),
                            selected: JSON.stringify(groups[0].options[1].key),
                            size: 64,
                            defaultOpen: true,
                            block: true,
                            placeholder: 'Выберите элемент',
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'click'].map(testCase);
});

describe('Select | multiple', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme}`,
                    createStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectDesktop',
                        knobs: {
                            options: JSON.stringify(options),
                            selected: JSON.stringify([options[0].key, options[1].key]),
                            multiple: true,
                            defaultOpen: true,
                            block: true,
                            placeholder: 'Выберите элемент',
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'click'].map(testCase);
});
