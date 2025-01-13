import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 240, height: 60 };

const availableThemes = ['default', 'click', 'mobile'];

describe('Radio', () => {
    createPreview(
        {
            componentName: 'Radio',
            knobs: {
                label: 'Радио-кнопка',
                size: 24,
                checked: true,
            },
        },
        'transform:scale(2.3)',
    );

    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Radio',
                        knobs: {
                            label: 'Лейбл',
                            hint: ['', 'Подсказка'],
                            checked: [false, true],
                            disabled: [false, true],
                            inactive: [false, true],
                        },
                        size: { width: 240, height: 60 },
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

    availableThemes.map(testCase);
});

describe(
    'Radio | layout',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Radio',
                    knobs: {
                        label: 'Лейбл',
                        hint: 'Подсказка',
                        size: [20, 24],
                        align: ['start', 'center'],
                        block: [false, true],
                    },
                    size: { width: 240, height: 60 },
                }),
            ],
        ],
        viewport: {
            width: 1100,
            height: 240,
        },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Radio | hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Radio',
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
    'Radio | inverted hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Radio',
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
    'Radio | pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Radio',
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
    'Radio | inverted pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Radio',
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

describe(
    'Radio | inverted colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Radio',
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
