import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('DateTimeInput', () =>
    createPreview(
        {
            componentName: 'DateTimeInput',
            knobs: {
                size: 56,
                value: '01.01.2023, 12:48',
                label: 'Дата и время',
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'DateTimeInput | sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        size: [48, 56, 64],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateTimeInput | error',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        error: [false, true],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateTimeInput | hint',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        hint: [null, 'Hint'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateTimeInput | label',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        label: [null, 'Label'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateTimeInput | placeholder',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        placeholder: [null, 'placeholder'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe('DateTimeInput | picker', () => {
    test('open calendar', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'DateTimeInput',
            testStory: false,
            knobs: {
                picker: true,
                size: 56,
                defaultMonth: 1769310391747,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('input');

            await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true } });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
