import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    Knobs,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const clip = { x: 0, y: 0, width: 768, height: 200 };

const componentTest = async (knobs: Knobs) => {
    const pageUrl = createStorybookUrl({
        componentName: 'Accordion',
        knobs,
        testStory: false,
    });

    const { browser, context, page } = await openBrowserPage(pageUrl);

    try {
        await matchHtml({
            context,
            page,
            expect,
            screenshotOpts: { clip },
            matchImageSnapshotOptions: {
                failureThresholdType: 'percent',
                failureThreshold: 0.2,
            },
        });

        await page.click('[role*=button]');

        await matchHtml({
            context,
            page,
            expect,
            screenshotOpts: { clip },
            matchImageSnapshotOptions: {
                failureThresholdType: 'percent',
                failureThreshold: 0.2,
            },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error((error as Error).message);

        throw error;
    } finally {
        await closeBrowser({ browser, context, page });
    }
};

describe('Accordion ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Accordion',
            knobs: {
                control: false,
            },
        },
        'transform:scale(1.3);padding:0 200px 0',
    ));

describe('Accordion with expanded mode', () => {
    test('component', () => componentTest({}));
    test('control position - start', () => componentTest({ controlPosition: 'start' }));
    test('without control prop', () => componentTest({ control: false }));
    test('without control prop with position - start', () =>
        componentTest({ control: false, controlPosition: 'start' }));
});
