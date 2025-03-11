import {
    setupScreenshotTesting,
    generateTestCases,
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
                    width: ['500', '600', 'fullWidth'],
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
                    height: ['500', '600', 'fullHeight'],
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

describe(
    'SidePanel',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    horizontalAlign: ['start', 'end'],
                    verticalAlign: ['top', 'center', 'bottom'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    horizontalAlign: ['start', 'end'],
                    width: ['500', '600', 'fullWidth'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    horizontalAlign: ['start', 'end'],
                    height: ['500', '600', 'fullHeight'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    horizontalAlign: ['start', 'end'],
                    width: ['fullWidth'],
                    height: ['fullHeight'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    horizontalAlign: ['start', 'end'],
                    'footer.layout': ['column'],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'footer.sticky': true,
                    horizontalAlign: ['start', 'end'],
                    bigTitle: [false, true],
                    'header.title': [
                        'Заголовок',
                        'Очень длинный заголовок Очень длинный заголовок',
                    ],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    verticalAlign: ['top'],
                    horizontalAlign: ['start', 'end'],
                    margin: [
                        '{"top":0,"right":0,"bottom":0,"left":0}',
                        '{"top":12,"right":12,"bottom":12,"left":12}',
                        '{"top":56,"right":56,"bottom":56,"left":56}',
                    ],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    verticalAlign: ['bottom'],
                    horizontalAlign: ['start', 'end'],
                    margin: [
                        '{"top":0,"right":0,"bottom":0,"left":0}',
                        '{"top":12,"right":12,"bottom":12,"left":12}',
                        '{"top":56,"right":56,"bottom":56,"left":56}',
                    ],
                },
            }),
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    'header.title': 'Заголовок',
                    'footer.sticky': true,
                    verticalAlign: ['center'],
                    horizontalAlign: ['start', 'end'],
                    margin: [
                        '{"top":0,"right":0,"bottom":0,"left":0}',
                        '{"top":12,"right":12,"bottom":12,"left":12}',
                        '{"top":56,"right":56,"bottom":56,"left":56}',
                    ],
                },
            }),
        ],
        screenshotOpts: {
            fullPage: true,
        },
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
            ...generateTestCases({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
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
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
