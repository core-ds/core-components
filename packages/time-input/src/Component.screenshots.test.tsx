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

describe('TimeInput', () =>
    createPreview(
        {
            componentName: 'TimeInput',
            knobs: {
                size: 'm',
                value: '12:48',
                label: 'Время',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
    ));

describe(
    'TimeInput | sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'TimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['00:00', '20:32'],
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
    'TimeInput | error',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'TimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['00:00', '20:32'],
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
    'TimeInput | hint',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'TimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['00:00', '20:32'],
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
    'TimeInput | label',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'TimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['00:00', '20:32'],
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
    'TimeInput | placeholder',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'TimeInput',
                    size: { width: 350, height: 400 },
                    knobs: {
                        value: ['00:00', '20:32'],
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
