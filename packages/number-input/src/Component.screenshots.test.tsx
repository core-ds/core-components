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

describe('NumberInput ', () =>
    createPreview(
        {
            componentName: 'NumberInput',
            knobs: {
                label: 'Число',
                value: 1234,
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('NumberInput Stepper', () =>
    createPreview(
        {
            componentName: 'NumberInput',
            knobs: {
                label: 'Число',
                value: 1234,
                size: 56,
                block: true,
                step: 1,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'NumberInput | size',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'NumberInput',
                    knobs: {
                        label: 'Число',
                        value: 1234,
                        size: [40, 48, 56],
                        block: true,
                        step: 1,
                        colors: ['default'],
                    },
                    size: { width: 300, height: 70 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'NumberInput',
                    knobs: {
                        label: 'Число',
                        value: 1234,
                        size: [40, 48, 56],
                        block: true,
                        step: 1,
                        colors: ['inverted'],
                    },
                    size: { width: 300, height: 70 },
                }),
            ],
        ],
    }),
);
