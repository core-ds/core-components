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
import {
    STYLES_URL,
    VENDOR_STYLES_URL,
    ScreenshotOpts,
    EvaluateFn,
} from './setupScreenshotTesting';

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

const getPageHtml = async (page: Page, css?: string) => {
    const [head, body] = await Promise.all([page?.innerHTML('head'), page?.innerHTML('body')]);

    return `<html><head><style>${css}</style>${head}</head><body style="font-family: var(--font-family)">${body}</body></html>`;
};

export type MatchHtmlParams = {
    page: Page;
    context: BrowserContext;
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

export const matchHtml = async ({
    page,
    context,
    css,
    expect,
    matchImageSnapshotOptions,
    screenshotOpts = screenshotDefaultOpts,
    evaluate,
    viewport = defaultViewport,
}: MatchHtmlParams) => {
    let pageHtml = await getPageHtml(page, css);

    let newPage = await context.newPage();

    await Promise.all([
        newPage.setViewportSize(viewport),
        newPage.route(/alfabank\.servicecdn\.ru/, proxyAssets),
        newPage.setContent(pageHtml),
    ]);

    if (evaluate) {
        await evaluate(newPage);
    }

    // отключаем анимацию.
    const image = await newPage.screenshot({ ...screenshotOpts, animations: 'disabled' });

    await newPage.close();

    try {
        expect(image).toMatchImageSnapshot({
            comparisonMethod: 'ssim',
            failureThreshold: 0.005,
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

    const [mainCss, vendorCss] = await Promise.all([
        axios.get(STYLES_URL, { responseType: 'text' }),
        axios.get(VENDOR_STYLES_URL, { responseType: 'text' }),
        page.goto(pageUrl),
    ]);

    const css = `${vendorCss?.data}\n${mainCss?.data}`;

    return { browser, context, page, css };
};

export const closeBrowser = async ({ page, context, browser }: CloseBrowserParams) => {
    await page.close();
    await context.close();
    await browser.close();
};
