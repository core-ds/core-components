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

describe('OptionListDesktop | viewport desktop', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {},
                }),
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {
                        nativeScrollbar: [false, true],
                    },
                }),
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {
                        virtualOptions: [true],
                    },
                }),
            ],
            viewport: {
                width: 1024,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            evaluate: async (page) => {
                await page.waitForTimeout(500);

                await page.evaluate(() => {
                    const list = document.querySelectorAll('[role="option"]');
                    list[list.length - 1].scrollIntoView();
                });

                // клик, чтобы снять focus с input
                await page.mouse.move(1000, 1000);
                await page.mouse.down();

                await page.waitForTimeout(500);
            },
        })();

    ['default', 'site'].map(testCase);
});

// Тест responsive поведения десктопного списка опций в мобильном viewport
describe('OptionListDesktop | viewport mobile', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {},
                }),
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {
                        nativeScrollbar: [false, true],
                    },
                }),
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {
                        virtualOptions: [true],
                    },
                }),
            ],
            viewport: {
                width: 720,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            evaluate: async (page) => {
                await page.waitForTimeout(500);

                await page.evaluate(() => {
                    const list = document.querySelectorAll('[role="option"]');
                    list[list.length - 1].scrollIntoView();
                });

                // клик, чтобы снять focus с input
                await page.mouse.move(1000, 1000);
                await page.mouse.down();

                await page.waitForTimeout(500);
            },
        })();

    ['default'].map(testCase);
});

// Тест responsive поведения мобильного списка опций в десктопном viewport
describe('OptionListMobile | viewport desktop', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {},
                }),
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {
                        virtualOptions: [true],
                    },
                }),
            ],
            viewport: {
                width: 1024,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            evaluate: async (page) => {
                await page.waitForTimeout(500);

                await page.evaluate(() => {
                    const list = document.querySelectorAll('[role="option"]');
                    list[list.length - 1].scrollIntoView();
                });

                // клик, чтобы снять focus с input
                await page.mouse.move(1000, 1000);
                await page.mouse.down();

                await page.waitForTimeout(500);
            },
        })();

    ['default'].map(testCase);
});

describe('OptionListMobile | viewport mobile', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {},
                }),
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {
                        virtualOptions: [true],
                    },
                }),
            ],
            viewport: {
                width: 720,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            evaluate: async (page) => {
                await page.waitForTimeout(500);

                await page.evaluate(() => {
                    const list = document.querySelectorAll('[role="option"]');
                    list[list.length - 1].scrollIntoView();
                });

                // клик, чтобы снять focus с input
                await page.mouse.move(1000, 1000);
                await page.mouse.down();

                await page.waitForTimeout(500);
            },
        })();

    ['default'].map(testCase);
});

describe('OptionListDesktop | border radius', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {
                        showSearch: false,
                        showFooter: false,
                        placeholder: false,
                        fiveOptions: true,
                    },
                }),
            ],
            viewport: {
                width: 180,
                height: 320,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'site', 'corp'].forEach((theme) => testCase(theme));
});

describe('OptionListMobile | border radius', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {
                        showSearch: false,
                        showFooter: false,
                        placeholder: false,
                        fiveOptions: true,
                    },
                }),
            ],
            viewport: {
                width: 500,
                height: 500,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'site', 'corp'].forEach((theme) => testCase(theme));
});
