import { setupScreenshotTesting, generateTestCases, createPreview } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 300, height: 70 };

describe('FileUploadItem', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'FileUploadItem',
            knobs: {
                title: 'Договор.docx',
                subtitle: '',
                size: 2097152,
                uploadStatus: 'SUCCESS',
                uploadDate: '22.07.2024',
                showDelete: true,
                downloadLink: '/download',
            },
        },
        'transform:scale(1.3)',
    );
});

describe(
    'FileUploadItem | Attach file',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                title: 'Прикрепите файл',
                subtitle: 'Нет файла',
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'FileUploadItem | Attached file',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                title: ['docx', 'xlsx', '1c', 'pdf', 'document'],
                uploadDate: '22.01.2018',
                size: 500000000,
                uploadStatus: 'SUCCESS',
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'FileUploadItem | Show delete and download',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                title: 'docx',
                uploadDate: '22.01.2018',
                size: 500000000,
                uploadStatus: 'SUCCESS',
                showDelete: true,
                downloadLink: '/link',
            },
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 500, height: 70 },
        },
    }),
);

describe(
    'FileUploadItem | Show restore',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                title: 'docx',
                uploadDate: '22.01.2018',
                size: 500000000,
                uploadStatus: 'SUCCESS',
                showRestore: true,
            },
        }),
        screenshotOpts: {
            clip: { x: 0, y: 0, width: 500, height: 70 },
        },
    }),
);

describe(
    'FileUploadItem | Attach error',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                title: 'Прикрепите файл',
                error: ['', 'Error'],
                uploadStatus: 'ERROR',
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'FileUploadItem | Uploading file',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                title: 'File.pdf',
                uploadStatus: 'UPLOADING',
                progressBar: 75,
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);
