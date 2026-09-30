import {
    setupScreenshotTesting,
    generateTestCases,
    createStorybookUrl,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'SegmentedControl | main props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SegmentedControl',
            testStory: false,
            knobs: {
                size: [40, 32, 48],
                shape: ['rounded', 'rectangular'],
                selectedId: 1,
            },
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1200, height: 200 },
        },
    }),
);

describe(
    'SegmentedControl | colors props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'SegmentedControl',
            testStory: false,
            knobs: {
                size: 40,
                shape: 'rounded',
                selectedId: 1,
                colors: 'inverted',
            },
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 1200, height: 200 },
        },
    }),
);

describe('SegmentedControl', () => {
    return screenshotTesting({
        cases: [
            [
                'view muted | colors default',
                createStorybookUrl({
                    componentName: 'SegmentedControl',
                    testStory: false,
                    knobs: {
                        size: 40,
                        selectedId: 1,
                        view: 'muted',
                        colors: 'default',
                    },
                }),
            ],
            [
                'view muted | colors inverted',
                createStorybookUrl({
                    componentName: 'SegmentedControl',
                    testStory: false,
                    knobs: {
                        size: 40,
                        selectedId: 1,
                        view: 'muted',
                        colors: 'inverted',
                    },
                }),
            ],
            [
                'segment width content',
                createStorybookUrl({
                    componentName: 'SegmentedControl',
                    testStory: false,
                    knobs: {
                        size: 40,
                        selectedId: 1,
                        segmentWidth: 'content',
                    },
                }),
            ],
            [
                'segment width content | addons',
                createStorybookUrl({
                    componentName: 'SegmentedControl',
                    testStory: false,
                    knobs: {
                        size: 40,
                        selectedId: 1,
                        segmentWidth: 'content',
                        'addons.left': true,
                        'addons.right': true,
                    },
                }),
            ],
            ...[32, 40, 48].map(
                (size) =>
                    [
                        `addons | size ${size}`,
                        createStorybookUrl({
                            componentName: 'SegmentedControl',
                            testStory: false,
                            knobs: {
                                size,
                                selectedId: 1,
                                'addons.left': true,
                                'addons.right': true,
                            },
                        }),
                    ] as [string, string],
            ),
            ...[32, 40, 48].map(
                (size) =>
                    [
                        `addons | addonsOnly`,
                        createStorybookUrl({
                            componentName: 'SegmentedControl',
                            testStory: false,
                            knobs: {
                                size,
                                selectedId: 1,
                                segmentWidth: 'content',
                                shape: 'rounded',
                                addonsOnly: true,
                            },
                        }),
                    ] as [string, string],
            ),
        ],
        viewport: { width: 960, height: 100 },
    })();
});
