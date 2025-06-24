import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

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
    'Mobile | header title alignment',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            subComponentName: 'Mobile',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                showMore: true,
                'header.title': [
                    'Заголовок',
                    'Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок',
                ],
                'header.sticky': true,
                'header.align': ['left', 'center'],
                'header.hasCloser': true,
                'header.hasBackButton': true,
            },
        }),
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
    'Mobile | header scrolled title alignment',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'UniversalModal',
            subComponentName: 'Mobile',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                showMore: true,
                'header.title': [
                    'Заголовок',
                    'Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок',
                ],
                'header.sticky': true,
                'header.align': ['left', 'center'],
                'header.hasCloser': true,
                'header.hasBackButton': true,
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
