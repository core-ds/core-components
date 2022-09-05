import { Page } from 'playwright';
import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

// DESKTOP

describe(
    'ConfirmationDesktop | code, charAmount, align',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: 'INITIAL',
                        state: 'INITIAL',
                        alignContent: ['left', 'center'],
                        requiredCharAmount: [5, 7],
                        phone: '+7 ··· ··· 07-24',
                        ConfirmationComponent: 'ConfirmationDesktop',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.0005,
        },
    }),
);

describe(
    'ConfirmationDesktop | CODE_CHECKING, CODE_SENDING, CODE_ERROR states',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: ['INITIAL'],
                        state: ['INITIAL', 'CODE_CHECKING', 'CODE_SENDING', 'CODE_ERROR'],
                        ConfirmationComponent: 'ConfirmationDesktop',
                    },
                }),
            ],
        ],
        evaluate: (page: Page) => page.waitForTimeout(300),
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.005,
        },
    }),
);

describe(
    'ConfirmationDesktop | HINT, FATAL_ERROR, TEMP_BLOCK screens',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: ['HINT', 'FATAL_ERROR', 'TEMP_BLOCK'],
                        state: ['INITIAL'],
                        ConfirmationComponent: 'ConfirmationDesktop',
                    },
                }),
            ],
        ],
        evaluate: (page: Page) => page.waitForTimeout(300),
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.005,
        },
    }),
);

describe(
    'ConfirmationDesktop | noAttemptsLeftMessage',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: 'INITIAL',
                        state: 'INITIAL',
                        blockSmsRetry: true,
                        ConfirmationComponent: 'ConfirmationDesktop',
                    },
                }),
            ],
        ],
        evaluate: (page: Page) => page.waitForTimeout(300),
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.005,
        },
    }),
);

// MOBILE

describe(
    'ConfirmationMobile | code, charAmount, align',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: 'INITIAL',
                        state: 'INITIAL',
                        alignContent: ['left', 'center'],
                        requiredCharAmount: [5, 7],
                        phone: '+7 ··· ··· 07-24',
                        ConfirmationComponent: 'ConfirmationMobile',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.0005,
        },
    }),
);

describe(
    'ConfirmationMobile | CODE_CHECKING, CODE_SENDING, CODE_ERROR states',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: ['INITIAL'],
                        state: ['INITIAL', 'CODE_CHECKING', 'CODE_SENDING', 'CODE_ERROR'],
                        ConfirmationComponent: 'ConfirmationMobile',
                    },
                }),
            ],
        ],
        evaluate: (page: Page) => page.waitForTimeout(300),
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.005,
        },
    }),
);

describe(
    'ConfirmationMobile | HINT, FATAL_ERROR, TEMP_BLOCK screens',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: ['HINT', 'FATAL_ERROR', 'TEMP_BLOCK'],
                        state: ['INITIAL'],
                        ConfirmationComponent: 'ConfirmationMobile',
                    },
                }),
            ],
        ],
        evaluate: (page: Page) => page.waitForTimeout(300),
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.005,
        },
    }),
);

describe(
    'ConfirmationMobile | noAttemptsLeftMessage',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: 'INITIAL',
                        state: 'INITIAL',
                        blockSmsRetry: true,
                        ConfirmationComponent: 'ConfirmationMobile',
                    },
                }),
            ],
        ],
        evaluate: (page: Page) => page.waitForTimeout(300),
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.005,
        },
    }),
);
