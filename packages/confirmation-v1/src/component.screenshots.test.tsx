import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'ConfirmationV1 | code, charAmount, align',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ConfirmationV1',
                    packageName: 'confirmation-v1',
                    size: { width: 450, height: 450 },
                    knobs: {
                        code: '',
                        alignContent: ['left', 'center'],
                        requiredCharAmount: [3, 5],
                        countdownDuration: 0,
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ConfirmationV1',
                    packageName: 'confirmation-v1',
                    size: { width: 450, height: 450 },
                    knobs: {
                        code: '1234',
                        alignContent: ['left', 'center'],
                        requiredCharAmount: [3, 5],
                        countdownDuration: 0,
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
    'ConfirmationV1 | phone, phoneMask, countdown',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ConfirmationV1',
                    packageName: 'confirmation-v1',
                    size: { width: 450, height: 450 },
                    knobs: {
                        code: ['12345'],
                        phone: '+7 000 000 00 42',
                        hasPhoneMask: [true, false],
                        hasSmsCountdown: [true, false],
                        countdownDuration: 0,
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
    'ConfirmationV1 | codeChecking, codeSending',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ConfirmationV1',
                    packageName: 'confirmation-v1',
                    size: { width: 450, height: 450 },
                    knobs: {
                        code: ['12345'],
                        codeChecking: [true, false],
                        codeSending: [true, false],
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
    'ConfirmationV1 | sign error',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ConfirmationV1',
                    packageName: 'confirmation-v1',
                    size: { width: 450, height: 450 },
                    knobs: {
                        code: ['12345'],
                        error: true,
                        errorText: 'Неправильный код',
                        errorIsFatal: [true, false],
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
    'ConfirmationV1 | noAttemptsLeftMessage',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ConfirmationV1',
                    packageName: 'confirmation-v1',
                    size: { width: 450, height: 450 },
                    knobs: {
                        code: ['12345'],
                        error: true,
                        errorText: 'Неправильный код',
                        noAttemptsLeftMessage: ['', 'Не осталось попыток запроса кода'],
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

describe('ConfirmationV1 | interactions tests', () => {
    test('Open don`t receive sms', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'ConfirmationV1',
            packageName: 'confirmation-v1',
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.locator('button', { hasText: 'Не приходит код?' }).click();

            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: { clip: { x: 0, y: 60, width: 500, height: 450 } },
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
