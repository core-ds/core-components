import {
    setupScreenshotTesting,
    customSnapshotIdentifier,
    generateTestCases,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('SidePanel', () =>
    createPreview(
        {
            componentName: 'SidePanel',
            testStory: false,
            knobs: {
                open: true,
                'footer.sticky': true,
                'header.title': 'Заголовок',
            },
        },
        undefined,
        {
            viewport: {
                width: 860,
                height: 600,
            },
            screenshotOpts: {
                clip: {
                    x: 0,
                    y: 0,
                    width: 860,
                    height: 600,
                },
            },
        },
    ));

// MOBILE
describe('SidePanelMobile', () => {
    const testCase = (theme: string) => {
        return screenshotTesting({
            cases: generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Заголовок',
                    'header.hasCloser': true,
                    'footer.sticky': true,
                    SidePanelComponent: 'SidePanelMobile',
                },
            }),
            viewport: {
                width: 320,
                height: 600,
            },
            screenshotOpts: {
                fullPage: true,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();
    };

    ['default'].map(testCase);
});

describe(
    'SidePanelMobile | Header',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Очень очень длинный заголовок-заголовок заголовок',
                    'header.hasCloser': [true, false],
                    SidePanelComponent: 'SidePanelMobile',
                },
            }),
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Очень очень длинный заголовок-заголовок заголовок',
                    'header.trim': [true, false],
                    SidePanelComponent: 'SidePanelMobile',
                },
            }),
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Заголовок',
                    'header.align': ['left', 'center'],
                    SidePanelComponent: 'SidePanelMobile',
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
    'SidePanelMobile | Content',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SidePanel',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                'footer.sticky': true,
                'header.title': 'Заголовок',
                'content.flex': true,
                SidePanelComponent: 'SidePanelMobile',
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
    'SidePanelMobile | Footer',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'footer.sticky': true,
                    'header.title': 'Заголовок',
                    'footer.layout': ['start', 'center', 'space-between', 'column'],
                    SidePanelComponent: 'SidePanelMobile',
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
    'SidePanelMobile | Sticky',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SidePanel',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                'header.title': 'Заголовок',
                'header.sticky': true,
                'footer.sticky': true,
                showMore: true,
                SidePanelComponent: 'SidePanelMobile',
            },
        }),
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: (p) => p.waitForTimeout(300),
    }),
);

// DESKTOP

describe('SidePanelDesktop', () => {
    const testCase = (theme: string) => {
        return screenshotTesting({
            cases: generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Заголовок',
                    'header.hasCloser': true,
                    'footer.sticky': true,
                    size: 's',
                    SidePanelComponent: 'SidePanelDesktop',
                },
            }),
            viewport: {
                width: 1400,
                height: 960,
            },
            screenshotOpts: {
                fullPage: true,
            },
            evaluate: (p) => p.waitForTimeout(300),
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();
    };

    ['default'].map(testCase);
});

describe(
    'SidePanelDesktop | sizes',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SidePanel',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                'header.title': 'Заголовок',
                'header.hasCloser': true,
                'footer.sticky': true,
                size: 's',
                SidePanelComponent: 'SidePanelDesktop',
            },
        }),
        viewport: {
            width: 1400,
            height: 960,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: (p) => p.waitForTimeout(300),
    }),
);

describe(
    'SidePanelDesktop | Header',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Очень очень длинный заголовок-заголовок заголовок',
                    'header.hasCloser': [true, false],
                    SidePanelComponent: 'SidePanelDesktop',
                },
            }),
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Очень очень длинный заголовок-заголовок заголовок',
                    'header.trim': [true, false],
                    SidePanelComponent: 'SidePanelDesktop',
                },
            }),
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'header.title': 'Заголовок',
                    'header.align': ['left', 'center'],
                    SidePanelComponent: 'SidePanelDesktop',
                },
            }),
        ],
        viewport: {
            width: 960,
            height: 960,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: (p) => p.waitForTimeout(300),
    }),
);

describe(
    'SidePanelDesktop | Content',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SidePanel',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                'footer.sticky': true,
                'header.title': 'Заголовок',
                'content.flex': true,
                SidePanelComponent: 'SidePanelDesktop',
            },
        }),
        viewport: {
            width: 960,
            height: 960,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: (p) => p.waitForTimeout(300),
    }),
);

describe(
    'SidePanelDesktop | Footer',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'SidePanel',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    'footer.sticky': true,
                    'header.title': 'Заголовок',
                    'footer.layout': ['start', 'center', 'space-between', 'column'],
                    SidePanelComponent: 'SidePanelDesktop',
                },
            }),
        ],
        viewport: {
            width: 960,
            height: 960,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: (p) => p.waitForTimeout(300),
    }),
);

describe(
    'SidePanelDesktop | Sticky',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SidePanel',
            testStory: false,
            knobs: {
                open: true,
                header: true,
                'header.title': 'Заголовок',
                'header.sticky': true,
                'footer.sticky': true,
                showMore: true,
                SidePanelComponent: 'SidePanelDesktop',
            },
        }),
        viewport: {
            width: 960,
            height: 960,
        },
        screenshotOpts: {
            fullPage: true,
        },
        evaluate: (p) => p.waitForTimeout(300),
        matchImageSnapshotOptions: {
            failureThreshold: 0.005,
        },
    }),
);
