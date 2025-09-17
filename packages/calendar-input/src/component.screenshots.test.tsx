import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

describe('CalendarInput', () =>
    createPreview(
        {
            componentName: 'CalendarInput',
            knobs: {
                size: 56,
                value: '01.01.2023',
                label: 'Дата',
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('CalendarInput | interactions tests', () => {
    test('Open calendar', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'CalendarInput',
            knobs: {
                value: '25.03.2021',
                label: 'Дата регистрации',
                defaultMonth: 1613310391747,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await matchHtml({ context, page, expect });

            await page.click('input');

            await matchHtml({
                context,
                page,
                expect,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
