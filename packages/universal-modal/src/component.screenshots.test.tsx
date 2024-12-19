import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'UniversalModalDesktop | position',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                horizontalAlign: ['start', 'center', 'end'],
                verticalAlign: ['top', 'center', 'bottom'],
                open: true,
                'header.title': 'Заголовок',
                'footer.sticky': true,
                Component: 'UniversalModalDesktop',
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'UniversalModalDesktop | fullHeight',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                height: 'fullHeight',
                horizontalAlign: ['start', 'center', 'end'],
                open: true,
                'header.title': 'Заголовок',
                'footer.sticky': true,
                Component: 'UniversalModalDesktop',
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'UniversalModalDesktop | sticky',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                open: true,
                Component: 'UniversalModalDesktop',
                'header.title': 'Заголовок',
                'footer.sticky': true,
                showMore: [false, true],
                horizontalAlign: ['start', 'center'],
                height: ['500', '600', 'fullHeight'],
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'UniversalModalDesktop | sizes',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                open: true,
                Component: 'UniversalModalDesktop',
                'header.title': 'Заголовок',
                'footer.sticky': true,
                width: ['500', '600', 'fullWidth'],
                height: ['500', '600', 'fullHeight'],
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'UniversalModalDesktop | footer layout column',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                open: true,
                Component: 'UniversalModalDesktop',
                'header.title': 'Заголовок',
                'footer.sticky': true,
                'footer.layout': ['column'],
                height: ['500', '600', 'fullHeight'],
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'UniversalModalDesktop | title',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                open: true,
                Component: 'UniversalModalDesktop',
                bigTitle: [false, true],
                'header.title': ['Заголовок', 'Очень длинный заголовок Очень длинный заголовок'],
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'UniversalModalMobile',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            testStory: false,
            knobs: {
                open: true,
                'header.title': 'Заголовок',
                'footer.sticky': true,
                showMore: [false, true],
                Component: 'UniversalModalMobile',
            },
        }),
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
