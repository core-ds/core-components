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
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Header presets', () => {
    return screenshotTesting({
        cases: [
            [
                '001 without header',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: false,
                    },
                }),
            ],
            [
                '002 only close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '003 only back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '004 close | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.hasCloser': true,
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '005 title | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '006 title | subtitle | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '007 title | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '008 title | subtitle | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '009 title | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '010 title | subtitle | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '011 relative | title | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '012 relative | title | subtitle | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '013 relative | title | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '014 relative | title | subtitle | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                    },
                }),
            ],
            [
                '015 relative | title | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
            [
                '016 relative | title | subtitle | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: false,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                    },
                }),
            ],
        ],
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: false,
        },
    })();
});

describe('Header presets | sticky', () => {
    return screenshotTesting({
        cases: [
            [
                '001 without header',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: false,
                        showMore: true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '002 only close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '003 only back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '004 close | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasCloser': true,
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '005 title | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '006 title | subtitle | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '007 relative | title | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '008 relative | title | subtitle | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '009 title | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '010 title | subtitle | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '011 relative | title | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '012 relative | title | subtitle | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '013 relative | title | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '014 relative | title | subtitle | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '015 relative | title | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '016 relative | title | subtitle | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
        ],
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: false,
        },
    })();
});

describe('Header presets | sticky | scroll', () => {
    return screenshotTesting({
        cases: [
            [
                '001 without header',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: false,
                        showMore: true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '002 only close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '003 only back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '004 close | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.hasCloser': true,
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '005 title | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '006 title | subtitle | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '007 relative | title | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '008 relative | title | subtitle | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '009 title | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '010 title | subtitle | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'left',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '011 relative | title | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '012 relative | title | subtitle | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '013 relative | title | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '014 relative | title | subtitle | back',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '015 relative | title | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
            [
                '016 relative | title | subtitle | back | close',
                createStorybookUrl({
                    componentName: 'UniversalModal',
                    subComponentName: 'Mobile',
                    testStory: false,
                    knobs: {
                        open: true,
                        header: true,
                        showMore: true,
                        'header.headerMode': 'relative',
                        'header.title': 'Заголовок',
                        'header.subtitle': 'Subtitle',
                        'header.hasBackButton': true,
                        'header.hasCloser': true,
                        'header.sticky': true,
                    },
                }),
            ],
        ],
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: false,
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
