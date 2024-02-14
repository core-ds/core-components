import { createSpriteStorybookUrl, setupScreenshotTesting } from '../../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'BankСardView | props screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'bank-card-view',
                    componentName: 'BankСardView',
                    subComponentName: 'Stack',
                    knobs: {
                        size: [[164, 264]],
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
                    packageName: 'bank-card-view',
                    componentName: 'BankСardView',
                    subComponentName: 'Stack',
                    knobs: {
                        size: [
                            [48, 76],
                            [40, 65],
                            [32, 51],
                        ],
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
                    packageName: 'bank-card-view',
                    componentName: 'BankСardView',
                    subComponentName: 'Stack',
                    knobs: {
                        size: [[16, 24]],
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
