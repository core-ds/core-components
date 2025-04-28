import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Indicator', () =>
    createPreview(
        {
            componentName: 'Indicator',
            knobs: {
                value: 100,
                view: 'red',
                border: false,
            },
        },
        'transform:scale(4)',
    ));

describe(
    'Indicator | screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Indicator',
                    knobs: {
                        view: ['red', 'grey'],
                        size: [8, 16, 20, 24, 32, 40],
                        value: [1, 10, 100],
                    },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Indicator',
                    inverted: true,
                    knobs: {
                        view: 'white',
                        size: [8, 16, 20, 24, 32, 40],
                        value: [1, 10, 100],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 200 },
        },
    }),
);
