import {
    setupScreenshotTesting,
    generateTestCases,
    customSnapshotIdentifier,
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
                    'header.title': 'Заголовок',
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
                    'header.title': 'Заголовок',
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
                    'header.title': 'Заголовок',
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
                    'header.title': 'Заголовок',
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
                'header.title': 'Заголовок',
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
                        'header.title': [
                            'Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок',
                        ],
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
                        'header.title': 'Заголовок',
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
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
        })();

    ['default'].forEach((theme) => testCase(theme));
});
