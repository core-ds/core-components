import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
    generateTestCases,
} from '@alfalab/core-components-screenshot-utils';
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Steps ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'Steps',
            knobs: {
                children: [['Шаг 1', 'Шаг 2', 'Шаг 3']],
                isVerticalAlign: true,
                ordered: true,
                activeStep: 2,
                minSpaceBetweenSteps: 16,
            },
        },
        'transform: scale(2.1)',
    );
});

describe(
    'Vertical sprite`',
    screenshotTesting({
        cases: [
            [
                'minSpaceBetweenSteps',
                createSpriteStorybookUrl({
                    componentName: 'Steps',
                    knobs: {
                        children: [['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4']],
                        isVerticalAlign: true,
                        minSpaceBetweenSteps: [16, 24, 32],
                    },
                }),
            ],
            [
                'completedDashColor',
                createSpriteStorybookUrl({
                    componentName: 'Steps',
                    knobs: {
                        children: [['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4']],
                        isVerticalAlign: true,
                        activeStep: 3,
                        completedDashColor: ['', 'tomato', 'var(--color-dark-status-attention)'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 720, height: 320 },
        },
    }),
);

describe(
    'Vertical',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                testStory: false,
                componentName: 'Steps',
                subComponentName: 'Steps Vertical',
                knobs: {
                    fullWidth: [false, true],
                },
            }),
        ],
        viewport: { width: 560, height: 240 },
    }),
);

describe(
    'Vertical | hover',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                testStory: false,
                componentName: 'Steps',
                subComponentName: 'Steps Vertical',
                knobs: {
                    fullWidth: [false, true],
                },
            }),
        ],
        viewport: { width: 560, height: 240 },
        evaluate: (page: Page) =>
            page.hover('div[class*=textWrapper]').then(() => page.waitForTimeout(500)),
    }),
);

describe(
    'Horizontal sprite`',
    screenshotTesting({
        cases: [
            [
                'dash stretching',
                createSpriteStorybookUrl({
                    componentName: 'Steps',
                    knobs: {
                        children: [
                            ['Шаг 1', 'Шаг 2', 'Шаг 3'],
                            ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4'],
                            ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4', 'Шаг 5'],
                        ],
                        isVerticalAlign: false,
                        activeStep: 2,
                    },
                    size: { width: 720, height: 50 },
                }),
            ],
            [
                'completedDashColor',
                createSpriteStorybookUrl({
                    componentName: 'Steps',
                    knobs: {
                        children: [['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4']],
                        isVerticalAlign: false,
                        activeStep: 3,
                        completedDashColor: ['', 'tomato', 'var(--color-dark-status-attention)'],
                    },
                    size: { width: 720, height: 50 },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 720, height: 280 },
        },
    }),
);
