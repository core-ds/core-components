import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

// DESKTOP

describe('Confirmation ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'Confirmation',
            knobs: {},
        },
        'width:800px;transform:scale(0.9)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe(
    'Confirmation | code, charAmount, align',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    packageName: 'confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: 'INITIAL',
                        state: 'INITIAL',
                        alignContent: ['left', 'center'],
                        requiredCharAmount: [5, 7],
                        phone: '+7 ··· ··· 07 24',
                        ConfirmationComponent: 'Confirmation',
                        countdownDuration: 0,
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
    'Confirmation | CODE_CHECKING, CODE_SENDING, CODE_ERROR, CODE_EXPIRED states',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    packageName: 'confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: ['INITIAL'],
                        state: [
                            'INITIAL',
                            'CODE_CHECKING',
                            'CODE_SENDING',
                            'CODE_ERROR',
                            'CODE_EXPIRED',
                        ],
                        ConfirmationComponent: 'Confirmation',
                        countdownDuration: 0,
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
    'Confirmation | HINT, FATAL_ERROR, TEMP_BLOCK, TEMP_BLOCK_OVER screens',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    packageName: 'confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: ['HINT', 'FATAL_ERROR', 'TEMP_BLOCK', 'TEMP_BLOCK_OVER'],
                        state: ['INITIAL'],
                        ConfirmationComponent: 'Confirmation',
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
    'Confirmation | noAttemptsLeftMessage',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Confirmation',
                    packageName: 'confirmation',
                    size: { width: 450, height: 450 },
                    knobs: {
                        screen: 'INITIAL',
                        state: 'INITIAL',
                        blockSmsRetry: true,
                        ConfirmationComponent: 'Confirmation',
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
