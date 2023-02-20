import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clipCheckbox = { x: 0, y: 0, width: 600, height: 200 };
const clipTag = { x: 0, y: 0, width: 600, height: 300 };

describe(
    'RadioGroup | main props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'RadioGroup',
            testStory: false,
            knobs: {
                direction: ['horizontal', 'vertical'],
                label: ['', 'Заголовок'],
                error: ['', 'Ошибка'],
                hint: ['', 'Подсказка'],
            },
        }),
        screenshotOpts: {
            clip: clipCheckbox,
        },
    }),
);

describe(
    'RadioGroup | disabled',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'RadioGroup',
            testStory: false,
            knobs: {
                disabled: true,
            },
        }),
        screenshotOpts: {
            clip: clipCheckbox,
        },
    }),
);

describe(
    'RadioGroup | main props tags',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'RadioGroup',
            testStory: false,
            knobs: {
                type: 'tag',
                direction: ['horizontal', 'vertical'],
                label: ['', 'Заголовок'],
                error: ['', 'Ошибка'],
                hint: ['', 'Подсказка'],
            },
        }),
        screenshotOpts: {
            clip: clipTag,
        },
    }),
);

describe(
    'RadioGroup | disabled tags',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'RadioGroup',
            testStory: false,
            knobs: {
                type: 'tag',
                disabled: true,
            },
        }),
        screenshotOpts: {
            clip: clipTag,
        },
    }),
);
