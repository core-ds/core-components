import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('PasswordInput ', () =>
    createPreview(
        {
            componentName: 'PasswordInput',
            knobs: {
                label: 'Пароль',
                value: '123456',
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'PasswordInput | screenshots',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'PasswordInput',
                    knobs: {
                        colors: ['default', 'inverted'],
                        passwordVisible: [true, false],
                        value: 'my password',
                        block: true,
                    },
                    size: { width: 300, height: 70 },
                }),
            ],
        ],
    }),
);

describe('PasswordInputDesktop | screenshots addons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        packageName: 'password-input',
                        componentName: 'PasswordInput',
                        knobs: {
                            value: 'Value',
                            block: true,
                            size: [48, 56, 64, 72],
                            breakpoint: 300,
                        },
                    }),
                ],
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        packageName: 'password-input',
                        componentName: 'PasswordInput',
                        knobs: {
                            value: 'Value',
                            success: true,
                            block: true,
                            rightAddons: 'right',
                            size: [48, 56, 64, 72],
                            breakpoint: 300,
                        },
                    }),
                ],
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        packageName: 'password-input',
                        componentName: 'PasswordInput',
                        knobs: {
                            value: 'Value',
                            error: true,
                            block: true,
                            rightAddons: 'right',
                            size: [48, 56, 64, 72],
                            breakpoint: 300,
                        },
                    }),
                ],
            ],
            viewport: {
                width: 350,
                height: 800,
            },
            theme,
        })();

    ['default', 'site'].forEach((theme) => testCase(theme));
});

describe('PasswordInputMobile | screenshots addons', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        packageName: 'password-input',
                        componentName: 'PasswordInput',
                        knobs: {
                            value: 'Value',
                            block: true,
                            size: [48, 56, 64, 72],
                        },
                    }),
                ],
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        packageName: 'password-input',
                        componentName: 'PasswordInput',
                        knobs: {
                            value: 'Value',
                            success: true,
                            block: true,
                            rightAddons: 'right',
                            size: [48, 56, 64, 72],
                        },
                    }),
                ],
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        packageName: 'password-input',
                        componentName: 'PasswordInput',
                        knobs: {
                            value: 'Value',
                            error: true,
                            block: true,
                            rightAddons: 'right',
                            size: [48, 56, 64, 72],
                        },
                    }),
                ],
            ],
            viewport: {
                width: 350,
                height: 800,
            },
            theme,
        })();

    ['default', 'site'].forEach((theme) => testCase(theme));
});
