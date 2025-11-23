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

describe('ProgressBar', () =>
    createPreview(
        {
            componentName: 'ProgressBar',
            knobs: {
                view: 'accent',
                value: 50,
                size: 4,
            },
        },
        'transform:scale(2.5);display:block;padding:300px 300px 0;',
    ));

describe(
    'ProgressBar | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ProgressBar',
                    knobs: {
                        size: [4, 8],
                        view: [
                            'positive',
                            'negative',
                            'attention',
                            'link',
                            'tertiary',
                            'secondary',
                            'primary',
                            'accent',
                        ],
                        value: 0,
                    },
                    size: { width: 130, height: 25 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ProgressBar',
                    knobs: {
                        size: [4, 8],
                        view: [
                            'positive',
                            'negative',
                            'attention',
                            'link',
                            'tertiary',
                            'secondary',
                            'primary',
                            'accent',
                        ],
                        value: 50,
                    },
                    size: { width: 130, height: 25 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ProgressBar',
                    knobs: {
                        size: [4, 8],
                        view: [
                            'positive',
                            'negative',
                            'attention',
                            'link',
                            'tertiary',
                            'secondary',
                            'primary',
                            'accent',
                        ],
                        value: 100,
                    },
                    size: { width: 130, height: 25 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 470,
            height: 50,
        },
    }),
);
