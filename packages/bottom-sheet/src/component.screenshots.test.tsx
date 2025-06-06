import {
    setupScreenshotTesting,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    Knobs,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('BottomSheet', () =>
    createPreview(
        {
            componentName: 'BottomSheet',
            testStory: false,
            knobs: {
                open: true,
                title: 'Заголовок',
                titleAlign: 'left',
                hideOverlay: true,
                hasCloser: true,
            },
        },
        'transform:scale(1.3);top:250px;maxWidth:500px;',
        {
            viewport: {
                width: 860,
                height: 600,
            },
            screenshotOpts: {
                clip: {
                    x: 8,
                    y: 8,
                    width: 860,
                    height: 600,
                },
            },
        },
    ));

describe(
    'BottomSheet',
    screenshotTesting({
        cases: [
            [
                'title-align-left',
                createStorybookUrl({
                    componentName: 'BottomSheet',
                    knobs: {
                        open: true,
                        title: 'Заголовок',
                        children: 'Контент',
                        titleAlign: 'left',
                    },
                }),
            ],
            [
                'no-title',
                createStorybookUrl({
                    componentName: 'BottomSheet',
                    knobs: {
                        open: true,
                        children: 'Контент',
                        hasCloser: true,
                        hasBacker: true,
                    },
                }),
            ],
            [
                'full-header-small-height',
                createStorybookUrl({
                    componentName: 'BottomSheet',
                    knobs: {
                        open: true,
                        children: 'Контент',
                        titleAlign: 'center',
                        title: 'Заголовок',
                        hasCloser: true,
                        hasBacker: true,
                    },
                }),
            ],
            [
                'full-header-full-height',
                createStorybookUrl({
                    componentName: 'BottomSheet',
                    knobs: {
                        open: true,
                        children: 'Контент',
                        titleAlign: 'center',
                        title: 'Заголовок',
                        hasCloser: true,
                        hasBacker: true,
                        initialHeight: 'full',
                    },
                }),
            ],
            [
                'left-title-with-closer',
                createStorybookUrl({
                    componentName: 'BottomSheet',
                    knobs: {
                        open: true,
                        children: 'Контент',
                        titleAlign: 'left',
                        title: 'Заголовок',
                        hasCloser: true,
                    },
                }),
            ],
            [
                'no-header-no-footer',
                createStorybookUrl({
                    componentName: 'BottomSheet',
                    knobs: {
                        open: true,
                        children: 'Контент',
                        hideHeader: true,
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe('BottomSheet | inverted views', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme inverted`,
                    createStorybookUrl({
                        componentName: 'BottomSheet',
                        knobs: {
                            open: true,
                            title: 'Заголовок',
                            titleAlign: 'center',
                            children: 'Контент',
                            hasCloser: true,
                            hasBacker: true,
                            hideOverlay: false,
                            colors: 'inverted',
                            initialHeight: 'full',
                            renderActionButton: true,
                            backgroundColor: 'secondary',
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'click', 'corp', 'site', 'mobile', 'intranet'].map(testCase);
});

describe('BottomSheet | interactions tests', () => {
    test('Open sheet', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'BottomSheet',
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('#button-1');

            await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true } });

            await page.reload();

            await page.click('#button-2');

            await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true } });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

const magneticAreaTest = async (knobs: Knobs) => {
    const pageUrl = createStorybookUrl({
        componentName: 'BottomSheet',
        testStory: true,
        knobs: {
            open: true,
            initialHeight: 'full',
            magneticAreas: '[0,200,-24]',
            children: 'Magnetic areas test',
            ...knobs,
        },
    });

    const { browser, context, page } = await openBrowserPage(pageUrl);

    try {
        await matchHtml({ context, page, expect, screenshotOpts: { fullPage: true } });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error((error as Error).message);

        throw error;
    } finally {
        await closeBrowser({ browser, context, page });
    }
};

describe('BottomSheet | magnetic areas', () => {
    test('200', () => magneticAreaTest({ initialActiveAreaIndex: 1 }));
    test('100%', () => magneticAreaTest({ initialActiveAreaIndex: 2 }));
    test('negative 200px', () => magneticAreaTest({ magneticAreas: '[0,-200]' }));
});
