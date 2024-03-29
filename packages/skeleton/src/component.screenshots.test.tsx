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
