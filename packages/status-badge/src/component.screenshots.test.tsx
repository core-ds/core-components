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

describe('StatusBadge', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'StatusBadge',
            knobs: {},
        },
        'transform:scale(4)',
    ));

describe(
    'StatusBadge | default colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'StatusBadge',
                    knobs: {
                        view: [
                            'positive-checkmark',
                            'negative-cross',
                            'negative-alert',
                            'negative-block',
                            'attention-alert',
                            'neutral-information',
                            'neutral-operation',
                            'neutral-cross',
                        ],
                        size: [16, 20, 24, 32, 40],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 450 },
        },
    }),
);

describe(
    'StatusBadge | inverted colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'StatusBadge',
                    knobs: {
                        view: [
                            'positive-checkmark',
                            'negative-cross',
                            'negative-alert',
                            'negative-block',
                            'attention-alert',
                            'neutral-information',
                            'neutral-operation',
                            'neutral-cross',
                        ],
                        size: 40,
                        colors: 'inverted',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 170 },
        },
    }),
);
