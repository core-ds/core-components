import {
    setupScreenshotTesting,
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Attach', () =>
    createPreview(
        {
            componentName: 'Attach',
            knobs: {
                size: 64,
                buttonContent: 'Выберите файл',
                noFileText: ' ',
            },
        },
        'width:800px;paddingLeft:3px;transform: scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'Attach | screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Attach',
                    knobs: {
                        buttonContent: 'Выберите файл',
                        noFileText: 'Нет файла',
                        size: [40, 48, 56, 64],
                    },
                    size: { width: 400, height: 100 },
                }),
            ],
        ],
    }),
);

describe('Attach | interactions tests', () => {
    test('Attach file', async () => {
        const pageUrl = createStorybookUrl({
            componentName: 'Attach',
            knobs: {
                buttonContent: 'Выберите файл',
                size: 64,
                progressBarPercent: 75,
            },
        });

        const { browser, context, page } = await openBrowserPage(pageUrl);

        try {
            const [fileChooser] = await Promise.all([
                page.waitForEvent('filechooser'),
                page.click('button[class*=component]'),
            ]);

            await fileChooser.setFiles({
                name: 'my-file.pdf',
                buffer: Buffer.from([]),
                mimeType: 'application/pdf',
            });

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
