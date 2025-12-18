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
    'Modal',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    verticalAlign: ['top', 'center', 'bottom'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    width: ['500', '600', 'fullWidth', '300'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    height: ['500', '600', 'fullHeight', '200'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    width: ['fullWidth'],
                    height: ['fullHeight'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    width: ['fullWidth'],
                    height: ['fullHeight'],
                    margin: ['{"top":12,"right":12,"bottom":12,"left":12}'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    'footer.layout': ['column'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'footer.sticky': true,
                    bigTitle: [false, true],
                    'header.title': [
                        'Заголовок',
                        'Очень длинный заголовок Очень длинный заголовок',
                    ],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    verticalAlign: ['top'],
                    margin: ['{"top":0}', '{"top":12}', '{"top":56}'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Modal',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    verticalAlign: ['bottom'],
                    margin: ['{"bottom":0}', '{"bottom":12}', '{"bottom":56}'],
                },
            }),
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe('Modal | trim title', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'UniversalModal',
                    subComponentName: 'Modal',
                    testStory: false,
                    knobs: {
                        open: true,
                        'footer.sticky': true,
                        bigTitle: false,
                        trim: [false, true],
                        'header.title': [
                            'Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок',
                        ],
                    },
                }),
                ...generateTestCases({
                    componentName: 'UniversalModal',
                    subComponentName: 'Modal',
                    testStory: false,
                    knobs: {
                        open: true,
                        'footer.sticky': true,
                        bigTitle: true,
                        trim: [false, true],
                        'header.title': [
                            'Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок Очень длинный заголовок',
                        ],
                    },
                }),
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
        })();

    ['default'].forEach((theme) => testCase(theme));
});

describe('Modal | sticky header', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'UniversalModal',
                    subComponentName: 'Modal',
                    knobs: {
                        open: true,
                        showMore: true,
                        'header.title': 'Заголовок',
                        'header.sticky': [false, true],
                    },
                }),
            ],
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
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
        })();

    ['default'].forEach((theme) => testCase(theme));
});
