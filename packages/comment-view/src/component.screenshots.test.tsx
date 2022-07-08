import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Comment view | main prop',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CommentView',
                    size: { width: 150, height: 40 },
                    knobs: {
                        children: 'Comment',
                    },
                }),
            ],
        ],
    }),
);
