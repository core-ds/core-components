import { setupScreenshotTesting, createStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
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
        ],
        screenshotOpts: {
            clip: {
                x: 0,
                y: 0,
                width: 1000,
                height: 500,
            },
        },
    }),
);
