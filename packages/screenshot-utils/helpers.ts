/* eslint-disable */
import {
    Browser,
    Page,
    BrowserContext,
    BrowserType,
    FirefoxBrowser,
    WebKitBrowser,
    ChromiumBrowser,
    chromium,
    Route,
    Request,
    BrowserContextOptions,
} from 'playwright';
import axios from 'axios';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import kebab from 'lodash.kebabcase';
import { ScreenshotOpts, EvaluateFn } from './setupScreenshotTesting';

type CustomSnapshotIdentifierParams = {
    currentTestName: string;
    counter: number;
    defaultIdentifier: string;
    testPath: string;
};

type CloseBrowserParams = {
    page: Page;
    context: BrowserContext;
    browser: Browser;
};

export const defaultViewport = { width: 1024, height: 768 };

/**
 * Удаляем из названия теста лишнюю информацию, чтобы имя файла было короче
 */
export const customSnapshotIdentifier = ({
    currentTestName,
    counter,
}: CustomSnapshotIdentifierParams) => {
    return kebab(`${currentTestName}${counter > 1 ? `-${counter}` : ''}-snap`);
};

export type MatchHtmlParams = {
    page: Page;
    context?: BrowserContext;
    css?: string;
    expect: any;
    matchImageSnapshotOptions?: MatchImageSnapshotOptions;
    screenshotOpts?: ScreenshotOpts;
    evaluate?: EvaluateFn;
    viewport?: { width: number; height: number };
};

const screenshotDefaultOpts = {
    clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 500,
    },
    fullPage: false,
    omitBackground: false,
};

const proxyAssets = async (route: Route, request: Request) => {
    try {
        const img = await axios.get(request.url(), { responseType: 'arraybuffer' });

        await route.fulfill({
            status: 200,
            body: img.data,
            contentType: 'image/svg+xml',
        });
    } catch (err) {
        await route.abort();
    }
};

//Ждем пока загрузится превью
export async function waitForPreviewShowed(page: Page) {
    const preview = page.locator('#storybook-root > .sb-unstyled');
    await preview.waitFor({ state: 'attached' });
}

export const matchHtml = async ({
    page,
    expect,
    matchImageSnapshotOptions,
    screenshotOpts = screenshotDefaultOpts,
    evaluate,
    viewport = defaultViewport,
}: MatchHtmlParams) => {
    await Promise.all([
        page.addStyleTag({
            content: `
                :root{
                  --font-family: "Inter", sans-serif;
                  --font-family-system: "Inter", sans-serif;
                }
            `,
        }),
        page.setViewportSize(viewport),
        page.route(/alfabank\.servicecdn\.ru/, proxyAssets),
    ]);

    await waitForPreviewShowed(page);

    if (evaluate) {
        await evaluate(page);
    }

    // отключаем анимацию.
    const image = await page.screenshot({ ...screenshotOpts, animations: 'disabled' });

    try {
        expect(image).toMatchImageSnapshot({
            comparisonMethod: 'ssim',
            failureThreshold: 0.001,
            failureThresholdType: 'percent',
            customSnapshotIdentifier,
            ...matchImageSnapshotOptions,
        });
    } catch (e) {
        console.error(page.url());
        throw e;
    }
};

export const openBrowserPage = async (
    pageUrl: string,
    browserType: BrowserType<ChromiumBrowser | FirefoxBrowser | WebKitBrowser> = chromium,
    contextOptions?: BrowserContextOptions,
) => {
    const browser = await browserType.launch();
    const context = await browser.newContext({ viewport: defaultViewport, ...contextOptions });
    const page = await context.newPage();

    await page.goto(pageUrl);

    return { browser, context, page };
};

export const closeBrowser = async ({ page, context, browser }: CloseBrowserParams) => {
    await page.close();
    await context.close();
    await browser.close();
};
