/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import {
    generateTestCases,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

describe('Tooltip', () => {
    createPreview(
        {
            componentName: 'Tooltip',
            subComponentName: 'TooltipDesktop',
            testStory: false,
            knobs: {
                open: true,
                position: 'top',
            },
        },
        'alignItems:flex-start;paddingTop:332px',
        {
            matchImageSnapshotOptions: {
                failureThreshold: 0.005,
            },
        },
    );

    test('positioning', async () => {
        jest.setTimeout(120000);

        const cases = generateTestCases({
            componentName: 'Tooltip',
            subComponentName: 'TooltipDesktop',
            testStory: false,
            knobs: {
                open: true,
                onOpenDelay: 0,
                position: [
                    'top',
                    'bottom',
                    'right',
                    'left',
                    'top-start',
                    'top-end',
                    'bottom-start',
                    'bottom-end',
                    'right-start',
                    'right-end',
                    'left-start',
                    'left-end',
                ],
            },
        });

        const { browser, context, page } = await openBrowserPage(cases[0][1]);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, pageUrl] of cases) {
            try {
                await page.goto(pageUrl);

                await page.hover('*[class*=target]');

                await matchHtml({
                    context,
                    page,
                    expect,
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error((error as Error).message);

                throw error;
            }
        }

        await closeBrowser({ browser, context, page });
    });

    test('hint view and colors', async () => {
        jest.setTimeout(120000);

        const cases = generateTestCases({
            componentName: 'Tooltip',
            subComponentName: 'TooltipDesktop',
            testStory: false,
            knobs: {
                open: true,
                onOpenDelay: 0,
                position: 'top',
                view: 'hint',
                colors: ['default', 'inverted'],
            },
        });

        const { browser, context, page } = await openBrowserPage(cases[0][1]);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, pageUrl] of cases) {
            try {
                await page.goto(pageUrl);

                await page.hover('*[class*=target]');

                await matchHtml({
                    context,
                    page,
                    expect,
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error((error as Error).message);

                throw error;
            }
        }

        await closeBrowser({ browser, context, page });
    });

    test('tooltip view and colors', async () => {
        jest.setTimeout(120000);

        const cases = generateTestCases({
            componentName: 'Tooltip',
            subComponentName: 'TooltipDesktop',
            testStory: false,
            knobs: {
                open: true,
                onOpenDelay: 0,
                position: 'top',
                view: 'tooltip',
                colors: ['default', 'inverted'],
            },
        });

        const { browser, context, page } = await openBrowserPage(cases[0][1]);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, pageUrl] of cases) {
            try {
                await page.goto(pageUrl);

                await page.hover('*[class*=target]');

                await matchHtml({
                    context,
                    page,
                    expect,
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error((error as Error).message);

                throw error;
            }
        }

        await closeBrowser({ browser, context, page });
    });
});
