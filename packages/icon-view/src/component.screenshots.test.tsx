import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'IconView | sprite',
    screenshotTesting({
        cases: [
            [
                'Rectangle size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'Rectangle',
                    knobs: {
                        size: [16, 20, 24, 32, 40, 48],
                        border: [true, false],
                    },
                    size: {
                        width: 100,
                        height: 100,
                    },
                }),
            ],
            [
                'Rectangle size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'Rectangle',
                    knobs: {
                        size: [56, 64, 72, 80, 128],
                        border: [true, false],
                    },
                    size: {
                        width: 140,
                        height: 100,
                    },
                }),
            ],
        ],
        viewport: {
            width: 330,
            height: 760,
        },
        screenshotOpts: {
            fullPage: false,
        },
    }),
);

describe(
    'IconView | sprite',
    screenshotTesting({
        cases: [
            [
                'NoShape size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'NoShape',
                    knobs: {
                        size: [16, 20, 24, 32, 40, 48],
                        border: [true, false],
                    },
                    size: {
                        width: 100,
                        height: 100,
                    },
                }),
            ],
            [
                'NoShape size, border',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'NoShape',
                    knobs: {
                        size: [56, 64, 72, 80, 128],
                        border: [true, false],
                    },
                    size: {
                        width: 140,
                        height: 100,
                    },
                }),
            ],
        ],
        viewport: {
            width: 330,
            height: 760,
        },
        screenshotOpts: {
            fullPage: false,
        },
    }),
);

describe(
    'IconView | Rectangle with Image scale',
    screenshotTesting({
        cases: [
            [
                'Rectangle scale',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'Rectangle',
                    knobs: {
                        size: [32, 64, 80, 128],
                        imageUrl: './images/imgBg.png',
                        scale: ['fit', 'fill'],
                    },
                }),
            ],
        ],
        viewport: {
            width: 600,
            height: 720,
        },
        screenshotOpts: {
            fullPage: false,
        },
    }),
);

describe(
    'IconView | NoShape with Image scale',
    screenshotTesting({
        cases: [
            [
                'NoShape scale',
                createSpriteStorybookUrl({
                    packageName: 'icon-view',
                    componentName: 'NoShape',
                    knobs: {
                        size: [32, 64, 80, 128],
                        imageUrl: './images/imgBg.png',
                        scale: ['fit', 'fill'],
                    },
                }),
            ],
        ],
        viewport: {
            width: 600,
            height: 720,
        },
        screenshotOpts: {
            fullPage: false,
        },
    }),
);
