import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('FormControl | screenshots label view prop', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'FormControl',
                        knobs: {
                            label: 'Label',
                            labelView: ['inner', 'outer'],
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

describe('FormControl | screenshots size prop', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'FormControl',
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

describe('FormControl | screenshots block prop', () => {
    screenshotTesting({
        cases: [
            [
                'default theme',
                createSpriteStorybookUrl({
                    componentName: 'FormControl',
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

describe('FormControl | screenshots disabled prop', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'FormControl',
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

describe('FormControl | screenshots hint and error', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'FormControl',
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
            theme,
        })();

    ['default', 'inverted'].forEach((colors) => {
        ['default', 'site', 'mobile'].forEach((theme) => testCase(theme, colors));
    });
});

describe('FormControl | screenshots theme corp', () => {
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'FormControl',
                    knobs: {
                        block: true,
                        size: [40, 48, 56, 64, 72],
                        disabled: [false, true],
                        error: ['', 'Error'],
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        theme: 'corp',
    })();
});

describe('FormControl | hint and error sizes', () => {
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'FormControl',
                    knobs: {
                        block: true,
                        size: [40, 48, 56, 64, 72],
                        hint: ['hint'],
                        error: ['', 'Error'],
                    },
                    size: { width: 350, height: 150 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    })();
});
