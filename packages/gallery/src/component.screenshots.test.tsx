import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

import { TestIds } from './utils';

const clip = { x: 0, y: 0, width: 1024, height: 768 };

xdescribe('Gallery', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Gallery',
            knobs: {},
        },
        'transform:scale(0.9)',
        {
            evaluate: (page) => page.waitForTimeout(500),
        },
    ));

xdescribe('Gallery | interactions tests', () => {
    test('With single image', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Gallery',
            knobs: {},
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('#open-single-gallery-button');

            await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true, clip } });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('With multiple images', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Gallery',
            knobs: {},
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        const nextSlide = async () => {
            await page.click(`[data-test-id=${TestIds.NEXT_SLIDE_BUTTON}]`);

            await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true, clip } });
        };

        try {
            await page.click('#open-gallery-button');

            await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true, clip } });

            await nextSlide();
            await nextSlide();
            await nextSlide();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('Full screen', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Gallery',
            knobs: {},
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('#open-gallery-button');

            await page.click(`[data-test-id=${TestIds.FULLSCREEN_BUTTON}]`);

            await page.mouse.move(0, 0);

            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: { fullPage: true, clip },
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
