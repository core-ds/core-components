/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
    openBrowserPage,
    closeBrowser,
    matchHtml,
    createSpriteStorybookUrl,
    setupScreenshotTesting,
    createStorybookUrl,
} from '../../screenshot-utils';

const options = [
    { key: '4', content: 'Открыть' },
    { key: '5', content: 'Сохранить' },
    { key: '6', content: 'Удалить' },
];

describe('PickerButton', () => {
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

        const { browser, context, page, css } = await openBrowserPage(pageUrl);

        try {
            await page.goto(pageUrl);

            await page.click('button[class*=component]');

            await matchHtml({
                page,
                expect,
                css,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error.message);

            throw error;
        } finally {
            await closeBrowser({ browser, context, page });
        }
    });
});

describe('PickerButton', () => {
    it('mobile opened', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Pickerbutton',
            subComponentName: 'PickerButtonMobile',
            testStory: false,
            knobs: {
                block: true,
                options: JSON.stringify(options),
                label: 'Открыть',
            },
        });

        const { browser, context, page, css } = await openBrowserPage(pageUrl);

        try {
            await page.goto(pageUrl);

            await page.click('button[class*=component]');

            await matchHtml({
                page,
                expect,
                css,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error.message);

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
                        variant: ['default', 'compact'],
                        disabled: [true, false],
                    },
                }),
            ],
        ],
        screenshotOpts: { fullPage: true },
    }),
);
