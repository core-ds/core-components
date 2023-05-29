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
            testStory: false,
            componentName: 'Indicator',
            knobs: {},
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
                        view: ['red', 'grey', 'white'],
                        size: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
                        content: [1, 10, 100],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 150 },
        },
    }),
);
