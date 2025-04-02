import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PageIndicatorDynamic', () =>
    createPreview({
        packageName: 'page-indicator',
        componentName: 'PageIndicatorDynamic',
        knobs: {
            active: false,
        },
    }));

describe(
    'PageIndicatorDynamic | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'page-indicator',
                    componentName: 'PageIndicatorDynamic',
                    knobs: {
                        activeElement: [0, 5, 8],
                        elements: [10, 12],
                        size: [6, 8],
                        activeElementSize: [80, 100],
                        gap: [6, 8],
                        active: false,
                    },
                    size: { width: 300, height: 20 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: { width: 1024, height: 600 },
    }),
);

describe('PageIndicatorBullet', () =>
    createPreview({
        packageName: 'page-indicator',
        componentName: 'PageIndicatorBullet',
        knobs: {
            activeElement: 0,
        },
    }));

describe(
    'PageIndicatorBullet | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'page-indicator',
                    componentName: 'PageIndicatorBullet',
                    knobs: {
                        activeElement: [0, 2, 5],
                        elements: [5, 6, 10],
                        size: [6, 8],
                        gap: [6, 8],
                    },
                    size: { width: 100, height: 20 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: { width: 1024, height: 600 },
    }),
);

describe('PageIndicatorStep', () =>
    createPreview(
        {
            packageName: 'page-indicator',
            componentName: 'PageIndicatorStep',
            knobs: {
                activeElement: 0,
            },
        },
        '',
        {
            evaluate: async (page) => {
                await page.$eval('[class^=pageIndicator]', (el) => {
                    const div = document.createElement('div');
                    div.style.setProperty('width', '200px');
                    el.parentElement?.replaceChild(div, el);
                    div.appendChild(el);
                });
            },
        },
    ));

describe(
    'PageIndicatorStep | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'page-indicator',
                    componentName: 'PageIndicatorStep',
                    knobs: {
                        activeElement: [0, 5, 8],
                        elements: [10, 12],
                        size: [6, 8],
                        gap: [6, 8],
                    },
                    size: { width: 200, height: 20 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: { width: 1024, height: 600 },
    }),
);

describe('PageIndicatorRunner', () =>
    createPreview(
        {
            packageName: 'page-indicator',
            componentName: 'PageIndicatorRunner',
            knobs: {
                activeElement: 0,
            },
        },
        '',
        {
            evaluate: async (page) => {
                await page.$eval('[class^=pageIndicator]', (el) => {
                    const div = document.createElement('div');
                    div.style.setProperty('width', '200px');
                    el.parentElement?.replaceChild(div, el);
                    div.appendChild(el);
                });
            },
        },
    ));

describe(
    'PageIndicatorRunner | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    packageName: 'page-indicator',
                    componentName: 'PageIndicatorRunner',
                    knobs: {
                        activeElement: [0, 5, 8],
                        elements: [10, 12],
                        size: [6, 8],
                    },
                    size: { width: 200, height: 20 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: { width: 1024, height: 600 },
    }),
);
