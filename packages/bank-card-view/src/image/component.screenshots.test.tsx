import { createSpriteStorybookUrl, setupScreenshotTesting } from '../../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const SIZES = [
    [164, 264],
    [128, 205],
    [96, 152],
    [48, 76],
    [40, 65],
    [32, 51],
    [16, 24],
];

describe(
    'BankСardView | props screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'bank-card-view',
                    componentName: 'BankСardView',
                    subComponentName: 'Image',
                    knobs: {
                        size: SIZES,
                        cardholderName: 'Cardholder Name',
                        maskedCardNumber: 1234000000001234,
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
