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

const pageDefaultEvaluateScript = (page: Page) =>
    page.evaluate((backgroundColor) => {
        const style = document.createElement('style');
        style.textContent = `
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                background-color: ${backgroundColor} !important;
            }
            #storybook-root,
            #storybook-root > .sb-unstyled {
                margin: 0 !important;
                padding: 0 !important;
                background-color: ${backgroundColor} !important;
            }
        `;
        document.head.appendChild(style);
    }, 'var(--color-light-base-bg-secondary)');

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

describe('Tag | clear button', () => {
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
                            showClear: true,
                            checked: true,
                            view: ['outlined', 'filled', 'transparent', 'muted'],
                        },
                        size: { width: 180, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Тег',
                            size: 48,
                            showClear: true,
                            checked: true,
                            disabled: true,
                            view: ['outlined', 'filled', 'transparent', 'muted'],
                        },
                        size: { width: 180, height: 90 },
                    }),
                ],
                [
                    theme,
                    createSpriteStorybookUrl({
                        componentName: 'Tag',
                        knobs: {
                            children: 'Тег',
                            size: 48,
                            showClear: true,
                            checked: true,
                            colors: 'inverted',
                            view: ['outlined', 'filled', 'transparent', 'muted'],
                        },
                        size: { width: 180, height: 90 },
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
                            view: ['outlined', 'filled', 'transparent', 'muted'],
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
                            view: ['outlined', 'filled', 'transparent', 'muted'],
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
                            view: ['outlined', 'filled', 'transparent', 'muted'],
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

describe('IndicatorTag | main props', () => {
    const indicatorTagThemes = ['default', 'mobile'];

    const snapshotOptions =
        (theme: string) => (params: Parameters<typeof customSnapshotIdentifier>[0]) => {
            const normalizedParams = {
                ...params,
                currentTestName: params.currentTestName.replace(/^IndicatorTag \| /, ''),
            };

            return `indicator-tag-${theme}-${customSnapshotIdentifier(normalizedParams)}`;
        };

    indicatorTagThemes.forEach((theme) => {
        describe(
            `${theme} | default`,
            screenshotTesting({
                cases: generateTestCases({
                    packageName: 'tag',
                    componentName: 'IndicatorTag',
                    wrapperStyles: [
                        'boxSizing:border-box',
                        'display:flex',
                        'alignItems:flex-start',
                        `width:220px`,
                        `height:100px`,
                        `padding: 8px`,
                        `backgroundColor: var(--color-light-base-bg-secondary)`,
                    ].join(';'),
                    knobs: {
                        size: [32, 40, 48],
                        shape: ['rounded', 'rectangular'],
                        view: ['filled', 'muted'],
                        colors: 'default',
                        checked: false,
                        leftAddons: true,
                        dataTestId: 'indicator-ready-default',
                        indicatorProps: [
                            JSON.stringify({ mode: 'dot' }),
                            JSON.stringify({ mode: 'count', value: 7 }),
                        ],
                    },
                }),
                screenshotOpts: {
                    clip: { x: 0, y: 0, width: 220, height: 100 },
                },
                evaluate: pageDefaultEvaluateScript,
                viewport: {
                    width: 220,
                    height: 100,
                },
                matchImageSnapshotOptions: {
                    customSnapshotIdentifier: snapshotOptions(theme),
                },
                theme,
            }),
        );

        describe(
            `${theme} | inverted`,
            screenshotTesting({
                cases: [
                    [
                        'inverted',
                        createSpriteStorybookUrl({
                            packageName: 'tag',
                            componentName: 'IndicatorTag',
                            knobs: {
                                size: [32, 40, 48],
                                shape: ['rounded', 'rectangular'],
                                view: ['filled', 'muted'],
                                colors: 'inverted',
                                checked: true,
                                leftAddons: true,
                                dataTestId: 'indicator-ready-inverted',
                                indicatorProps: [{ mode: 'dot' }, { mode: 'count', value: 7 }],
                            },
                            size: { width: 180, height: 90 },
                        }),
                    ],
                ],
                screenshotOpts: {
                    fullPage: true,
                },
                matchImageSnapshotOptions: {
                    customSnapshotIdentifier: snapshotOptions(theme),
                },
                viewport: { width: 1024, height: 100 },
                theme,
            }),
        );
    });
});
