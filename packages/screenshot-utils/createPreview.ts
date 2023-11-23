/* eslint-disable no-underscore-dangle */
import { createStorybookUrl, CreateStorybookUrlParams } from './createStorybookUrl';
import { closeBrowser, matchHtml, MatchHtmlParams, openBrowserPage } from './helpers';

function runTest(
    { darkMode, ...restUrlParams }: CreateStorybookUrlParams,
    wrapperStyles: string,
    {
        viewport = { width: 800, height: 600 },
        screenshotOpts = {
            clip: {
                x: 88,
                y: 68,
                width: 640,
                height: 480,
            },
        },
        ...restMatchParams
    }: Omit<MatchHtmlParams, 'css' | 'context' | 'page' | 'expect'>,
) {
    test(`${darkMode ? 'dark-' : ''}preview`, async () => {
        const pageUrl = createStorybookUrl({
            darkMode,
            wrapperStyles:
                `boxSizing:border-box; display: flex; alignItems: center; justifyContent: center; width: ${viewport.width}px; height: ${viewport.height}px; backgroundColor: var(--color-light-base-bg-alt-primary)`.concat(
                    wrapperStyles ? `;${wrapperStyles}` : '',
                ),
            ...restUrlParams,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await matchHtml({
                ...restMatchParams,
                context,
                page,
                expect,
                viewport,
                screenshotOpts,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
}

export function createPreview(
    urlParams: CreateStorybookUrlParams,
    wrapperStyles = '',
    matchParams: Omit<MatchHtmlParams, 'css' | 'context' | 'page' | 'expect'> = {},
) {
    runTest({ ...urlParams, darkMode: false }, wrapperStyles, matchParams);
    runTest({ ...urlParams, darkMode: true }, wrapperStyles, matchParams);
}
