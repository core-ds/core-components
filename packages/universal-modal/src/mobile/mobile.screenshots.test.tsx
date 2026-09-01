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

describe('Mobile | title alignment', () => {
    return screenshotTesting({
        cases: [
            [
                'hasBackButton | hasCloser | sticky=false | mainAlign=left',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': false,
                        'header.mainAlign': 'left',
                    },
                }),
            ],
            [
                'hasBackButton | hasCloser | sticky=true | mainAlign=left',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                        'header.mainAlign': 'left',
                    },
                }),
            ],
            [
                'hasBackButton | hasCloser | sticky=false | mainAlign=center',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': false,
                        'header.mainAlign': 'center',
                    },
                }),
            ],
            [
                'hasBackButton | hasCloser | sticky=true | mainAlign=center',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                        'header.mainAlign': 'center',
                    },
                }),
            ],
            [
                'sticky | hasBackButton | hasCloser | mainAlign=left',
                createStorybookUrl({
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
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                    },
                }),
            ],
            [
                'sticky | hasBackButton | hasCloser | mainAlign=center',
                createStorybookUrl({
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
                        'header.mainAlign': 'center',
                    },
                }),
            ],
        ],
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: true,
        },
    })();
});

describe('Mobile | animated title alignment', () => {
    return screenshotTesting({
        cases: [
            [
                'sticky=true | hasBackButton=true | hasCloser=true | mainAlign=left',
                createStorybookUrl({
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
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                    },
                }),
            ],
            [
                'sticky=true | hasBackButton=true | hasCloser=true | mainAlign=center',
                createStorybookUrl({
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
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                    },
                }),
            ],
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
    })();
});

describe('Mobile | title transition', () => {
    test('sticky=true | hasBackButton=true | hasCloser=true', async () => {
        const scrollStops = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

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
                'header.textAlign': 'center',
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

    test('sticky=true | header.leftAddons=true | header.rightAddons=true', async () => {
        const scrollStops = [0, 25, 50, 75, 100];

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
                'header.leftAddons': true,
                'header.rightAddons': true,
                'header.textAlign': 'center',
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

describe('Mobile | addons position', () => {
    return screenshotTesting({
        cases: [
            [
                '001 | back | close | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                    },
                }),
            ],
            [
                '002 | back | close | align=center | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '003 | back | close | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '004 | back | close | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                    },
                }),
            ],
            [
                '005 | close | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '006 | close | align=center | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '007 | close | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '008 | close | align=center | leftAddons | bigRightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                    },
                }),
            ],
            [
                '009 | back | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '010 | back | align=center | leftAddons | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '011 | back | align=center | leftAddons',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.leftAddons': true,
                    },
                }),
            ],
            [
                '012 | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                    },
                }),
            ],
            [
                '013 | align=center | leftAddons | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '014 | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '015 | align=center | leftAddons | rightAddon | bigRightAddons',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                    },
                }),
            ],
            [
                '016 | align=left | back | close | leftAddons | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '017 | align=left | back | close | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '018 | align=left | back | close | rightAddon | bigRightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '019 | align=left | back | close | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '020 | align=left | close | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '021 | align=left | close | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.rightAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '022 | align=left | close | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '023 | align=left | back | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '024 | align=left | back | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '025 | align=left | back | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '026 | align=left | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '027 | align=left | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                    },
                }),
            ],
            [
                '028 | align=left | close | bigLeftAddons',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        titleSize: 'compact',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        'header.leftAddons': true,
                        'header.bigLeftAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
        ],
        viewport: {
            width: 360,
            height: 720,
        },
    })();
});

describe('Mobile | addons position interactive', () => {
    return screenshotTesting({
        cases: [
            [
                '001 | back | close | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        showMore: true,
                    },
                }),
            ],
            [
                '002 | back | close | align=center | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        showMore: true,
                    },
                }),
            ],
            [
                '003 | back | close | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.rightAddons': true,
                        showMore: true,
                    },
                }),
            ],
            [
                '004 | back | close | align=center | rightAddon | bigRightAddons',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                        showMore: true,
                    },
                }),
            ],
            [
                '005 | close | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        showMore: true,
                    },
                }),
            ],
            [
                '006 | close | align=center | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '007 | close | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        showMore: true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '008 | close | align=center | leftAddons | bigRightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                    },
                }),
            ],
            [
                '009 | back | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        showMore: true,
                    },
                }),
            ],
            [
                '010 | back | align=center | leftAddons | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '011 | back | align=center | leftAddons',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        showMore: true,
                        'header.leftAddons': true,
                    },
                }),
            ],
            [
                '012 | align=center',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                    },
                }),
            ],
            [
                '013 | align=center | leftAddons | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '014 | align=center | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '015 | align=center | leftAddon | rightAddon | bigRightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'center',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                    },
                }),
            ],
            [
                '016 | align=left | back | close | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '017 | align=left | back | close | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '018 | align=left | back | close | rightAddon | bigRightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.rightAddons': true,
                        'header.bigRightAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '019 | align=left | back | close | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '020 | align=left | close | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '021 | align=left | close | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.rightAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '022 | align=left | close | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '023 | align=left | back | leftAddon | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '024 | align=left | back | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '025 | align=left | back | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.rightAddons': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '026 | align=left | rightAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.rightAddons': true,
                    },
                }),
            ],
            [
                '027 | align=left | leftAddon',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                    },
                }),
            ],
            [
                '028 | align=left | close | bigLeftAddons',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    knobs: {
                        open: true,
                        header: true,
                        'header.sticky': true,
                        titleSize: 'default',
                        'header.mainAlign': 'left',
                        'header.textAlign': 'center',
                        'header.title': 'Заголовок',
                        showMore: true,
                        'header.leftAddons': true,
                        'header.bigLeftAddons': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
        ],
        viewport: {
            width: 360,
            height: 720,
        },
        evaluate: async (page) => {
            await page.waitForTimeout(500);
            await page.$eval('button[class*=showMoreButton]', (el) => {
                el.scrollIntoView();
            });
            await page.waitForTimeout(500);
        },
    })();
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
