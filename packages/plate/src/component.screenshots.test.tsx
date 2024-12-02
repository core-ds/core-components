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

describe('Plate', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'Plate',
            knobs: {
                title: 'Заголовок',
                children:
                    'Плейт встраивается в контекст экрана и может использоваться  для вывода информационных сообщений.',
                hasCloser: true,
                view: 'positive',
                buttons: true,
            },
        },
        'width:800px;transform:scale(1.3);padding:0 200px;',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe(
    'Plate | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Plate',
                    knobs: {
                        title: 'Поздравляем, полный успех',
                        children: [
                            '',
                            'Вам одобрено. Согласитесь на предложение, спустя какое-то время специалист с Вами свяжется для уточнения информации',
                        ],
                        hasCloser: [false, true],
                        foldable: [false, true],
                    },
                    size: { width: 400, height: 120 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Plate | view',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Plate',
                    knobs: {
                        title: 'Поздравляем, полный успех',
                        children:
                            'Вам одобрено. Согласитесь на предложение, спустя какое-то время специалист с Вами свяжется для уточнения информации',
                        view: ['negative', 'positive', 'attention', 'common'],
                    },
                    size: { width: 400, height: 140 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 1024,
            height: 100,
        },
    }),
);

describe(
    'Plate | rowLimit',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Plate',
                    knobs: {
                        title: 'Поздравляем, полный успех',
                        children:
                            'Вам одобрено. Согласитесь на предложение, спустя какое-то время специалист с Вами свяжется для уточнения информации',
                        rowLimit: [undefined, 1, 2, 3],
                    },
                    size: { width: 400, height: 140 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 1024,
            height: 100,
        },
    }),
);

describe(
    'Plate | buttons & addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Plate',
            testStory: false,
            knobs: {
                title: 'Поздравляем, полный успех',
                children: 'Вам одобрено. Согласитесь на предложение',
                buttons: true,
                leftAddons: [false, true],
            },
            wrapperStyles: 'width:500px',
        }),
        viewport: { width: 1024, height: 160 },
    }),
);

describe(
    'Plate | foldable with buttons & addons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Plate',
            testStory: false,
            knobs: {
                title: 'Поздравляем, полный успех',
                children: 'Вам одобрено. Согласитесь на предложение',
                foldable: [false, true],
                leftAddons: true,
                buttons: true,
            },
            wrapperStyles: 'width:500px',
        }),
        viewport: { width: 1024, height: 160 },
    }),
);

describe(
    'Plate | shadow and border',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Plate',
                    knobs: {
                        title: 'Поздравляем, полный успех',
                        shadow: [true, false],
                        border: [true, false],
                    },
                    size: { width: 400, height: 120 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 1024,
            height: 100,
        },
    }),
);

describe(
    'Plate | custom view, border and background',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Plate',
                    knobs: {
                        view: 'custom',
                        title: 'Поздравляем, полный успех',
                        children: 'Вам одобрено. Согласитесь на предложение',
                        background: 'var(--color-light-decorative-muted-indigo)',
                        borderColor: 'var(--color-light-decorative-indigo)',
                        border: [true, false],
                        rounded: [true, false],
                    },
                    size: { width: 400, height: 140 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 1024,
            height: 140,
        },
    }),
);
