import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    CreateStorybookUrlParams,
} from '../../screenshot-utils';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';

const clip = { x: 0, y: 0, width: 400, height: 500 };

async function testComponent(
    urlParams: Partial<CreateStorybookUrlParams>,
    viewport = { width: 400, height: 500 },
) {
    const pageUrl = createStorybookUrl({
        componentName: 'PatternLock',
        testStory: false,
        knobs: {},
        ...urlParams,
    });

    const { browser, context, page, css } = await openBrowserPage(pageUrl, undefined, { viewport });

    const matchImageSnapshotOptions: MatchImageSnapshotOptions = {
        failureThresholdType: 'percent',
        failureThreshold: 0.01,
    };

    try {
        await page.waitForTimeout(100);

        await page.locator('canvas').evaluate((canvas: HTMLCanvasElement) => {
            const canvasStyles = getComputedStyle(canvas);
            const img = document.createElement('img');
            img.style.display = canvasStyles.display;
            img.style.margin = canvasStyles.margin;
            img.src = canvas.toDataURL('png');
            canvas.parentNode!.replaceChild(img, canvas);
        });

        await matchHtml({
            context,
            page,
            expect,
            css,
            matchImageSnapshotOptions,
            viewport,
            screenshotOpts: { clip },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error((error as Error).message);

        throw error;
    } finally {
        await closeBrowser({ browser, context, page });
    }
}

describe('PatternLock | screenshots', () => {
    test('default', async () => {
        await testComponent({});
    });

    test('justifyNodes - space-around', async () => {
        await testComponent({ knobs: { justifyNodes: 'space-around' } });
    });

    test('error message', async () => {
        await testComponent({ knobs: { error: 'Error message' } });
    });

    test('m - viewport', async () => {
        await testComponent({}, { width: 370, height: 500 });
    });

    test('s - viewport', async () => {
        await testComponent({}, { width: 320, height: 400 });
    });
});
