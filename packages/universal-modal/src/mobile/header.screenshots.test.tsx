import {
    setupScreenshotTesting,
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
                'header.title': 'Заголовок',
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
                'header.title': 'Заголовок',
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
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.headerMode': 'absolute',
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
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.headerMode': 'absolute',
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
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.headerMode': 'absolute',
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
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'absolute',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
                        'header.headerMode': 'relative',
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
