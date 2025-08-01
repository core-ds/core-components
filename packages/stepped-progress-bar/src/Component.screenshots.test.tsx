import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('SteppedProgressBar', () =>
    createPreview(
        {
            componentName: 'SteppedProgressBar',
            knobs: {
                view: 'accent',
                maxStep: 10,
                step: 5,
            },
        },
        'transform:scale(2.5);display:block;padding:300px 300px 0;',
    ));

describe(
    'SteppedProgressBar | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'SteppedProgressBar',
                    knobs: {
                        step: [0, 2, 10],
                        maxStep: 10,
                        description: 'Шаг 2 из 10: Выбор карты',
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'SteppedProgressBar',
                    knobs: {
                        step: 8,
                        maxStep: 10,
                        view: [
                            [
                                'positive',
                                'negative',
                                'attention',
                                'link',
                                'tertiary',
                                'secondary',
                                'primary',
                                'accent',
                            ],
                            'negative',
                        ],
                    },
                }),
            ],
            [
                'inverted',
                createSpriteStorybookUrl({
                    componentName: 'SteppedProgressBar',
                    knobs: {
                        step: [0, 2, 10],
                        maxStep: 10,
                        description: 'Шаг 2 из 10: Выбор карты',
                        colors: 'inverted',
                    },
                    size: { width: 500, height: 100 },
                }),
            ],
        ],
    }),
);
