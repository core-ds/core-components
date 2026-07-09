import {
    createPreview,
    generateTestCases,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Notification', () => {
    createPreview(
        {
            componentName: 'ToastPlate',
            knobs: {
                title: 'Заголовок',
                children: 'Пример сообщения',
                hasCloser: true,
                actionButton: 'Кнопка',
                block: true,
            },
        },
        'width:800px;transform:scale(1.5);padding:0 210px',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe(
    'Notification | gaps',
    screenshotTesting({
        cases: [
            ...generateTestCases({
                testStory: false,
                componentName: 'Notification',
                knobs: {
                    visible: true,
                    hasCloser: [true, false],
                    renderActionButton: [true, false],
                },
            }),
        ],
        screenshotOpts: {
            fullPage: false,
        },
        viewport: { width: 720, height: 200 },
    }),
);
