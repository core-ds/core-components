import { setupScreenshotTesting, generateTestCases, createPreview } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clipRadio = { x: 0, y: 0, width: 600, height: 200 };
const clipTag = { x: 0, y: 0, width: 600, height: 300 };

describe('RadioGroup', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'RadioGroup',
            knobs: {
                label: 'Радио-группа',
                size: 24,
            },
        },
        'width:800px;transform:scale(2.3)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

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
            clip: clipRadio,
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
            clip: clipRadio,
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

describe(
    'RadioGroup | mobile',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'RadioGroup',
            testStory: false,
            knobs: {
                direction: ['horizontal', 'vertical'],
                label: 'Заголовок',
            },
        }),
        screenshotOpts: {
            clip: clipRadio,
        },
        viewport: { width: 600, height: 600 },
    }),
);
