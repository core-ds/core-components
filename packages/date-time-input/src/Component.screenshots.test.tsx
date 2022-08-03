import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'DateTimeInput | sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        size: ['s', 'm', 'l'],
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
    'DateTimeInput | error',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
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
    'DateTimeInput | hint',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
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
    'DateTimeInput | label',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
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

describe(
    'DateTimeInput | placeholder',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'DateTimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['12.12.2021, 14:22', '07.09.2020, 00:00'],
                        placeholder: [null, 'placeholder'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
