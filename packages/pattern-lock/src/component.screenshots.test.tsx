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
    viewport = { width: 340, height: 340 },
    clip = DEFAULT_CLIP,
) {
    const pageUrl = createStorybookUrl({
        componentName: 'PatternLock',
        packageName: 'pattern-lock',
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
                    'boxSizing:border-box; display: flex; alignItems: center; justifyContent: center; width: 670px; height: 600px; backgroundColor: var(--color-light-bg-secondary)',
            },
            { width: 639, height: 440 },
            {
                x: 20,
                y: 0,
                width: 639,
                height: 440,
            },
        );
    });

    test('dark-preview', async () => {
        await testComponent(
            {
                darkMode: true,
                wrapperStyles:
                    'boxSizing:border-box; display: flex; alignItems: center; justifyContent: center; width: 670px; height: 600px; backgroundColor: var(--color-light-bg-secondary)',
            },
            { width: 639, height: 440 },
            {
                x: 20,
                y: 0,
                width: 639,
                height: 440,
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
});
