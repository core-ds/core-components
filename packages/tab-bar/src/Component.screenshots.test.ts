import { createPreview, createStorybookUrl, setupScreenshotTesting } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('TabBar', () =>
    createPreview(
        {
            componentName: 'TabBar',
            testStory: false,
            knobs: { showIndicator: false, border: false },
        },
        'transform:scale(1.44);',
    ));

describe(
    'TabBar',
    screenshotTesting({
        cases: [
            [
                'default',
                createStorybookUrl({
                    componentName: 'TabBar',
                    testStory: false,
                    knobs: {
                        showIndicator: true,
                        border: true,
                    },
                }),
            ],
        ],
        viewport: { width: 400, height: 100 },
    }),
);

describe(
    'TabBar | props',
    screenshotTesting({
        cases: [
            [
                'bgColor',
                createStorybookUrl({
                    componentName: 'TabBar',
                    testStory: false,
                    knobs: {
                        bgColor: 'modal-bg-alt-primary',
                        border: true,
                    },
                }),
            ],
            [
                'accentColor',
                createStorybookUrl({
                    componentName: 'TabBar',
                    testStory: false,
                    knobs: {
                        accentColor: 'secondary',
                        border: true,
                    },
                }),
            ],
        ],
        viewport: { width: 400, height: 250 },
    }),
);
