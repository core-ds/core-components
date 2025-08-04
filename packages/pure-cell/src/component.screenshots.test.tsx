import {
    setupScreenshotTesting,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PureCell ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'PureCell',
            subComponentName: 'PureCell.Main',
            knobs: {},
        },
        'transform:scale(1.5)',
    );
});

describe(
    'PureCell | screenshots direction=`horizontal`',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'PureCell',
            knobs: {
                direction: ['horizontal'],
            },
            testStory: false,
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1920, height: 600 },
        },
    }),
);
