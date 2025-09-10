import { type Browser, type BrowserContext, chromium, type Page } from 'playwright';

import { defaultViewport, matchHtml } from './helpers';
import { type ScreenshotTestingParams } from './types';

export const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:9009/iframe.html';

export const setupScreenshotTesting =
    ({
        it,
        beforeAll,
        afterAll,
        expect,
    }: {
        it: jest.It;
        beforeAll: jest.Lifecycle;
        afterAll: jest.Lifecycle;
        expect: jest.Expect;
    }) =>
    ({ cases, theme, ...matchHtmlArgs }: ScreenshotTestingParams) =>
    () => {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;

        beforeAll(async () => {
            browser = await chromium.launch();
            context = await browser.newContext({ viewport: defaultViewport });
            page = await context.newPage();
        });

        afterAll(async () => {
            await browser.close();
        });

        it.each(cases)('%s', async (_, link: string) => {
            // TODO
            await page?.goto(encodeURI(link + (theme ? `&theme=${theme}` : '')), {
                timeout: 200000,
            });

            await matchHtml({ context, page, expect, ...matchHtmlArgs });
        });
    };
