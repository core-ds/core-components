import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const THEMES_FOR_TESTING = ['default', 'click', 'site', 'mobile', 'intranet'];

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

    ['default', 'inverted'].forEach((colors) => {
        THEMES_FOR_TESTING.forEach((theme) => testCase(theme, colors));
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

    ['default', 'inverted'].forEach((colors) => {
        THEMES_FOR_TESTING.forEach((theme) => testCase(theme, colors));
    });
});
