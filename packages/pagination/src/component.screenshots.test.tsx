import {
    createPreview,
    createSpriteStorybookUrl,
    setupScreenshotTesting,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Pagination ', () => {
    createPreview(
        {
            componentName: 'Pagination',
            knobs: {
                pagesCount: 3,
            },
        },
        'transform:scale(2.9)',
    );
});

describe(
    'Pagination | large numbers',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Pagination',
                    knobs: {
                        pagesCount: 21999,
                        currentPageIndex: [0, 98, 998, 9998, 21998],
                    },
                    size: { width: 600, height: 50 },
                }),
            ],
        ],
        screenshotOpts: { clip: { x: 0, y: 0, width: 600, height: 400 } },
    }),
);
