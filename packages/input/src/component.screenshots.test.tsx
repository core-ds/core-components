import { Page } from 'playwright';

import {
    setupScreenshotTesting,
    generateTestCases,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 350, height: 150 };

describe('Input', () =>
    createPreview(
        {
            componentName: 'Input',
            knobs: {
                label: 'Текстовое поле',
                value: 'Текст',
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('Input | screenshots label view and value prop', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Input',
                        knobs: {
                            label: 'Label',
                            labelView: ['inner', 'outer'],
                            value: ['', 'Value'],
                            colors,
                        },
                        size: { width: 350, height: 150 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'inverted'].forEach((colors) => {
        ['site', 'default', 'mobile'].forEach((theme) => testCase(theme, colors));
    });
});

describe('Input | screenshots size prop', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Input',
                        knobs: {
                            label: 'Label',
                            size: [40, 48, 56, 64, 72],
                        },
                        size: { width: 350, height: 150 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['site', 'default', 'mobile'].forEach((theme) => testCase(theme));
});

describe('Input | screenshots block prop', () => {
    screenshotTesting({
        cases: [
            [
                'default theme',
                createSpriteStorybookUrl({
                    componentName: 'Input',
                    knobs: {
                        label: 'Label',
                        size: 56,
                        block: [false, true],
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        theme: 'default',
    })();
});

describe('Input | screenshots disabled prop', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Input',
                        knobs: {
                            label: 'Label',
                            size: 56,
                            disabled: true,
                            colors,
                        },
                        size: { width: 350, height: 150 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'inverted'].forEach((colors) => {
        ['site', 'default', 'mobile'].forEach((theme) => testCase(theme, colors));
    });
});

describe('Input | screenshots hint and error', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Input',
                        knobs: {
                            size: 56,
                            hint: ['', 'Hint'],
                            error: ['', 'Error'],
                            value: ['', 'Value'],
                            colors,
                        },
                        size: { width: 350, height: 150 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            evaluate: (page) => page.waitForTimeout(300),
            theme,
        })();

    ['default', 'inverted'].forEach((colors) => {
        ['default', 'site', 'mobile'].forEach((theme) => testCase(theme, colors));
    });
});

describe('Input | clear icon', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Input',
                        knobs: {
                            size: 56,
                            clear: true,
                            value: 'value',
                            colors,
                        },
                        size: { width: 350, height: 150 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'inverted'].forEach((colors) => testCase('default', colors));
});

describe(
    'Input | screenshots addons',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Input',
                    knobs: {
                        rightAddons: ['right', false],
                        leftAddons: ['left', false],
                        bottomAddons: ['bottom', false],
                        success: false,
                        value: '',
                        block: true,
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Input',
                    knobs: {
                        rightAddons: ['right', false],
                        leftAddons: ['left', false],
                        bottomAddons: ['bottom', false],
                        success: true,
                        value: '',
                        block: true,
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Input',
                    knobs: {
                        rightAddons: ['right', false],
                        leftAddons: ['left', false],
                        bottomAddons: ['bottom', false],
                        success: false,
                        value: 'Value',
                        block: true,
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Input',
                    knobs: {
                        rightAddons: ['right', false],
                        leftAddons: ['left', false],
                        bottomAddons: ['bottom', false],
                        success: true,
                        value: 'Value',
                        block: true,
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Input | hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Input',
            knobs: {
                label: ['Label'],
            },
        }),
        evaluate: (page: Page) => page.hover('input').then(() => page.waitForTimeout(500)),
        screenshotOpts: {
            clip,
        },
    }),
);
