import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
} from '../../screenshot-utils';

describe('IntlPhoneInput ', () =>
    createPreview(
        {
            componentName: 'IntlPhoneInput',
            knobs: {
                label: 'Label',
                value: '%2b7 999 555-35-35',
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.3)',
    ));

describe('IntlPhoneInput | interactions tests', () => {
    test('Fill value', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'IntlPhoneInput',
            testStory: false,
            knobs: {
                block: true,
            },
        });

        const { browser, context, page, css } = await openBrowserPage(pageUrl);

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

            await matchHtml({ context, page, expect, css, matchImageSnapshotOptions });

            await page.click('[role="combobox"] >> span');

            await matchHtml({ context, page, expect, css, matchImageSnapshotOptions });

            await page.click('[role="option"]');

            await matchHtml({ context, page, expect, css, matchImageSnapshotOptions });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
