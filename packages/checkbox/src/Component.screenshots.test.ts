import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 400, height: 100 };
const availableThemes = ['default', 'click', 'corp'];

describe('Checkbox', () => {
    createPreview(
        {
            componentName: 'Checkbox',
            knobs: {
                label: 'Чекбокс',
                size: 24,
                checked: true,
            },
        },
        'transform:scale(2.3)',
    );
});

describe('Checkbox | size, disabled, checked', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'sprite',
                    createSpriteStorybookUrl({
                        componentName: 'Checkbox',
                        knobs: {
                            checked: [true, false],
                            label: ['Согласен с условиями'],
                            hint: ['Дополнительная информация'],
                            size: [20, 24],
                            disabled: [true, false],
                        },
                        size: { width: 400, height: 100 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    availableThemes.map(testCase);
});

describe('Checkbox | inactive, checked', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'sprite',
                    createSpriteStorybookUrl({
                        componentName: 'Checkbox',
                        knobs: {
                            checked: [true, false],
                            label: ['Согласен с условиями'],
                            hint: ['Дополнительная информация'],
                            size: 20,
                            disabled: [true, false],
                            inactive: [true, false],
                        },
                        size: { width: 400, height: 100 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    availableThemes.map(testCase);
});

describe('Checkbox | inactive, checked, indeterminate', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'sprite',
                    createSpriteStorybookUrl({
                        componentName: 'Checkbox',
                        knobs: {
                            checked: [true, false],
                            label: ['Согласен с условиями'],
                            hint: ['Дополнительная информация'],
                            size: 20,
                            disabled: [true, false],
                            inactive: [true, false],
                            indeterminate: true,
                        },
                        size: { width: 400, height: 100 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    availableThemes.map(testCase);
});

describe(
    'Checkbox | addons, block, align',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Checkbox',
                    knobs: {
                        label: ['Согласен с условиями'],
                        hint: ['Дополнительная информация'],
                        size: 20,
                        addons: ['', 'Addons'],
                        block: [true, false],
                        align: ['start', 'center'],
                    },
                    size: { width: 400, height: 100 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Checkbox | hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Checkbox',
            knobs: {
                label: ['Согласен с условиями'],
                disabled: [true, false],
            },
        }),
        evaluate: (page: Page) => page.hover('label').then(() => page.waitForTimeout(500)),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'Checkbox | inverted hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Checkbox',
            knobs: {
                colors: 'inverted',
            },
        }),
        evaluate: (page: Page) => page.hover('label').then(() => page.waitForTimeout(500)),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 50, height: 50 },
        },
    }),
);

describe(
    'Checkbox | pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Checkbox',
            knobs: {
                label: ['Согласен с условиями'],
                disabled: [true, false],
            },
        }),
        evaluate: (page: Page) => {
            return page.mouse
                .move(26, 26)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'Checkbox | inverted pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Checkbox',
            knobs: {
                colors: 'inverted',
            },
        }),
        evaluate: (page: Page) => {
            return page.mouse
                .move(26, 26)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 50, height: 50 },
        },
    }),
);

describe('Checkbox | checked | error state', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'sprite',
                    createSpriteStorybookUrl({
                        componentName: 'Checkbox',
                        knobs: {
                            checked: [true, false],
                            label: ['Согласен с условиями'],
                            hint: ['', 'Дополнительная информация'],
                            error: ['', 'Ошибка'],
                            size: 20,
                        },
                        size: { width: 400, height: 100 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    availableThemes.map(testCase);
});

describe(
    'Checkbox | inverted colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Checkbox',
                    knobs: {
                        label: 'Label',
                        hint: ['', 'Hint Message'],
                        colors: 'inverted',
                        checked: [true, false],
                        disabled: [true, false],
                    },
                    size: { width: 200, height: 50 },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1024, height: 200 },
        },
    }),
);

describe(
    'Checkbox | inverted colors 2',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Checkbox',
                    knobs: {
                        label: 'Label',
                        hint: ['', 'Hint Message'],
                        colors: 'inverted',
                        indeterminate: [true, false],
                        disabled: [true, false],
                    },
                    size: { width: 200, height: 50 },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1024, height: 200 },
        },
    }),
);
