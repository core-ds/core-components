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
    'Typography.TitleMobile | all variants',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'TitleMobile',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
                        weight: ['regular', 'medium', 'bold'],
                        font: 'styrene',
                    },
                    size: { width: 550, height: 150 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'TitleMobile',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
                        weight: ['regular', 'medium', 'bold'],
                        font: 'system',
                    },
                    size: { width: 550, height: 150 },
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
    'Typography.TitleMobile | colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'TitleMobile',
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
                    subComponentName: 'TitleMobile',
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
