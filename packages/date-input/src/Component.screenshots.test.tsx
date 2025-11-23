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

describe('DateInput', () =>
    createPreview(
        {
            componentName: 'DateInput',
            knobs: {
                size: 'm',
                value: '01.01.2023',
                label: 'Дата',
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'DateInput | sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['30.12.2005', '01.06.2022'],
                        size: ['s', 'm', 'l', 'xl'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateInput | error',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['30.12.2005', '01.06.2022'],
                        error: [false, true],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateInput | hint',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['30.12.2005', '01.06.2022'],
                        hint: [null, 'Hint'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'DateInput | label',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['30.12.2005', '01.06.2022'],
                        label: [null, 'Label'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
