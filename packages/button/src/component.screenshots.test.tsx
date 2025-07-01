import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    customSnapshotIdentifier,
    generateTestCases,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 200, height: 100 };

describe('Button', () =>
    createPreview(
        {
            componentName: 'Button',
            knobs: {
                children: 'Кнопка',
                view: 'accent',
                size: 72,
            },
        },
        'width:800px;transform:scale(2.3)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'Button | view & sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['accent', 'primary'],
                        size: [32, 40, 48, 56, 64, 72],
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['secondary', 'outlined'],
                        size: [32, 40, 48, 56, 64, 72],
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['transparent', 'text'],
                        size: [32, 40, 48, 56, 64, 72],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe('Button | views & themes', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Button',
                        knobs: {
                            children: 'Оплатить',
                            view: ['primary', 'secondary', 'outlined', 'transparent', 'text'],
                            disabled: [false, true],
                        },
                        size: { width: 150, height: 80 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 1100,
                height: 240,
            },
            theme,
        })();

    ['default', 'click', 'corp', 'site', 'mobile', 'intranet'].map(testCase);
});

describe('Button | inverted views & themes', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Button',
                        knobs: {
                            children: 'Оплатить',
                            view: ['primary', 'secondary', 'outlined', 'transparent', 'text'],
                            disabled: [false, true],
                            colors: 'inverted',
                        },
                        size: { width: 150, height: 80 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 1100,
                height: 240,
            },
            theme,
        })();

    ['default', 'click', 'corp', 'site', 'mobile', 'intranet'].map(testCase);
});

describe(
    'Button | screenshots views and block',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 500, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['primary', 'secondary', 'outlined', 'transparent', 'text'],
                        block: true,
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Button | screenshots views and loading',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'outlined', 'transparent', 'text'],
                loading: true,
            },
        }),
        evaluate: (page: Page) => page.waitForTimeout(300),
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.1,
        },
        screenshotOpts: { clip },
    }),
);

describe(
    'Button | screenshots hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'outlined', 'transparent', 'text'],
                colors: ['default', 'inverted'],
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
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'outlined', 'transparent', 'text'],
                colors: ['default', 'inverted'],
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

describe(
    'Button | mobile view & sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['accent', 'primary'],
                        size: [32, 40, 48, 56, 64, 72],
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['secondary', 'outlined'],
                        size: [32, 40, 48, 56, 64, 72],
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['transparent', 'text'],
                        size: [32, 40, 48, 56, 64, 72],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: { width: 740, height: 100 },
    }),
);

describe(
    'Button | rounded shape',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: 'primary',
                shape: 'rounded',
                size: [32, 40, 48, 56, 64, 72],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe(
    'Button | hint & textResizing',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                hint: 'Hint',
                view: 'primary',
                size: [56, 64, 72],
                textResizing: ['hug', 'fill'],
            },
        }),
        screenshotOpts: { clip },
    }),
);
