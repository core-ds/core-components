import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Typography', () =>
    createPreview(
        {
            componentName: 'Typography',
            subComponentName: 'Title',
            knobs: {
                children: 'Аа',
                view: 'xlarge',
                font: 'styrene',
            },
        },
        'transform:scale(4)',
    ));

describe(
    'Typography.Title | all variants',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
                        weight: ['regular', 'medium', 'bold'],
                        font: 'styrene',
                    },
                    size: { width: 550, height: 350 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
                        weight: ['regular', 'medium', 'bold'],
                        font: 'system',
                    },
                    size: { width: 550, height: 350 },
                }),
            ],
        ],
        viewport: { width: 1920, height: 1080 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Title | colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
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
                        view: 'small',
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    inverted: true,
                    knobs: {
                        color: ['tertiary-inverted', 'primary-inverted', 'secondary-inverted'],
                        view: 'small',
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
        ],
        viewport: { width: 900, height: 500 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Title | rowLimit',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
                        rowLimit: [1, 2, 3],
                    },
                    size: { width: 550, height: 200 },
                }),
            ],
        ],
        viewport: { width: 1920, height: 1080 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
