import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
    customSnapshotIdentifier,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const availableThemes = ['default', 'click', 'mobile'];

const clip = { x: 0, y: 0, width: 200, height: 100 };

describe('Tag', () => {
    createPreview(
        {
            componentName: 'Tag',
            knobs: {
                children: 'Тэг',
                size: 48,
                checked: true,
            },
        },
        'width:800px;transform:scale(2.7)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe('Tag | main props', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Оплатить',
                            size: [32, 40, 48, 56, 64, 72],
                            checked: false,
                            disabled: [false, true],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Оплатить',
                            size: [32, 40, 48, 56, 64, 72],
                            checked: true,
                            disabled: [false, true],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: { width: 1024, height: 100 },
            theme,
        })();

    availableThemes.map(testCase);
});

describe('Tag | right addons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: generateTestCases({
                componentName: 'Tag',
                testStory: false,
                knobs: {
                    rightAddons: true,
                    checked: [false, true],
                    disabled: [false, true],
                },
            }),
            screenshotOpts: { clip: { x: 0, y: 0, width: 180, height: 80 } },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            viewport: { width: 1024, height: 80 },
            theme,
        })();

    availableThemes.map(testCase);
});

describe('Tag | inverted', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Оплатить',
                            size: [32, 40, 48, 56, 64, 72],
                            checked: false,
                            disabled: [false, true],
                            colors: 'inverted',
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Оплатить',
                            size: [32, 40, 48, 56, 64, 72],
                            checked: true,
                            disabled: [false, true],
                            colors: 'inverted',
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: { width: 1024, height: 100 },
            theme,
        })();

    availableThemes.map(testCase);
});

describe(
    'Tag | screenshots hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Tag',
            knobs: {
                children: 'Оплатить',
                size: 48,
                checked: true,
                disabled: [false, true],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) =>
            page.hover('button[class*=component]').then(() => page.waitForTimeout(500)),
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);

describe(
    'Button | screenshots pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Tag',
            knobs: {
                children: 'Оплатить',
                size: 48,
                checked: [true, false],
                disabled: [false, true],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => {
            return page.mouse
                .move(30, 30)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);

describe('Tag | view variants', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Тег',
                            size: 48,
                            view: ['outlined', 'filled', 'transparent'],
                            checked: [false, true],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Тег',
                            size: 48,
                            view: ['outlined', 'filled', 'transparent'],
                            disabled: true,
                            checked: [false, true],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Тег',
                            size: 48,
                            view: ['outlined', 'filled', 'transparent'],
                            colors: 'inverted',
                            checked: [false, true],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: { width: 1024, height: 100 },
            theme,
        })();

    availableThemes.map(testCase);
});
