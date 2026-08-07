import {
    setupScreenshotTesting,
    generateTestCases,
    customSnapshotIdentifier,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    waitForPreviewShowed,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Mobile',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'footer.sticky': true,
                    showMore: [false, true],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'footer.sticky': true,
                    'footer.layout': ['column'],
                },
            }),
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Mobile | title alignment',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    showMore: true,
                    'header.hasBackButton': true,
                    'header.hasCloser': true,
                    'header.sticky': [true, false],
                    'header.align': ['left', 'center'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    showMore: true,
                    'header.sticky': true,
                    'header.hasBackButton': false,
                    'header.hasCloser': true,
                    'header.align': ['left', 'center'],
                },
            }),
        ],
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Mobile | animated title alignment',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            subComponentName: 'Mobile',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                showMore: true,
                'header.sticky': true,
                'header.hasBackButton': true,
                'header.hasCloser': true,
                'header.align': ['left', 'center'],
            },
        }),
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: async (page) => {
            await page.waitForTimeout(500);
            await page.$eval('button[class*=showMoreButton]', (el) => {
                el.scrollIntoView();
            });
            await page.waitForTimeout(500);
        },
    }),
);

describe('Mobile | title transition', () => {
    const scrollStops = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    test('sticky=true | hasBackButton=true | hasCloser=true', async () => {
        const pageUrl = createStorybookUrl({
            testStory: false,
            componentName: 'UniversalModal',
            subComponentName: 'Mobile',
            knobs: {
                open: true,
                header: true,
                showMore: true,
                'header.sticky': true,
                'header.hasBackButton': true,
                'header.hasCloser': true,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        const scrollTo = (top: number) =>
            page.$eval(
                'div[role="dialog"] div[class*=component]',
                (el, value) => {
                    el.scrollTop = value;
                },
                top,
            );

        try {
            await waitForPreviewShowed(page);
            await page.waitForTimeout(500);

            for (const top of scrollStops) {
                await scrollTo(top);
                await page.waitForTimeout(500);

                await matchHtml({
                    context,
                    page,
                    expect,
                    viewport: {
                        width: 320,
                        height: 600,
                    },
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

describe('Mobile | trim title', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        trim: [false, true],
                        header: true,
                        'header.title': [
                            'Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок',
                        ],
                    },
                }),
                ...generateTestCases({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.title': [
                            'Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок',
                        ],
                        'header.subtitle': [
                            'Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок',
                        ],
                        titleSize: 'compact',
                    },
                }),
            ],
            viewport: {
                width: 320,
                height: 600,
            },
            screenshotOpts: {
                fullPage: true,
            },
            theme,
            matchImageSnapshotOptions: {
                failureThreshold: 1,
                failureThresholdType: 'pixel',
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
        })();

    ['default'].forEach((theme) => testCase(theme));
});

describe('Mobile | sticky header', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        showMore: true,
                        header: true,
                        'header.sticky': [false, true],
                    },
                }),
            ],
            viewport: {
                width: 320,
                height: 600,
            },
            screenshotOpts: {
                fullPage: true,
            },
            evaluate: async (page) => {
                await page.waitForTimeout(500);
                await page.$eval('button[class*=showMoreButton]', (el) => {
                    el.scrollIntoView();
                });
                await page.waitForTimeout(500);
            },
            matchImageSnapshotOptions: {
                failureThreshold: 1,
                failureThresholdType: 'pixel',
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
        })();

    ['default'].forEach((theme) => testCase(theme));
});

describe('Mobile | header bottom addons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.title': 'Title',
                        'header.bottomAddons': ['BottomAddons'],
                    },
                }),
            ],
            viewport: {
                width: 320,
                height: 600,
            },
            screenshotOpts: {
                fullPage: true,
            },
            theme,
            matchImageSnapshotOptions: {
                failureThreshold: 1,
                failureThresholdType: 'pixel',
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
        })();

    ['default'].forEach((theme) => testCase(theme));
});
