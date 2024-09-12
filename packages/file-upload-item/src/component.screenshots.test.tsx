import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 300, height: 70 };

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
                progressBar: 270,
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);

describe(
    'FileUploadItem | Left Addon',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item',
            componentName: 'FileUploadItem',
            subComponentName: 'FileUploadItem.LeftAddon',
            testStory: false,
            knobs: {
                uploadStatus: ['INITIAL', 'SUCCESS', 'ERROR'],
            },
        }),
        screenshotOpts: {
            clip,
        },
    }),
);
