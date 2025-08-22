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

describe('FilterTag', () => {
    createPreview(
        {
            componentName: 'FilterTag',
            knobs: {
                children: 'Фильтр: Значение',
                size: 48,
                checked: true,
            },
        },
        'width:800px;transform:scale(2.2)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe('FilterTag | main props', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'FilterTag',
                        knobs: {
                            children: 'Фильтр',
                            size: 32,
                            checked: false,
                            disabled: [false, true],
                            open: [false, true],
                            shape: ['rounded', 'rectangular'],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'FilterTag',
                        knobs: {
                            children: 'Фильтр',
                            size: 32,
                            checked: true,
                            disabled: [false, true],
                            open: [false, true],
                            shape: ['rounded', 'rectangular'],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'FilterTag',
                        knobs: {
                            children: 'Фильтр',
                            size: [32, 40, 48],
                            shape: ['rounded', 'rectangular'],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'FilterTag',
                        knobs: {
                            children: 'Фильтр',
                            size: 32,
                            checked: false,
                            colors: 'inverted',
                            disabled: [false, true],
                            open: [false, true],
                            shape: ['rounded', 'rectangular'],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'FilterTag',
                        knobs: {
                            children: 'Фильтр',
                            size: 32,
                            checked: true,
                            colors: 'inverted',
                            disabled: [false, true],
                            open: [false, true],
                            shape: ['rounded', 'rectangular'],
                        },
                        size: { width: 160, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'FilterTag',
                        knobs: {
                            children: 'Фильтр',
                            colors: 'inverted',
                            size: [32, 40, 48],
                            shape: ['rounded', 'rectangular'],
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
    'FilerTag | screenshots hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FilterTag',
            knobs: {
                children: 'Фильтр',
                size: 48,
                checked: true,
                disabled: false,
                colors: ['default', 'inverted'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => {
            return page.mouse.move(20, 30).then(() => page.waitForTimeout(500));
        },
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);

describe(
    'FilerTag | screenshots hover clear state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FilterTag',
            knobs: {
                children: 'Фильтр',
                size: 48,
                checked: true,
                disabled: false,
                colors: ['default', 'inverted'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => {
            return page.mouse.move(140, 30).then(() => page.waitForTimeout(500));
        },
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);

describe(
    'FilerTag | screenshots pressed state',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'FilterTag',
                knobs: {
                    children: 'Фильтр',
                    size: 48,
                    checked: [true, false],
                    disabled: [false, true],
                },
            }),
            ...generateTestCases({
                componentName: 'FilterTag',
                knobs: {
                    children: 'Фильтр',
                    size: 48,
                    colors: 'inverted',
                    checked: [true, false],
                },
            }),
        ],
        screenshotOpts: { clip },
        evaluate: (page: Page) => {
            return page.mouse
                .move(30, 30)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `press-${customSnapshotIdentifier(...args)}`,
        },
    }),
);
