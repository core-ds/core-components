import {
    setupScreenshotTesting,
    generateTestCases,
    customSnapshotIdentifier,
    createStorybookUrl,
} from '@alfalab/core-components-screenshot-utils';
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Mobile | show more',
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
                    'header.title': 'Заголовок',
                },
            }),
        ],
        screenshotOpts: {
            fullPage: false,
        },
        viewport: {
            width: 1024,
            height: 768,
        },
        evaluate: (page: Page) => page.waitForTimeout(300),
    }),
);

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
                    'footer.layout': ['column'],
                    'header.title': 'Заголовок',
                },
            }),
        ],
        screenshotOpts: {
            fullPage: false,
        },
        viewport: {
            width: 1024,
            height: 768,
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
                        'header.mainAlign': 'relative',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'relative',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'absolute',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'absolute',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'relative',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'absolute',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'relative',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'absolute',
                        'header.title': 'Заголовок',
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
                        'header.mainAlign': 'relative',
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
                        'header.title': 'Заголовок',
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
