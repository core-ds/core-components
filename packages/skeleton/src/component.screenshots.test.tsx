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

describe('Skeleton', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'Skeleton',
            knobs: {},
        },
        'transform:scale(2.5)',
    );
});

describe(
    'Skeleton | screenshots',
    screenshotTesting({
        cases: [
            [
                ` main props`,
                createSpriteStorybookUrl({
                    componentName: 'Skeleton',
                    knobs: {
                        children: 'Skeleton Skeleton Skeleton Skeleton Skeleton',
                        animate: false,
                        visible: [false, true],
                    },
                    size: { width: 200, height: 100 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 450,
            height: 100,
        },
    }),
);
