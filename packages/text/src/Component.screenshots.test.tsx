import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Text | props rowLimit',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Text',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        rowLimit: [1, 2, 3],
                    },
                    size: { width: 250, height: 150 },
                }),
            ],
        ],
        viewport: { width: 1000, height: 200 },
    }),
);

describe(
    'Text | props view',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок.',
                        view: [
                            'paragraph-primary-large',
                            'paragraph-primary-medium',
                            'paragraph-primary-small',
                            'paragraph-secondary-large',
                            'paragraph-secondary-medium',
                            'paragraph-secondary-small',
                            'paragraph-component',
                            'paragraph-component-primary',
                            'paragraph-component-secondary',
                            'paragraph-caps',
                            'headline-medium',
                            'headline-system-medium',
                            'margin-medium',
                        ],
                    },
                    size: { width: 470, height: 100 },
                }),
            ],
        ],
        viewport: { width: 1500, height: 700 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Text | props color and textBackgroundColor',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю.',
                        color: 'var(--color-light-decorative-text-indigo)',
                        textBackgroundColor: 'var(--color-light-decorative-muted-alt-indigo)',
                        tag: 'span',
                    },
                    size: { width: 550, height: 100 },
                }),
            ],
        ],
        viewport: { width: 550, height: 100 },
    }),
);

describe(
    'Text | props align',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё',
                        align: ['left', 'right', 'center'],
                        tag: 'div',
                    },
                    size: { width: 300, height: 100 },
                }),
            ],
        ],
        viewport: { width: 1000, height: 100 },
    }),
);
