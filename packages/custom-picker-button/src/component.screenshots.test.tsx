// /* eslint-disable no-await-in-loop */
// /* eslint-disable no-restricted-syntax */
import {
    openBrowserPage,
    closeBrowser,
    matchHtml,
    createStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const options = [
    { key: '4', content: 'Открыть' },
    { key: '5', content: 'Сохранить' },
    { key: '6', content: 'Удалить' },
];

describe('CustomPickerButton', () => {
    createPreview(
        {
            componentName: 'CustomPickerButton',
            knobs: {
                options: JSON.stringify(options),
                label: 'Кнопка',
                size: 72,
            },
        },
        'width:800px;transform:scale(2.3)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );

    xit('desktop opened', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'CustomPickerButton',
            subComponentName: 'CustomPickerButtonDesktop',
            testStory: false,
            knobs: {
                options: JSON.stringify(options),
                label: 'Открыть',
                block: true,
                backgroundColor: 'rgba(74, 242, 253, 1)',
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.goto(pageUrl);

            await page.click('button[class*=component]');

            await matchHtml({ context, page, expect });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

describe('CustomPickerButton', () => {
    it('mobile opened', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'CustomPickerButton',
            subComponentName: 'CustomPickerButtonMobile',
            testStory: false,
            knobs: {
                options: JSON.stringify(options),
                label: 'Открыть',
                backgroundColor: 'rgba(74, 242, 253, 1)',
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.goto(pageUrl);

            await page.click('button[class*=component]');

            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: {
                    fullPage: true,
                },
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
