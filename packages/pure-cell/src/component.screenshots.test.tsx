import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'PureCell | screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PureCell',
                    knobs: {
                        direction: ['horizontal', 'vertical'],
                    },
                    size: { width: 100, height: 100 },
                }),
            ],
        ],
    }),
);

describe(
    'PureCell.Addon | screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PureCell',
                    subComponentName: 'Addon',
                    knobs: {
                        direction: ['horizontal', 'vertical'],
                    },
                    size: { width: 400, height: 300 },
                }),
            ],
        ],
    }),
);
