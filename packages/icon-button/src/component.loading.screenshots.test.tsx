import { type Browser, type Page } from 'playwright';

import {
    generateTestCases,
    openBrowserPage,
    waitForPreviewShowed,
} from '@alfalab/core-components-screenshot-utils';

describe.each(['IconButton', 'IconButtonDesktop', 'IconButtonMobile'])(
    '%s | loading colors',
    (subComponentName) => {
        let browser: Browser;
        let page: Page;

        beforeAll(async () => {
            ({ browser, page } = await openBrowserPage('about:blank'));
        });

        afterAll(async () => {
            await browser.close();
        });

        const cases = generateTestCases({
            componentName: 'IconButton',
            subComponentName,
            knobs: {
                view: ['primary', 'secondary', 'transparent', 'tertiary', 'negative'],
                colors: ['default', 'inverted'],
                loading: true,
            },
            testStory: false,
        });

        it.each(cases)('%s', async (_, url) => {
            await page.goto(url);
            await waitForPreviewShowed(page);

            const inverted = new URL(url).searchParams.get('knob-colors') === 'inverted';
            const token = `--color-light-neutral-translucent-1300${inverted ? '-inverted' : ''}`;
            const { actual, expected } = await page
                .locator('button > svg')
                .evaluate((spinner, colorToken) => {
                    const style = window.getComputedStyle(spinner);

                    return {
                        actual: style.color,
                        expected: style.getPropertyValue(colorToken).trim(),
                    };
                }, token);

            expect(actual).toBe(expected);
        });
    },
);
