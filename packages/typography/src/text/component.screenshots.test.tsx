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
    'Typography.Text | all variants',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [
                            'primary-large',
                            'primary-medium',
                            'primary-small',
                            'secondary-large',
                        ],
                        weight: ['regular', 'medium', 'bold'],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [
                            'secondary-medium',
                            'secondary-small',
                            'component-primary',
                            'caps',
                            'component-secondary',
                            'tagline',
                        ],
                        weight: ['regular', 'medium', 'bold'],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
        ],
        viewport: { width: 1100, height: 100 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Text | colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        color: [
                            'disabled',
                            'tertiary',
                            'accent',
                            'primary',
                            'attention',
                            'positive',
                            'secondary',
                            'link',
                            'negative',
                        ],
                        view: 'primary-medium',
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 260, height: 40 },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    inverted: true,
                    knobs: {
                        color: ['tertiary-inverted', 'primary-inverted', 'secondary-inverted'],
                        view: 'primary-medium',
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 260, height: 40 },
                }),
            ],
        ],
        viewport: { width: 600, height: 100 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Text | rowLimit',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [
                            'primary-large',
                            'primary-medium',
                            'primary-small',
                            'secondary-large',
                        ],
                        rowLimit: [1, 2, 3],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['secondary-medium', 'secondary-small', 'component', 'caps'],
                        rowLimit: [1, 2, 3],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
        ],
        viewport: { width: 1100, height: 100 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
