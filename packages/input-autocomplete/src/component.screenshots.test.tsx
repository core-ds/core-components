import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import {
    setupScreenshotTesting,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createPreview,
    createSpriteStorybookUrl,
    generateTestCases,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('InputAutocomplete', () => {
    createPreview(
        {
            packageName: 'select',
            componentName: 'SelectDesktop',
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

describe('InputAutocomplete | screenshots rightAddons', () => {
    const testCase = (theme: string) => {
        return screenshotTesting({
            cases: [
                [
                    `${theme} theme sprite`,
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
            theme,
            screenshotOpts: {
                fullPage: true,
            },
        })();
    };

    ['default', 'site'].forEach((theme) => testCase(theme));
});

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

describe('InputAutocompleteDesktop | screenshots addons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `theme ${theme}`,
                    createSpriteStorybookUrl({
                        packageName: 'input-autocomplete',
                        componentName: 'InputAutocompleteDesktop',
                        knobs: {
                            block: true,
                            value: 'Neptunium',
                            selected: JSON.stringify([{ key: 'Neptunium' }]),
                            options: JSON.stringify([
                                { key: 'Neptunium', content: 'Вариант из списка' },
                            ]),
                            success: true,
                            inputProps: ['{"rightAddons":"right","clear":true}'],
                            size: [40, 48, 56, 64, 72],
                        },
                    }),
                ],
                [
                    `theme ${theme}`,
                    createSpriteStorybookUrl({
                        packageName: 'input-autocomplete',
                        componentName: 'InputAutocompleteDesktop',
                        knobs: {
                            block: true,
                            value: 'Neptunium',
                            selected: JSON.stringify([{ key: 'Neptunium' }]),
                            options: JSON.stringify([
                                { key: 'Neptunium', content: 'Вариант из списка' },
                            ]),
                            error: true,
                            inputProps: ['{"rightAddons":"right","clear":true}'],
                            size: [40, 48, 56, 64, 72],
                        },
                    }),
                ],
                [
                    `theme ${theme} | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'input-autocomplete',
                        componentName: 'InputAutocompleteDesktop',
                        knobs: {
                            block: true,
                            value: 'Neptunium',
                            selected: JSON.stringify([{ key: 'Neptunium' }]),
                            options: JSON.stringify([
                                { key: 'Neptunium', content: 'Вариант из списка' },
                            ]),
                            inputProps: ['{"rightAddons":"right","clear":true}'],
                            size: [40, 48],
                            disabled: [false, true],
                        },
                    }),
                ],
            ],
            theme,
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 350,
                height: 620,
            },
        })();

    ['default', 'site'].forEach((theme) => testCase(theme));
});

describe('InputAutocompleteMobile | screenshots addons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `theme ${theme}`,
                    createSpriteStorybookUrl({
                        packageName: 'input-autocomplete',
                        componentName: 'InputAutocompleteMobile',
                        knobs: {
                            block: true,
                            value: 'Neptunium',
                            selected: JSON.stringify([{ key: 'Neptunium' }]),
                            options: JSON.stringify([
                                { key: 'Neptunium', content: 'Вариант из списка' },
                            ]),
                            success: true,
                            fieldProps: ['{"rightAddons":"right"}'],
                            inputProps: ['{"clear":true}'],
                            size: [40, 48, 56, 64, 72],
                        },
                    }),
                ],
                [
                    `theme ${theme}`,
                    createSpriteStorybookUrl({
                        packageName: 'input-autocomplete',
                        componentName: 'InputAutocompleteMobile',
                        knobs: {
                            block: true,
                            value: 'Neptunium',
                            selected: JSON.stringify([{ key: 'Neptunium' }]),
                            options: JSON.stringify([
                                { key: 'Neptunium', content: 'Вариант из списка' },
                            ]),
                            error: true,
                            fieldProps: ['{"rightAddons":"right"}'],
                            inputProps: ['{"clear":true}'],
                            size: [40, 48, 56, 64, 72],
                        },
                    }),
                ],
                [
                    `theme ${theme} | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'input-autocomplete',
                        componentName: 'InputAutocompleteMobile',
                        knobs: {
                            block: true,
                            value: 'Neptunium',
                            selected: JSON.stringify([{ key: 'Neptunium' }]),
                            options: JSON.stringify([
                                { key: 'Neptunium', content: 'Вариант из списка' },
                            ]),
                            fieldProps: ['{"rightAddons":"right"}'],
                            inputProps: ['{"clear":true}'],
                            size: [40, 48],
                            disabled: [false, true],
                        },
                    }),
                ],
            ],
            theme,
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 350,
                height: 620,
            },
        })();

    ['default', 'site'].forEach((theme) => testCase(theme));
});

describe(
    'InputAutocompleteDesktop | disabled with arrow',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'InputAutocomplete',
                subComponentName: 'InputAutocompleteDesktop',
                testStory: false,
                knobs: {
                    block: true,
                    size: [40, 48],
                    Arrow: [true],
                    disabled: [false, true],
                },
            }),
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 320,
            height: 80,
        },
    }),
);

describe(
    'InputAutocompleteMobile | disabled with arrow',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'InputAutocomplete',
                subComponentName: 'InputAutocompleteMobile',
                testStory: false,
                knobs: {
                    block: true,
                    size: [40, 48],
                    Arrow: [true],
                    disabled: [false, true],
                },
            }),
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 320,
            height: 80,
        },
    }),
);
