import { Page } from 'playwright';

import {
    setupScreenshotTesting,
    generateTestCases,
    createSpriteStorybookUrl,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 350, height: 150 };

describe('FormControl | screenshots main props', () => {
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
                            size: ['s', 'm', 'l', 'xl'],
                            block: [false, true],
                            disabled: [false, true],
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

    ['default', 'inverted'].forEach(colors => {
        ['default', 'click', 'site', 'mobile'].forEach(theme => testCase(theme, colors));
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
                            size: 'm',
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

    ['default', 'inverted'].forEach(colors => {
        ['default', 'click', 'site', 'mobile'].forEach(theme => testCase(theme, colors));
    });
});

describe('FormControl | clear icon', () => {
    const testCase = (theme: string, colors: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'FormControl',
                        knobs: {
                            size: 'm',
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

    ['default', 'inverted'].forEach(colors => testCase('default', colors));
});

describe(
    'FormControl | screenshots addons',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'FormControl',
                    knobs: {
                        rightAddons: ['right', false],
                        leftAddons: ['left', false],
                        bottomAddons: ['bottom', false],
                        success: [false, true],
                        value: ['', 'Value'],
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
    'FormControl | hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FormControl',
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
