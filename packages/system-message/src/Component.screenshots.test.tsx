import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    Knobs,
    EvaluateFn,
    createPreview,
} from '../../screenshot-utils';

const clip = { x: 0, y: 0, width: 450, height: 680 };
const mobileViewport = { width: 370, height: 660 };

async function testComponent(
    knobs: Knobs,
    viewport = { width: 1280, height: 540 },
    evaluate?: EvaluateFn,
) {
    const pageUrl = createStorybookUrl({
        componentName: 'SystemMessage',
        testStory: false,
        knobs,
    });

    const { browser, context, page } = await openBrowserPage(pageUrl, undefined, {
        viewport,
    });

    try {
        await matchHtml({
            context,
            page,
            expect,
            viewport,
            screenshotOpts: { clip },
            evaluate,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error((error as Error).message);

        throw error;
    } finally {
        await closeBrowser({ browser, context, page });
    }
}

const waitForImageLoad: EvaluateFn = (page) => {
    return page.waitForFunction(
        (selector) =>
            Array.from(document.querySelectorAll(selector)).every(
                (img) => (img as HTMLImageElement).complete,
            ),
        'img[src]',
    );
};

const DESKTOP_TESTS: Record<string, { knobs: Knobs; evaluate?: EvaluateFn }> = {
    default: { knobs: {} },
    primary_button: { knobs: { showPrimaryButton: true, showSecondaryButton: false } },
    graphic_image: { knobs: { graphic: 'Img' }, evaluate: waitForImageLoad },
};

const MOBILE_TESTS: Record<string, { knobs: Knobs; evaluate?: EvaluateFn }> = {
    primary_button: { knobs: { showPrimaryButton: true, showSecondaryButton: false } },
    column_footer: { knobs: { direction: 'column' } },
    row_footer: { knobs: { direction: 'row' } },
    full_height: { knobs: { direction: 'column', fullHeight: true } },
    row_footer_and_full_height: { knobs: { direction: 'row', fullHeight: true } },
    graphic_image: { knobs: { graphic: 'Img' }, evaluate: waitForImageLoad },
    graphic_image_and_full_height: {
        knobs: { graphic: 'Img', fullHeight: true },
        evaluate: waitForImageLoad,
    },
};

describe('SystemMessage ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'SystemMessage',
            knobs: {
                breakpoint: 600,
            },
        },
        'width:800px;transform:scale(0.9)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );

    describe('desktop', () => {
        Object.keys(DESKTOP_TESTS).forEach((testName) => {
            test(testName, () => testComponent(DESKTOP_TESTS[testName].knobs));
        });
    });

    describe('mobile', () => {
        Object.keys(MOBILE_TESTS).forEach((testName) => {
            test(testName, () =>
                testComponent(
                    MOBILE_TESTS[testName].knobs,
                    mobileViewport,
                    MOBILE_TESTS[testName].evaluate,
                ),
            );
        });
    });
});
