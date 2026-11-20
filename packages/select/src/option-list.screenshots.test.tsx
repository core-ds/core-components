import {
    setupScreenshotTesting,
    generateTestCases,
    customSnapshotIdentifier,
    createStorybookUrl,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
    { key: '3', content: 'Americium' },
    { key: '4', content: 'Curium' },
    { key: '5', content: 'Berkelium' },
];

const groups = [
    {
        label: 'Группа №1',
        options: [
            { key: '1', content: 'Neptunium' },
            { key: '2', content: 'Plutonium' },
            { key: '3', content: 'Berkelium' },
            { key: '4', content: 'Californium' },
        ],
    },
    {
        label: 'Группа №2',
        options: [
            { key: '5', content: 'Americium' },
            { key: '6', content: 'Curium' },
        ],
    },
];

const listGroups = [
    {
        label: 'Группа №1',
        options: [
            { key: '1', content: 'Neptunium' },
            { key: '2', content: 'Plutonium' },
        ],
    },
    {
        label: 'Группа №2',
        options: [
            { key: '3', content: 'Americium' },
            { key: '4', content: 'Curium' },
        ],
    },
];

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
                await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

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
                await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

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
                        options: JSON.stringify(options),
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
                        options: JSON.stringify(options),
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

describe('OptionListDesktop | groups', () => {
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
                        options: JSON.stringify(listGroups),
                    },
                }),
            ],
            viewport: {
                width: 180,
                height: 360,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'corp', 'click'].forEach((theme) => testCase(theme));
});

describe('OptionListMobile | groups', () => {
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
                        options: JSON.stringify(listGroups),
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

    ['default', 'corp', 'click'].forEach((theme) => testCase(theme));
});

describe('Select | optgroup', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme}`,
                    createStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectDesktop',
                        knobs: {
                            options: JSON.stringify(groups),
                            selected: JSON.stringify(groups[0].options[1].key),
                            size: 64,
                            defaultOpen: true,
                            block: true,
                            placeholder: 'Выберите элемент',
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default'].map(testCase);
});

describe('SelectMobile | optgroup', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme}`,
                    createStorybookUrl({
                        packageName: 'select',
                        componentName: 'SelectMobile',
                        knobs: {
                            options: JSON.stringify(groups),
                            selected: JSON.stringify(groups[0].options[1].key),
                            size: 64,
                            defaultOpen: true,
                            block: true,
                            placeholder: 'Выберите элемент',
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default'].map(testCase);
});
