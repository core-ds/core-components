import {
    createPreview,
    createSpriteStorybookUrl,
    setupScreenshotTesting,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('NumberInput ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'NumberInput',
        },
        'transform:scale(2.1)',
    ));

describe(
    'NumberInput | size',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'NumberInput',
                    knobs: {
                        label: 'Число',
                        value: 1234,
                        size: [40, 48, 56],
                        block: true,
                        step: 1,
                        colors: ['default'],
                    },
                    size: { width: 300, height: 70 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'NumberInput',
                    knobs: {
                        label: 'Число',
                        value: 1234,
                        size: [40, 48, 56],
                        block: true,
                        step: 1,
                        colors: ['inverted'],
                    },
                    size: { width: 300, height: 70 },
                }),
            ],
        ],
    }),
);
