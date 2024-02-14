import { createSpriteStorybookUrl, setupScreenshotTesting } from '../../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'ProductCover | props screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'product-cover',
                    componentName: 'ProductCover',
                    subComponentName: 'Stack',
                    knobs: {
                        size: [128],
                        firstCard: {
                            maskedCardNumber: 1234000000001234,
                            shadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                        },
                        secondCard: {
                            maskedCardNumber: 1234000000001234,
                        },
                        numberOfСards: 2,
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'product-cover',
                    componentName: 'ProductCover',
                    subComponentName: 'Stack',
                    knobs: {
                        size: [40, 32],
                        firstCard: {
                            maskedCardNumber: 1234000000001234,
                            shadow: '2px 2px 2px 0px rgba(0, 0, 0, 0.20)',
                        },
                        secondCard: {
                            maskedCardNumber: 1234000000001234,
                        },
                        numberOfСards: 2,
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'product-cover',
                    componentName: 'ProductCover',
                    subComponentName: 'Stack',
                    knobs: {
                        size: [16],
                        firstCard: {
                            maskedCardNumber: 1234000000001234,
                        },
                        secondCard: {
                            maskedCardNumber: 1234000000001234,
                        },
                        numberOfСards: 2,
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 840,
            height: 300,
        },
    }),
);
