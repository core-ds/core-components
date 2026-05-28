import {
    createPreview,
    createSpriteStorybookUrl,
    generateTestCases,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PhoneInput ', () =>
    createPreview(
        {
            componentName: 'PhoneInput',
            knobs: {
                label: 'Телефон',
                value: '+71234567890',
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('PhoneInput | size', () => {
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PhoneInput',
                    knobs: {
                        label: 'Телефон',
                        value: '+71234567890',
                        size: [40, 48, 56, 64, 72],
                        block: true,
                    },
                    size: { width: 240, height: 150 },
                }),
            ],
        ],
    })();
});

describe('PhoneInput | disabled', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                ...generateTestCases({
                    testStory: false,
                    componentName: 'PhoneInput',
                    knobs: {
                        label: 'Телефон',
                        value: '+71234567890',
                        size: [40, 48],
                        disabled: true,
                    },
                }),
            ],
            viewport: { width: 240, height: 100 },
            theme,
        })();

    ['default'].forEach((theme) => testCase(theme));
});
