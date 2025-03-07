import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
    generateTestCases,
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
            componentName: 'Skeleton',
            knobs: {
                children:
                    'Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton Skeleton',
                animate: true,
                visible: true,
            },
        },
        'transform:scale(2.5);padding:0 300px',
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

describe(
    'SkeletonText',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'Skeleton',
                subComponentName: 'SkeletonText',
                testStory: false,
                knobs: {
                    rows: [undefined, 6, 8],
                },
            }),
            ...generateTestCases({
                componentName: 'Skeleton',
                subComponentName: 'SkeletonText',
                testStory: false,
                knobs: {
                    width: [undefined, '[100, 200, 300, 400]'],
                },
            }),
            ...generateTestCases({
                componentName: 'Skeleton',
                subComponentName: 'SkeletonText',
                testStory: false,
                knobs: {
                    width: '200px',
                    align: ['left', 'center', 'right'],
                },
            }),
        ],
        screenshotOpts: {
            clip: {
                x: 0,
                y: 0,
                width: 1024,
                height: 250,
            },
        },
    }),
);
