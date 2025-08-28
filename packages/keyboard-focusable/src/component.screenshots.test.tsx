import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    waitForPreviewShowed,
} from '@alfalab/core-components-screenshot-utils';

const clip = { x: 0, y: 0, width: 300, height: 100 };

describe('KeyboardFocusable | interactions tests', () => {
    test('Focus on button', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: 'primary',
            },
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await waitForPreviewShowed(page);
            await page.press('#storybook-root', 'Tab');

            await matchHtml({ context, page, expect, screenshotOpts: { clip } });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('Focus on input', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Input',
            knobs: {
                label: 'Label',
            },
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await waitForPreviewShowed(page);
            await page.press('#storybook-root', 'Tab');

            await matchHtml({ context, page, expect, screenshotOpts: { clip } });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
