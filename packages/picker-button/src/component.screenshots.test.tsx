/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
    openBrowserPage,
    closeBrowser,
    matchHtml,
    createSpriteStorybookUrl,
    setupScreenshotTesting,
    createStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const options = [
    { key: '4', content: 'Открыть' },
    { key: '5', content: 'Сохранить' },
    { key: '6', content: 'Удалить' },
];

describe('PickerButton', () => {
    createPreview(
        {
            componentName: 'PickerButton',
            knobs: {
                options: JSON.stringify(options),
                label: 'Кнопка',
                size: 'xl',
                view: 'primary',
            },
        },
        'width:800px;transform:scale(2.3)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );

    it('desktop opened', async () => {
        jest.setTimeout(120000);

        const pageUrl = createStorybookUrl({
            componentName: 'PickerButton',
            knobs: {
                options: JSON.stringify(options),
                label: 'Открыть',
                block: true,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.goto(pageUrl);

            await page.click('button[class*=component]');

            await matchHtml({ context, page, expect });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error as Error).message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

describe('PickerButton', () => {
    it('mobile opened', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'PickerButton',
            subComponentName: 'PickerButtonMobile',
            testStory: false,
            knobs: { label: 'Открыть' },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            await page.goto(pageUrl);

            await page.click('button[class*=component]');

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

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'PickerButton | button props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PickerButton',
                    knobs: {
                        options: [options],
                        label: 'Открыть',
                        size: ['xs', 's', 'm'],
                        view: ['link', 'primary', 'secondary'],
                        variant: 'default',
                        disabled: true,
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PickerButton',
                    knobs: {
                        options: [options],
                        label: 'Открыть',
                        size: ['xs', 's', 'm'],
                        view: ['link', 'primary', 'secondary'],
                        variant: 'default',
                        disabled: false,
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PickerButton',
                    knobs: {
                        options: [options],
                        label: 'Открыть',
                        size: ['xs', 's', 'm'],
                        view: ['link', 'primary', 'secondary'],
                        variant: 'compact',
                        disabled: true,
                    },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PickerButton',
                    knobs: {
                        options: [options],
                        label: 'Открыть',
                        size: ['xs', 's', 'm'],
                        view: ['link', 'primary', 'secondary'],
                        variant: 'compact',
                        disabled: false,
                    },
                }),
            ],
        ],
        screenshotOpts: { fullPage: true },
    }),
);
