import {
    closeBrowser,
    createStorybookUrl,
    matchHtml,
    openBrowserPage,
} from '@alfalab/core-components-screenshot-utils';

const longTitle =
    'Несколько тысяч солнечных систем заявило о намерении выйти из состава республики';
const longSubtitle =
    'Это сепаратистское движение, возглавляемое таинственным графом Дуку, сильно осложняет немногочисленным силам рыцарей Джедаев попытки сохранить мир и порядок в галактике';

describe('Mobile demos', () => {
    test.each([
        { name: '001-001-001', scrollTop: 0, title: '', hasBackButton: true },
        { name: '001-001-002', scrollTop: 250, title: '', hasBackButton: true },
        { name: '002-001-001', scrollTop: 0, title: 'Заголовок', headerMode: 'left' },
        { name: '002-001-002', scrollTop: 20, title: 'Заголовок', headerMode: 'left' },
        { name: '002-001-003', scrollTop: 250, title: 'Заголовок', headerMode: 'left' },
        {
            name: '002-002-001',
            scrollTop: 0,
            headerMode: 'left',
            title: 'Заголовок',
            hasBackButton: true,
        },
        {
            name: '002-002-002',
            scrollTop: 250,
            headerMode: 'left',
            title: 'Заголовок',
            hasBackButton: true,
        },
        {
            name: '002-003-001',
            scrollTop: 0,
            headerMode: 'left',
            title: 'Заголовок',
            subtitle: 'Subtitle',
        },
        {
            name: '002-003-002',
            scrollTop: 250,
            headerMode: 'left',
            title: 'Заголовок',
            subtitle: 'Subtitle',
        },
        {
            name: '002-004-001',
            scrollTop: 0,
            headerMode: 'left',
            title: longTitle,
            subtitle: longSubtitle,
        },
        {
            name: '002-004-002',
            scrollTop: 350,
            headerMode: 'left',
            title: longTitle,
            subtitle: longSubtitle,
        },
        {
            name: '002-005-001',
            scrollTop: 0,
            headerMode: 'left',
            hasBackButton: true,
            title: longTitle,
            subtitle: longSubtitle,
        },
        {
            name: '002-005-002',
            scrollTop: 350,
            headerMode: 'left',
            hasBackButton: true,
            title: longTitle,
            subtitle: longSubtitle,
        },
        {
            name: '003-001-001',
            scrollTop: 0,
            title: 'Заголовок',
            subtitle: 'Subtitle',
        },
        {
            name: '003-001-002',
            scrollTop: 200,
            title: 'Заголовок',
            subtitle: 'Subtitle',
        },
        {
            name: '003-002-001',
            scrollTop: 0,
            title: 'Заголовок',
        },
        {
            name: '003-002-002',
            scrollTop: 200,
            title: 'Заголовок',
        },
        { name: '004-001-001', scrollTop: 0, title: '', hasHeaderImage: true },
        { name: '004-001-002', scrollTop: 75, title: '', hasHeaderImage: true },
        { name: '004-001-003', scrollTop: 250, title: '', hasHeaderImage: true },
        {
            name: '005-001-001',
            scrollTop: 0,
            title: 'Заголовок',
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 216,
            headerMode: 'left',
        },
        {
            name: '005-001-002',
            scrollTop: 20,
            title: 'Заголовок',
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 216,
            headerMode: 'left',
        },
        {
            name: '005-001-003',
            scrollTop: 250,
            title: 'Заголовок',
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 216,
            headerMode: 'left',
        },
        {
            name: '005-002-001',
            scrollTop: 0,
            title: longTitle,
            subtitle: longSubtitle,
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 263,
            headerMode: 'left',
        },
        {
            name: '005-002-002',
            scrollTop: 20,
            title: longTitle,
            subtitle: longSubtitle,
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 263,
            headerMode: 'left',
        },
        {
            name: '005-002-003',
            scrollTop: 350,
            title: longTitle,
            subtitle: longSubtitle,
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 263,
            headerMode: 'left',
        },
        {
            name: '005-003-001',
            scrollTop: 0,
            title: longTitle,
            subtitle: longSubtitle,
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 263,
            headerMode: 'left',
            hasBackButton: true,
        },
        {
            name: '005-003-002',
            scrollTop: 20,
            title: longTitle,
            subtitle: longSubtitle,
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 263,
            headerMode: 'left',
            hasBackButton: true,
        },
        {
            name: '005-003-003',
            scrollTop: 350,
            title: longTitle,
            subtitle: longSubtitle,
            hasHeaderImage: true,
            headerImageAspectRatio: 360 / 263,
            headerMode: 'left',
            hasBackButton: true,
        },
    ])(
        '$name',
        async ({
            scrollTop,
            title,
            subtitle = '',
            hasBackButton = false,
            hasHeaderImage = false,
            headerImageAspectRatio = 360 / 180,
            headerMode = 'relative',
        }) => {
            const pageUrl = createStorybookUrl({
                componentName: 'UniversalModal',
                subComponentName: 'Mobile',
                testStory: false,
                knobs: {
                    open: true,
                    header: true,
                    showMore: true,
                    trim: false,
                    'header.title': title,
                    'header.subtitle': subtitle,
                    'header.hasCloser': true,
                    'header.hasBackButton': hasBackButton,
                    'header.image': hasHeaderImage,
                    'header.image.aspectRatio': headerImageAspectRatio,
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
