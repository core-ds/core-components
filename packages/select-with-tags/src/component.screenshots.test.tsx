import {
    createStorybookUrl,
    closeBrowser,
    matchHtml,
    openBrowserPage,
} from '../../screenshot-utils';

const ENTRY_TO_COMPONENT_NAME = {
    desktop: 'SelectWithTagsDesktop',
    mobile: 'SelectWithTagsMobile',
} as const;

const ENTRIES = ['desktop', 'mobile'] as const;

const viewport = { width: 450, height: 900 };
const screenshotOpts = {
    clip: {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
    },
    fullPage: false,
    omitBackground: false,
};

describe('SelectWithTags', () => {
    test('hover & pressed', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'SelectWithTags',
            subComponentName: 'SelectWithTagsDesktop',
            testStory: false,
            knobs: {},
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('[role="combobox"]');

            await page.click('[data-index="3"] [role="option"]', { delay: 100 });
            await page.click('[data-index="4"] [role="option"]', { delay: 100 });
            await page.click('[data-index="5"] [role="option"]', { delay: 100 });

            await matchHtml({
                page,
                expect,
                viewport,
                screenshotOpts,
                evaluate: (remotePage) =>
                    remotePage
                        .hover('[class*=tagCross]')
                        .then(() => remotePage.mouse.down())
                        .then(() => remotePage.waitForTimeout(300)),
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    ENTRIES.forEach((entry) => {
        test(`main scenario ${entry}`, async () => {
            const pageUrl = createStorybookUrl({
                componentName: 'SelectWithTags',
                subComponentName: ENTRY_TO_COMPONENT_NAME[entry],
                testStory: false,
                knobs: {},
            });

            const { browser, context, page } = await openBrowserPage(pageUrl);

            const match = () =>
                matchHtml({
                    page,
                    expect,
                    viewport,
                    screenshotOpts,
                });

            try {
                await page.click('[role="combobox"]');

                await page.waitForTimeout(500);

                await page.click('[data-index="0"] [role="option"]', { delay: 100 });

                await page.click('[data-index="1"] [role="option"]', { delay: 100 });
                await page.click('[data-index="2"] [role="option"]', { delay: 100 });

                await page.fill('input', 'sadsadad');

                await match();

                await page.fill('input', 'niu');

                await match();

                await page.click('[data-index="0"] [role="option"]', { delay: 100 });

                await match();

                await page.click('[data-index="3"] [role="option"]', { delay: 100 });

                await match();

                if (entry === 'mobile') {
                    await page.getByText('Применить').click();
                }

                await page.click('[data-collapse]');

                await match();

                await page.click('[class*=tagCross]');

                await match();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error((error as Error).message);
            } finally {
                await closeBrowser({ browser, context, page });
            }
        });

        test(`collapseTagList ${entry}`, async () => {
            const pageUrl = createStorybookUrl({
                componentName: 'SelectWithTags',
                subComponentName: ENTRY_TO_COMPONENT_NAME[entry],
                testStory: false,
                knobs: {
                    collapseTagList: false,
                },
            });

            const { browser, context, page } = await openBrowserPage(pageUrl);

            const match = () =>
                matchHtml({
                    page,
                    expect,
                    viewport,
                    screenshotOpts,
                    evaluate: (p) => p.hover('[data-index="0"] [role="option"]'),
                });

            try {
                await page.click('[role="combobox"]');

                await page.waitForTimeout(500);

                await page.click('[data-index="4"] [role="option"]', { delay: 100 });
                await page.click('[data-index="5"] [role="option"]', { delay: 100 });
                await page.click('[data-index="6"] [role="option"]', { delay: 100 });

                await match();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error((error as Error).message);
            } finally {
                await closeBrowser({ browser, context, page });
            }
        });
    });
});
