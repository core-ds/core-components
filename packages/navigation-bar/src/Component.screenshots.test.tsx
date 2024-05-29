import {
    setupScreenshotTesting,
    createStorybookUrl,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('NavBar ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'NavigationBar',
            knobs: {},
        },
        'transform:scale(1.5)',
    );
});

describe(
    'NavigationBar',
    screenshotTesting({
        cases: [
            [
                'title-align-left',
                createStorybookUrl({
                    componentName: 'NavigationBar',
                    testStory: false,
                    knobs: {
                        align: 'left',
                        children: true,
                        bottomAddons: true,
                        rightAddons: true,
                        leftAddons: true,
                    },
                }),
            ],
            [
                'title-align-center',
                createStorybookUrl({
                    componentName: 'NavigationBar',
                    testStory: false,
                    knobs: {
                        align: 'center',
                        children: true,
                        bottomAddons: true,
                        rightAddons: true,
                        leftAddons: true,
                    },
                }),
            ],
            [
                'no-main-slot',
                createStorybookUrl({
                    componentName: 'NavigationBar',
                    testStory: false,
                    knobs: {
                        children: false,
                        bottomAddons: true,
                        rightAddons: true,
                        leftAddons: true,
                    },
                }),
            ],
            [
                'no-bottom-addon',
                createStorybookUrl({
                    componentName: 'NavigationBar',
                    testStory: false,
                    knobs: {
                        children: true,
                        bottomAddons: false,
                        rightAddons: true,
                        leftAddons: true,
                    },
                }),
            ],
            [
                'no-right-addon',
                createStorybookUrl({
                    componentName: 'NavigationBar',
                    testStory: false,
                    knobs: {
                        children: true,
                        bottomAddons: true,
                        rightAddons: false,
                        leftAddons: true,
                    },
                }),
            ],
            [
                'no-left-addon',
                createStorybookUrl({
                    componentName: 'NavigationBar',
                    testStory: false,
                    knobs: {
                        children: true,
                        bottomAddons: true,
                        rightAddons: true,
                        leftAddons: false,
                    },
                }),
            ],
        ],
        screenshotOpts: { clip: { x: 0, y: 0, width: 400, height: 150 } },
    }),
);
