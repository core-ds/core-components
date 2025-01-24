import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import {
    setupScreenshotTesting,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
    createSpriteStorybookUrl,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('InputAutocomplete', () => {
    createPreview(
        {
            packageName: 'input-autocomplete',
            componentName: 'InputAutocomplete',
            knobs: {
                label: 'Автокомплит',
                size: 56,
                block: true,
                selected: '["1"]',
                options: '[{"key": "1", "content": "Вариант из списка"}]',
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
    );
});

describe(
    'InputAutocomplete | screenshots rightAddons',
    screenshotTesting({
        cases: [
            [
                `default theme sprite`,
                createSpriteStorybookUrl({
                    componentName: 'InputAutocomplete',
                    knobs: {
                        label: 'Автокомплит',
                        size: 56,
                        block: true,
                        selected: [['1']],
                        options: [[{ key: '1', content: 'Вариант из списка' }]],
                        success: [true, false],
                        error: [undefined, 'Error'],
                    },
                    size: { width: 200, height: 150 },
                }),
            ],
        ],
        theme: 'default',
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'InputAutocomplete | screenshots rightAddons',
    screenshotTesting({
        cases: [
            [
                `site theme sprite`,
                createSpriteStorybookUrl({
                    componentName: 'InputAutocomplete',
                    knobs: {
                        label: 'Автокомплит',
                        size: 56,
                        block: true,
                        selected: [['1']],
                        options: [[{ key: '1', content: 'Вариант из списка' }]],
                        success: [true, false],
                        error: [undefined, 'Error'],
                    },
                    size: { width: 200, height: 150 },
                }),
            ],
        ],
        theme: 'site',
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe('InputAutocomplete | interactions tests', () => {
    test('Fill value', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'InputAutocomplete',
            subComponentName: 'InputAutocompleteDesktop',
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
            await matchHtml({ context, page, expect, matchImageSnapshotOptions });

            await page.focus('input');

            await matchHtml({ context, page, expect, matchImageSnapshotOptions });

            await page.fill('input', 'D');

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

describe('InputAutocompleteMobile | interactions tests', () => {
    test('Fill value', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'InputAutocomplete',
            subComponentName: 'InputAutocompleteMobile',
            testStory: false,
            knobs: {
                block: true,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        const matchImageSnapshotOptions: MatchImageSnapshotOptions = {
            failureThresholdType: 'percent',
            failureThreshold: 0.1,
        };

        try {
            await matchHtml({ context, page, expect, matchImageSnapshotOptions });

            await page.click('[role="combobox"]');

            await matchHtml({ context, page, expect, matchImageSnapshotOptions });

            await page.fill('input', 'D');

            await page.click('button[data-test-id="InputAutocomplete-apply"]');

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

describe('InputAutocompleteModalMobile | interactions', () => {
    test('Fill value', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'InputAutocomplete',
            subComponentName: 'InputAutocompleteModalMobile',
            testStory: false,
            knobs: {
                block: true,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.click('[role="combobox"]');

            await page.waitForTimeout(300);

            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: {
                    fullPage: true,
                },
            });

            await page.fill('input', 'Nep');

            await page.waitForTimeout(300);

            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: {
                    fullPage: true,
                },
            });

            await page.click('button[data-test-id="InputAutocomplete-apply"]');

            await matchHtml({
                context,
                page,
                expect,
                screenshotOpts: {
                    fullPage: true,
                },
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
