import {
    setupScreenshotTesting,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clipCheckbox = { x: 0, y: 0, width: 600, height: 200 };
const clipTag = { x: 0, y: 0, width: 600, height: 300 };

describe('CheckboxGroup', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'CheckboxGroup',
            knobs: {
                label: 'Группа чекбоксов',
                size: 24,
                checked: true,
            },
        },
        'width:800px;transform:scale(2.3)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe(
    'CheckboxGroup | main props',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CheckboxGroup',
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
    'CheckboxGroup | disabled',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CheckboxGroup',
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
    'CheckboxGroup | main props tag',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CheckboxGroup',
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
    'CheckboxGroup | disabled',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CheckboxGroup',
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
    'CheckboxGroup | mobile',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CheckboxGroup',
            testStory: false,
            knobs: {
                direction: ['horizontal', 'vertical'],
                label: 'Заголовок',
            },
        }),
        screenshotOpts: {
            clip: clipCheckbox,
        },
        viewport: { width: 600, height: 600 },
    }),
);
