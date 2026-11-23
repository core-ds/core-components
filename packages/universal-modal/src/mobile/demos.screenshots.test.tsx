import {
    closeBrowser,
    createStorybookUrl,
    matchHtml,
    openBrowserPage,
} from '@alfalab/core-components-screenshot-utils';

describe('Mobile demos', () => {
    test.each([
        { name: '001-001', scrollTop: 0, title: '', hasBackButton: true },
        { name: '001-002', scrollTop: 250, title: '', hasBackButton: true },
        { name: '002-001', scrollTop: 0, title: 'Заголовок', headerMode: 'left' },
        { name: '002-002', scrollTop: 250, title: 'Заголовок', headerMode: 'left' },
        {
            name: '002-003',
            scrollTop: 0,
            headerMode: 'left',
            title: 'Заголовок',
            hasBackButton: true,
        },
        {
            name: '002-004',
            scrollTop: 250,
            headerMode: 'left',
            title: 'Заголовок',
            hasBackButton: true,
        },
        {
            name: '002-005',
            scrollTop: 0,
            headerMode: 'left',
            title: 'Заголовок',
            subtitle: 'Subtitle',
        },
        {
            name: '002-006',
            scrollTop: 250,
            headerMode: 'left',
            title: 'Заголовок',
            subtitle: 'Subtitle',
        },
        {
            name: '002-007',
            scrollTop: 0,
            headerMode: 'left',
            trim: false,
            title: 'Несколько тысяч солнечных систем заявило о намерении выйти из состава республики',
            subtitle:
                'Это сепаратистское движение, возглавляемое таинственным графом Дуку, сильно осложняет немногочисленным силам рыцарей Джедаев попытки сохранить мир и порядок в галактике',
        },
        {
            name: '002-008',
            scrollTop: 350,
            headerMode: 'left',
            trim: false,
            title: 'Несколько тысяч солнечных систем заявило о намерении выйти из состава республики',
            subtitle:
                'Это сепаратистское движение, возглавляемое таинственным графом Дуку, сильно осложняет немногочисленным силам рыцарей Джедаев попытки сохранить мир и порядок в галактике',
        },
        {
            name: '002-009',
            scrollTop: 0,
            headerMode: 'left',
            trim: false,
            hasBackButton: true,
            title: 'Несколько тысяч солнечных систем заявило о намерении выйти из состава республики',
            subtitle:
                'Это сепаратистское движение, возглавляемое таинственным графом Дуку, сильно осложняет немногочисленным силам рыцарей Джедаев попытки сохранить мир и порядок в галактике',
        },
        {
            name: '002-010',
            scrollTop: 350,
            headerMode: 'left',
            trim: false,
            hasBackButton: true,
            title: 'Несколько тысяч солнечных систем заявило о намерении выйти из состава республики',
            subtitle:
                'Это сепаратистское движение, возглавляемое таинственным графом Дуку, сильно осложняет немногочисленным силам рыцарей Джедаев попытки сохранить мир и порядок в галактике',
        },
    ])(
        '$name',
        async ({
            scrollTop,
            title,
            subtitle = '',
            hasBackButton = false,
            headerMode = 'relative',
            trim = true,
        }) => {
            const pageUrl = createStorybookUrl({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    showMore: true,
                    trim,
                    'header.title': title,
                    'header.subtitle': subtitle,
                    'header.hasCloser': true,
                    'header.hasBackButton': hasBackButton,
                    'footer.sticky': true,
                    'header.headerMode': headerMode,
                },
            });

            const { browser, context, page } = await openBrowserPage(pageUrl);

            try {
                await matchHtml({
                    context,
                    page,
                    expect,
                    viewport: { width: 360, height: 720 },
                    screenshotOpts: { fullPage: false },
                    evaluate: async (preview) => {
                        const scrollContainerSelector = '[role="dialog"] > div';

                        if (scrollTop > 0) {
                            const actualScrollTop = await preview
                                .locator(scrollContainerSelector)
                                .evaluate((element, top) => {
                                    element.scrollTop = top;
                                    return element.scrollTop;
                                }, scrollTop);

                            expect(actualScrollTop).toBe(scrollTop);
                        }

                        await preview.waitForFunction((selector) => {
                            const scrollContainer = document.querySelector<HTMLElement>(selector);
                            const footer = scrollContainer?.querySelector(
                                '[data-name="universal-modal-base-footer"]',
                            );

                            if (!scrollContainer?.offsetHeight || !footer) {
                                return false;
                            }

                            const hasContentBelow =
                                scrollContainer.scrollHeight - scrollContainer.offsetHeight >
                                scrollContainer.scrollTop;
                            const hasDivider = getComputedStyle(footer).boxShadow !== 'none';

                            return hasDivider === hasContentBelow;
                        }, scrollContainerSelector);
                    },
                });
            } finally {
                await closeBrowser({ browser, context, page });
            }
        },
    );
});
