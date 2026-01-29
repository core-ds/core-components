import {
    createSpriteStorybookUrl,
    customSnapshotIdentifier,
    generateTestCases,
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

describe('ProductCover | icon color', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                // default color
                ...generateTestCases({
                    testStory: false,
                    componentName: 'ProductCover',
                    subComponentName: 'ProductCover.Single',
                    knobs: {
                        baseUrl: false,
                        icon: true,
                    },
                }),
                // custom color
                ...generateTestCases({
                    testStory: false,
                    componentName: 'ProductCover',
                    subComponentName: 'ProductCover.Single',
                    knobs: {
                        baseUrl: false,
                        icon: true,
                        iconColor: ['tomato', 'rgb(255, 0, 255)'],
                    },
                }),
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

describe('ProductCover | text color', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'ProductCover',
                    subComponentName: 'ProductCover.Single',
                    knobs: {
                        baseUrl: false,
                        icon: false,
                        cardholderName: 'cardholderName',
                        cardNumber: 1000000000000000,
                    },
                }),
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
