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

describe('OptionListDesktop | option list', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {},
                }),
            ],
            viewport: {
                width: 1024,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-viewport-desktop-${customSnapshotIdentifier(...args)}`,
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

describe('OptionListDesktop | option list', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListDesktop',
                    testStory: false,
                    knobs: {},
                }),
            ],
            viewport: {
                width: 720,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-viewport-mobile-${customSnapshotIdentifier(...args)}`,
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

describe('OptionListMobile | option list', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {},
                }),
            ],
            viewport: {
                width: 1024,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-viewport-desktop-${customSnapshotIdentifier(...args)}`,
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

describe('OptionListMobile | option list', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    componentName: 'Select',
                    subComponentName: 'OptionListMobile',
                    testStory: false,
                    knobs: {},
                }),
            ],
            viewport: {
                width: 720,
                height: 500,
            },
            theme,
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-viewport-mobile-${customSnapshotIdentifier(...args)}`,
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
