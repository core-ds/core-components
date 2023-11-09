import {
    setupScreenshotTesting,
    createStorybookUrl,
    createSpriteStorybookUrl,
    openBrowserPage,
    closeBrowser,
    matchHtml,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('InternationalPhoneInput', () =>
    createPreview(
        {
            componentName: 'InternationalPhoneInput',
            knobs: {
                label: 'Телефон',
                value: '+7 999 555-35-35',
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'InternationalPhoneInputDesktop',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'international-phone-input',
                    componentName: 'InternationalPhoneInputDesktop',
                    size: { width: 300, height: 70 },
                    knobs: {
                        value: ['', '79999999999', '77777777777'],
                        block: true,
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1000, height: 100 },
        },
    }),
);

describe('InternationalPhoneInputDesktop | interactions', () => {
    test('flag select', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'international-phone-input',
            componentName: 'InternationalPhoneInputDesktop',
            knobs: { block: true },
            wrapperStyles: 'width:320px',
        });
        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('[role="combobox"]');

            await matchHtml({
                page,
                expect,
                screenshotOpts: { clip: { x: 0, y: 0, width: 400, height: 400 } },
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            throw e;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('autocomplete', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'international-phone-input',
            componentName: 'InternationalPhoneInputDesktop',
            knobs: {
                block: true,
                options: JSON.stringify([{ key: '8 999 999 99 99' }, { key: '8 888 888 88 88' }]),
            },
            wrapperStyles: 'width:320px',
        });
        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('input');

            await matchHtml({
                page,
                expect,
                screenshotOpts: { clip: { x: 0, y: 0, width: 400, height: 400 } },
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            throw e;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

describe('InternationalPhoneInputMobile | interactions', () => {
    test('flag select', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'international-phone-input',
            componentName: 'InternationalPhoneInputMobile',
            knobs: { block: true },
            wrapperStyles: 'width:320px',
        });
        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('[role="combobox"]');

            await matchHtml({
                page,
                expect,
                screenshotOpts: { fullPage: true },
                viewport: { width: 360, height: 640 },
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            throw e;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('autocomplete', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'international-phone-input',
            componentName: 'InternationalPhoneInputMobile',
            knobs: {
                block: true,
                options: JSON.stringify([{ key: '8 999 999 99 99' }, { key: '8 888 888 88 88' }]),
            },
            wrapperStyles: 'width:320px',
        });
        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('div[class^="form-control__inputWrapper"]');

            await matchHtml({
                page,
                expect,
                screenshotOpts: { fullPage: true },
                viewport: { width: 360, height: 640 },
                evaluate: (page) => page.click('input'),
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            throw e;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
