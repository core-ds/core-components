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

describe('NavigationBar ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'NavigationBar',
            knobs: {
                leftAddons: 'floatingBack',
                rightAddons: 'close',
                backgroundColor: '',
                title: 'PageName',
            },
        },
        'transform:scale(1.44)',
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
                        rightAddons: 'close',
                        leftAddons: 'floatingBack',
                        backgroundColor: '#3778FB1A',
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
                        rightAddons: 'close',
                        leftAddons: 'floatingBack',
                        backgroundColor: '#3778FB1A',
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
                        rightAddons: 'close',
                        leftAddons: 'floatingBack',
                        backgroundColor: '#3778FB1A',
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
                        rightAddons: 'close',
                        leftAddons: 'floatingBack',
                        backgroundColor: '#3778FB1A',
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
                        rightAddons: 'none',
                        leftAddons: 'floatingBack',
                        backgroundColor: '#3778FB1A',
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
                        rightAddons: 'close',
                        leftAddons: 'none',
                        backgroundColor: '#3778FB1A',
                    },
                }),
            ],
        ],
        screenshotOpts: { clip: { x: 0, y: 0, width: 400, height: 150 } },
    }),
);
