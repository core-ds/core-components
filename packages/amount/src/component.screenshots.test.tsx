import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Amount', () =>
    createPreview(
        {
            componentName: 'Amount',
            knobs: {
                value: '123456700',
                minority: 100,
                currency: 'RUR',
                view: 'withZeroMinorPart',
            },
        },
        'transform:scale(4)',
    ));

describe(
    'Amount | screenshots',
    screenshotTesting({
        cases: [
            [
                'main',
                createSpriteStorybookUrl({
                    componentName: 'Amount',
                    knobs: {
                        value: 12300,
                        currency: ['RUR', 'USD'],
                        minority: [100, 10],
                        view: ['default', 'withZeroMinorPart'],
                    },
                    size: { width: 100, height: 50 },
                }),
            ],
            [
                'styles',
                createSpriteStorybookUrl({
                    componentName: 'Amount',
                    knobs: {
                        value: 12300,
                        currency: 'RUR',
                        minority: 100,
                        view: 'withZeroMinorPart',
                        bold: ['none', 'full', 'major'],
                        transparentMinor: [false, true],
                    },
                    size: { width: 100, height: 50 },
                }),
            ],
        ],
    }),
);
