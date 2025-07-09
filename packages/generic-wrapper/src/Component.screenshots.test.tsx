import {
    setupScreenshotTesting,
    createStorybookUrl,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('GenericWrapper ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'GenericWrapper',
            knobs: {},
        },
        'transform:scale(1.2);paddingLeft:15px',
    );
});

describe(
    'GenericWrapper',
    screenshotTesting({
        cases: [
            [
                'default',
                createStorybookUrl({
                    componentName: 'GenericWrapper',
                    testStory: false,
                }),
            ],
            [
                'with column',
                createStorybookUrl({
                    componentName: 'GenericWrapper',
                    testStory: false,
                    knobs: { column: true },
                }),
            ],
            [
                'with grow',
                createStorybookUrl({
                    componentName: 'GenericWrapper',
                    testStory: false,
                    knobs: {
                        'grow (1st element)': true,
                        'grow (2st element)': true,
                        'grow (3st element)': true,
                    },
                }),
            ],
            [
                'with padding',
                createStorybookUrl({
                    componentName: 'GenericWrapper',
                    testStory: false,
                    knobs: {
                        'padding.top': 'm',
                        'padding.right': 'm',
                        'padding.bottom': 'm',
                        'padding.left': 'm',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: {
                x: 0,
                y: 0,
                width: 1000,
                height: 450,
            },
        },
    }),
);

describe(
    'GenericWrapper | sprites',
    screenshotTesting({
        cases: [
            [
                'justifyContent',
                createSpriteStorybookUrl({
                    componentName: 'GenericWrapper',
                    packageName: 'generic-wrapper',
                    knobs: {
                        justifyContent: ['between', 'around', 'evenly', 'center', 'start', 'end'],
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 300, height: 30 },
                }),
            ],
        ],
        viewport: {
            width: 1000,
            height: 180,
        },
    }),
);
