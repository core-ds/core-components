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
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
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
