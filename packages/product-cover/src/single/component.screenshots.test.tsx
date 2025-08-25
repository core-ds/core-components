import {
    createSpriteStorybookUrl,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const SIZES = [164, 128, 96, 48, 40, 32, 16];

describe(
    'ProductCover | props screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'product-cover',
                    componentName: 'ProductCover',
                    subComponentName: 'Single',
                    knobs: {
                        size: SIZES,
                        cardholderName: 'Cardholder Name',
                        cardNumber: 1234000000001234,
                        eyeButton: true,
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
