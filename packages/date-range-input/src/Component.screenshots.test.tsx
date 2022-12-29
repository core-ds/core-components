import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    openBrowserPage,
    createStorybookUrl,
    matchHtml,
    closeBrowser,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'DateRangeInput | sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateRangeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021 - 10.04.2022', '02.03.2002 - 10.06.2010'],
                        size: ['s', 'm', 'l'],
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
    'DateRangeInput | error',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateRangeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021 - 10.04.2022', '02.03.2002 - 10.06.2010'],
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
    'DateRangeInput | hint',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateRangeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021 - 10.04.2022', '02.03.2002 - 10.06.2010'],
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
    'DateRangeInput | label',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateRangeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021 - 10.04.2022', '02.03.2002 - 10.06.2010'],
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
    'DateRangeInput | placeholder',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateRangeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021 - 10.04.2022', '02.03.2002 - 10.06.2010'],
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

describe('DateRangeInput | picker', () => {
    test('open calendar', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'DateRangeInput',
            testStory: false,
            knobs: {
                picker: true,
                size: 'm',
                defaultMonth: 1769310391747,
            },
        });

        const { browser, context, page, css } = await openBrowserPage(pageUrl);

        try {
            await page.click('input');

            await matchHtml({ context, page, expect, css, screenshotOpts: { fullPage: true } });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
