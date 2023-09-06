import {
    createStorybookUrl,
    openBrowserPage,
    matchHtml,
    closeBrowser,
    CreateStorybookUrlParams,
} from '../../screenshot-utils';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';

const DEFAULT_CLIP = {
    x: 0,
    y: 0,
    width: 400,
    height: 500,
};

async function testComponent(
    urlParams: Partial<CreateStorybookUrlParams>,
    viewport = { width: 400, height: 500 },
    clip = DEFAULT_CLIP,
) {
    const pageUrl = createStorybookUrl({
        componentName: 'PatternLock',
        testStory: false,
        knobs: {},
        ...urlParams,
    });

    const { browser, context, page } = await openBrowserPage(pageUrl, undefined, { viewport });

    const matchImageSnapshotOptions: MatchImageSnapshotOptions = {
        failureThresholdType: 'percent',
        failureThreshold: 0.01,
    };

    try {
        await matchHtml({
            context,
            page,
            expect,
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

describe('PatternLock ', () => {
    test('preview', async () => {
        await testComponent(
            {
                wrapperStyles:
                    'boxSizing:border-box; display: flex; alignItems: center; justifyContent: center; width: 800px; height: 600px; backgroundColor: var(--color-light-bg-secondary)',
            },
            { width: 800, height: 600 },
            {
                x: 88,
                y: 60,
                width: 640,
                height: 480,
            },
        );
    });

    test('dark-preview', async () => {
        await testComponent(
            {
                darkMode: true,
                wrapperStyles:
                    'boxSizing:border-box; display: flex; alignItems: center; justifyContent: center; width: 800px; height: 600px; backgroundColor: var(--color-light-bg-secondary)',
            },
            { width: 800, height: 600 },
            {
                x: 88,
                y: 60,
                width: 640,
                height: 480,
            },
        );
    });
});

describe('PatternLock | screenshots', () => {
    test('default', async () => {
        await testComponent({});
    });

    test('default with forgot code button', async () => {
        await testComponent({ knobs: { showForgotCodeBtn: true } });
    });

    test('justifyNodes - space-around', async () => {
        await testComponent({ knobs: { justifyNodes: 'space-around' } });
    });

    test('error message', async () => {
        await testComponent({ knobs: { error: 'Error message' } });
    });

    test('message', async () => {
        await testComponent({ knobs: { message: 'Message' } });
    });

    test('m - viewport', async () => {
        await testComponent({}, { width: 370, height: 500 });
    });

    test('s - viewport', async () => {
        await testComponent({}, { width: 320, height: 400 });
    });

    test('m - viewport with forgot code button', async () => {
        await testComponent({ knobs: { showForgotCodeBtn: true } }, { width: 370, height: 500 });
    });

    test('s - viewport with forgot code button', async () => {
        await testComponent({ knobs: { showForgotCodeBtn: true } }, { width: 320, height: 400 });
    });
});
