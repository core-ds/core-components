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

describe('Switch', () => {
    createPreview(
        {
            componentName: 'Switch',
            knobs: {
                label: 'Переключатель',
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
                        componentName: 'Switch',
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

    ['default'].map(testCase);
});

describe(
    'Switch | colors',
    screenshotTesting({
        cases: [
            [
                `sprite`,
                createSpriteStorybookUrl({
                    componentName: 'Switch',
                    knobs: {
                        label: 'Лейбл',
                        hint: 'Подсказка',
                        checked: [false, true],
                        disabled: [false, true],
                        colors: ['default', 'inverted'],
                    },
                    size: { width: 240, height: 60 },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1024, height: 250 },
        },
    }),
);

describe(
    'Switch | layout',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Switch',
                    knobs: {
                        label: 'Лейбл',
                        hint: 'Подсказка',
                        reversed: [false, true],
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
    'Switch | hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Switch',
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
    'Switch | pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Switch',
            knobs: {
                label: ['Согласен с условиями'],
                disabled: [true, false],
            },
        }),
        evaluate: (page: Page) => {
            return page.mouse
                .move(30, 30)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'Switch | error state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Switch',
            knobs: {
                label: 'Согласен с условиями',
                error: 'Error',
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 300, height: 150 },
        },
    }),
);
