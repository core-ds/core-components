import {
    closeBrowser,
    createPreview,
    createStorybookUrl,
    matchHtml,
    openBrowserPage,
} from '../../screenshot-utils';

const clip = { x: 0, y: 0, width: 400, height: 74 };

describe('StepperInput ', () => {
    createPreview(
        {
            packageName: 'stepper-input',
            componentName: 'StepperInputDesktop',
            knobs: {
                value: 1,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
    );

    test('active state', async () => {
        const pageUrl = createStorybookUrl({
            packageName: 'stepper-input',
            componentName: 'StepperInputDesktop',
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('input');

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
