import {
    createPreview,
    createSpriteStorybookUrl,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('UniversalDateInput', () =>
    createPreview(
        {
            componentName: 'UniversalDateInput',
            knobs: {
                size: 56,
                value: new Date('2023-01-01').getTime(),
                label: 'Дата',
                block: true,
                view: 'date',
                picker: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('UniversalDateInputDesktop | addons sprite', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputDesktop',
                        knobs: {
                            view: ['date-time'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputDesktop',
                        knobs: {
                            view: ['date-range'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputDesktop',
                        knobs: {
                            view: ['time'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputDesktop',
                        knobs: {
                            view: ['month'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 320,
                height: 320,
            },
            theme,
        })();

    ['default'].forEach((theme) => testCase(theme));
});

describe('UniversalDateInputMobile | addons sprite', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputMobile',
                        knobs: {
                            view: ['date-time'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputMobile',
                        knobs: {
                            view: ['date-range'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputMobile',
                        knobs: {
                            view: ['time'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
                [
                    `${theme} theme | disabled`,
                    createSpriteStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputMobile',
                        knobs: {
                            view: ['month'],
                            size: [40, 48],
                            picker: [true],
                            disabled: [false, true],
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 320,
                height: 320,
            },
            theme,
        })();

    ['default'].forEach((theme) => testCase(theme));
});
