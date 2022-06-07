/* eslint-disable no-console */
import {
    setupScreenshotTesting,
    generateTestCases,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 1100, height: 220 };

describe(
    'Scrollbar | screenshot',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Scrollbar',
            testStory: false,
            knobs: {
                colors: ['default', 'inverted'],
                direction: ['vertical', 'horizontal'],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe('Scrollbar | interactions tests', () => {
    test('Scrollbar vertical hover test', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Scrollbar',
            testStory: false,
        });

        const { browser, context, page, css } = await openBrowserPage(pageUrl);

        try {
            await page.hover('div[class*=vertical]');

            await matchHtml({
                page,
                expect,
                css,
                screenshotOpts: { clip },
                matchImageSnapshotOptions: {
                    failureThresholdType: 'percent',
                    failureThreshold: 1,
                },
            });
        } catch (e) {
            console.error(e.message);
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });

    test('Scrollbar horizontal hover test', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Scrollbar',
            testStory: false,
            knobs: {
                direction: 'horizontal',
            },
        });

        const { browser, context, page, css } = await openBrowserPage(pageUrl);

        try {
            await page.hover('div[class*=horizontal]');

            await matchHtml({
                page,
                expect,
                css,
                screenshotOpts: { clip },
                matchImageSnapshotOptions: {
                    failureThresholdType: 'percent',
                    failureThreshold: 1,
                },
            });
        } catch (e) {
            console.error(e.message);
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
