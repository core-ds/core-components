import {
    createPreview,
    createSpriteStorybookUrl,
    generateTestCases,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('NumberInput ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'NumberInput',
        },
        'transform:scale(2.1)',
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

describe(
    'NumberInput | disableUserInput focus state with stepper',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                componentName: 'NumberInput',
                knobs: {
                    label: 'Число',
                    value: 1234,
                    size: 56,
                    step: 1,
                    disableUserInput: false,
                },
            }),
            ...generateTestCases({
                componentName: 'NumberInput',
                knobs: {
                    label: 'Число',
                    value: 1234,
                    size: 56,
                    step: 1,
                    disableUserInput: true,
                },
            }),
            ...generateTestCases({
                componentName: 'NumberInput',
                knobs: {
                    label: 'Число',
                    value: 1234,
                    size: 56,
                    step: 1,
                    disableUserInput: false,
                    colors: 'inverted',
                },
            }),
            ...generateTestCases({
                componentName: 'NumberInput',
                knobs: {
                    label: 'Число',
                    value: 1234,
                    size: 56,
                    step: 1,
                    disableUserInput: true,
                    colors: 'inverted',
                },
            }),
        ],
        evaluate: (page: Page) => {
            return page.mouse
                .move(26, 26)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        screenshotOpts: {},
        viewport: {
            width: 360,
            height: 100,
        },
    }),
);
