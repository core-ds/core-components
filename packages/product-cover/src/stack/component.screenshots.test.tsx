import {
    createSpriteStorybookUrl,
    customSnapshotIdentifier,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';

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
                            cardNumber: 1234000000001234,
                            shadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                        },
                        secondCard: {
                            cardNumber: 1234000000001234,
                        },
                        numberOfCards: 2,
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
                            cardNumber: 1234000000001234,
                            shadow: '2px 2px 2px 0px rgba(0, 0, 0, 0.20)',
                        },
                        numberOfCards: 2,
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
                            cardNumber: 1234000000001234,
                        },
                        secondCard: {
                            cardNumber: 1234000000001234,
                        },
                        numberOfCards: 2,
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

describe('ProductCover | text color', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    'sprite | numberOfCards',
                    createSpriteStorybookUrl({
                        packageName: 'product-cover',
                        componentName: 'ProductCover',
                        subComponentName: 'Stack',
                        knobs: {
                            size: [40],
                            firstCard: {
                                cardNumber: 1234000000001234,
                                shadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                            },
                            numberOfCards: 3,
                        },
                    }),
                ],
                [
                    'sprite | numberOfCards custom color',
                    createSpriteStorybookUrl({
                        packageName: 'product-cover',
                        componentName: 'ProductCover',
                        subComponentName: 'Stack',
                        knobs: {
                            size: [40],
                            firstCard: {
                                cardNumber: 1234000000001234,
                                shadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                                textColor: ['rgb(255, 0, 255)'],
                            },
                            numberOfCards: 3,
                        },
                    }),
                ],
                [
                    'sprite | numberOfCards custom color',
                    createSpriteStorybookUrl({
                        packageName: 'product-cover',
                        componentName: 'ProductCover',
                        subComponentName: 'Stack',
                        knobs: {
                            size: [40],
                            firstCard: {
                                cardNumber: 1234000000001234,
                                shadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                            },
                            secondCard: {
                                textColor: ['rgb(255, 0, 255)'],
                            },
                            numberOfCards: 3,
                        },
                    }),
                ],
            ],
            viewport: {
                width: 280,
                height: 180,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default'].forEach((theme) => testCase(theme));
});
