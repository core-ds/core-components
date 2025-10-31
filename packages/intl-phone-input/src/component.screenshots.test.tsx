import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
} from '@alfalab/core-components-screenshot-utils';

describe('IntlPhoneInput | interactions tests', () => {
    test('Fill value', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'IntlPhoneInput',
            testStory: false,
            knobs: {
                block: true,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        const matchImageSnapshotOptions: MatchImageSnapshotOptions = {
            failureThresholdType: 'percent',
            // TODO:
            failureThreshold: 4,
        };

        try {
            await page.waitForLoadState('networkidle');

            /**
             * Ждем, пока библиотека libphonenumber-js отформатирует номер телефона
             */
            await page.waitForTimeout(500);

            await matchHtml({ context, page, expect, matchImageSnapshotOptions });

            await page.click('[role="combobox"] >> span');

            await matchHtml({ context, page, expect, matchImageSnapshotOptions });

            await page.click('[role="option"]');

            await matchHtml({ context, page, expect, matchImageSnapshotOptions });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
