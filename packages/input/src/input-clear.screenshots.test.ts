import {
    setupScreenshotTesting,
    createStorybookUrl,
} from '@alfalab/core-components-screenshot-utils';
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('InputDesktop | auto clear', () => {
    screenshotTesting({
        cases: [
            [
                '001 default',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                    },
                }),
            ],
            [
                '005 filled',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '007 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '009 success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        success: true,
                        value: 'Корректное значение',
                    },
                }),
            ],
            [
                '011 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        rightAddons: true,
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '013 success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        success: true,
                        value: 'Корректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '015 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
            [
                '017 success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        success: true,
                        value: 'Корректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
    })();
});

describe('InputDesktop | always clear', () => {
    screenshotTesting({
        cases: [
            [
                '001 default',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                    },
                }),
            ],
            [
                '002 filled',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '003 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '004 success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        success: true,
                        value: 'Корректное значение',
                    },
                }),
            ],
            [
                '005 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        rightAddons: true,
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '006 success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        success: true,
                        value: 'Корректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '007 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
            [
                '008 success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        success: true,
                        value: 'Корректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
    })();
});

describe('InputDesktop | auto clear', () => {
    screenshotTesting({
        cases: [
            [
                '003 start',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        placeholder: 'Placeholder',
                    },
                }),
            ],
            [
                '004 filling',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        value: 'John Doe',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        evaluate: (page: Page) => page.focus('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputDesktop | always clear', () => {
    screenshotTesting({
        cases: [
            [
                '009 start',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        placeholder: 'Placeholder',
                    },
                }),
            ],
            [
                '010 filling',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        value: 'John Doe',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        evaluate: (page: Page) => page.focus('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputDesktop | auto clear', () => {
    screenshotTesting({
        cases: [
            [
                '002 hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                    },
                }),
            ],
            [
                '006 filled hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '008 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '010 success hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        success: true,
                        value: 'Корректное значение',
                    },
                }),
            ],
            [
                '012 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        rightAddons: true,
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '014 success hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        success: true,
                        value: 'Корректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '016 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
            [
                '018 success hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        success: true,
                        value: 'Корректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        evaluate: (page: Page) => page.hover('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputDesktop | always clear', () => {
    screenshotTesting({
        cases: [
            [
                '011 hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                    },
                }),
            ],
            [
                '012 filled hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '013 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '014 success hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        success: true,
                        value: 'Корректное значение',
                    },
                }),
            ],
            [
                '015 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        rightAddons: true,
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '016 success hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        success: true,
                        value: 'Корректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '017 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
            [
                '018 success hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        success: true,
                        value: 'Корректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        evaluate: (page: Page) => page.hover('input').then(() => page.waitForTimeout(500)),
    })();
});

// region Desktop site
describe('InputDesktop | auto clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '001 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '003 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '005 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
    })();
});

describe('InputDesktop | always clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '001 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '002 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '003 error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
    })();
});

describe('InputDesktop | auto clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '002 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '004 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '006 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'auto',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
        evaluate: (page: Page) => page.hover('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputDesktop | always clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '004 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                    },
                }),
            ],
            [
                '005 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        rightAddons: true,
                        label: 'Название инпута',
                    },
                }),
            ],
            [
                '006 error hover',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputDesktop',
                    knobs: {
                        clear: 'always',
                        error: '\u200B',
                        value: 'Некорректное значение',
                        label: 'Название инпута',
                        rightAddons: true,
                        multipleRightAddons: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
        evaluate: (page: Page) => page.hover('input').then(() => page.waitForTimeout(500)),
    })();
});

// endregion

// region Mobile
describe('InputMobile | auto clear', () => {
    screenshotTesting({
        cases: [
            [
                '001 default',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                    },
                }),
            ],
            [
                '004 filled',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '005 filled success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        value: 'John Doe',
                        success: true,
                    },
                }),
            ],
            [
                '006 filled error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
    })();
});

describe('InputMobile | always clear', () => {
    screenshotTesting({
        cases: [
            [
                '001 default',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                    },
                }),
            ],
            [
                '002 filled',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '003 filled success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        value: 'John Doe',
                        success: true,
                    },
                }),
            ],
            [
                '004 filled error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
    })();
});

describe('InputMobile | auto clear', () => {
    screenshotTesting({
        cases: [
            [
                '002 start',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        placeholder: 'Placeholder',
                    },
                }),
            ],
            [
                '003 filling',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '007 filling error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
            [
                '008 filling success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        value: 'John Doe',
                        success: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        evaluate: (page: Page) => page.focus('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputMobile | always clear', () => {
    screenshotTesting({
        cases: [
            [
                '005 start',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        placeholder: 'Placeholder',
                    },
                }),
            ],
            [
                '006 filling',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        value: 'John Doe',
                    },
                }),
            ],
            [
                '007 filling error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
            [
                '008 filling success',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        value: 'John Doe',
                        success: true,
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        evaluate: (page: Page) => page.focus('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputMobile | auto clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '001 filled error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
    })();
});

describe('InputMobile | always clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '009 filled error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
    })();
});

describe('InputMobile | auto clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '002 filling error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'auto',
                        label: 'Фамилия',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
        evaluate: (page: Page) => page.focus('input').then(() => page.waitForTimeout(500)),
    })();
});

describe('InputMobile | always clear site theme', () => {
    screenshotTesting({
        cases: [
            [
                '010 filling error',
                createStorybookUrl({
                    testStory: false,
                    componentName: 'Input',
                    subComponentName: 'InputMobile',
                    knobs: {
                        clear: 'always',
                        label: 'Фамилия',
                        value: 'John Doe',
                        error: '\u200B',
                    },
                }),
            ],
        ],
        viewport: { width: 320, height: 80 },
        screenshotOpts: {
            fullPage: false,
        },
        theme: 'site',
        evaluate: (page: Page) => page.focus('input').then(() => page.waitForTimeout(500)),
    })();
});
// endregion
