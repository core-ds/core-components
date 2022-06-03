import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Chart',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Chart',
                    size: { width: 30, height: 30 },
                    knobs: {
                        name: 'glyph_debt_m',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
