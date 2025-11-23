import { Page } from 'playwright';
import {
    closeBrowser,
    createStorybookUrl,
    matchHtml,
    openBrowserPage,
} from '@alfalab/core-components-screenshot-utils';

const clip = { x: 0, y: 0, width: 300, height: 80 };

describe('WithSuffix', () => {
    test('suffix styles', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'withSuffix',
            testStory: false,
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: { clip },
                evaluate: (remotePage: Page) =>
                    remotePage.focus('input').then(() => remotePage.waitForTimeout(500)),
            });
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});
