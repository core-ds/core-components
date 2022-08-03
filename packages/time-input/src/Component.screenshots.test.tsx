import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

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
