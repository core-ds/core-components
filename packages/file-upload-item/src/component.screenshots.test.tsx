import { setupScreenshotTesting, generateTestCases, createPreview } from '../../screenshot-utils';

const clip = { x: 0, y: 0, width: 1920, height: 150 };

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('FileUploadItem', () =>
    createPreview(
        {
            componentName: 'FileUploadItem',
            testStory: false,
            knobs: {
                name: 'Название файла.xlsx',
                uploadDate: '22.01.2023',
                size: 4096,
                downloadLink: 'link',
                showDelete: true,
                uploadStatus: 'SUCCESS',
            },
        },
        'transform: scale(1.3);width:auto;marginLeft:12px',
    ));

describe(
    'FileUploadItem | name with statuses',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FileUploadItem',
            knobs: {
                name: ['photo.jpg'],
                uploadStatus: ['ERROR', 'SUCCESS', 'LOADING', 'UPLOADING'],
                showDelete: [true],
            },
        }),
        matchImageSnapshotOptions: {
            failureThresholdType: 'pixel',
            failureThreshold: 50,
        },
        screenshotOpts: { clip },
    }),
);

describe(
    'FileUploadItem | meta',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FileUploadItem',
            knobs: {
                name: ['photo.jpg'],
                uploadDate: ['22.01.2018'],
                size: [45000],
                downloadLink: ['/link'],
                uploadStatus: ['SUCCESS'],
                showDelete: [true],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe(
    'FileUploadItem | hide meta when uploadStatus !== SUCCESS',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FileUploadItem',
            knobs: {
                name: ['photo.jpg'],
                uploadDate: ['22.01.2018'],
                size: [45000],
                showDelete: [true],
                uploadStatus: ['ERROR', 'LOADING', 'UPLOADING'],
            },
        }),
        matchImageSnapshotOptions: {
            failureThresholdType: 'pixel',
            failureThreshold: 50,
        },
        screenshotOpts: { clip },
    }),
);

describe(
    'FileUploadItem | hide meta when showRestore === true',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FileUploadItem',
            knobs: {
                name: ['photo.jpg'],
                uploadDate: ['22.01.2018'],
                size: [45000],
                showRestore: [true],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe(
    'FileUploadItem | ellipsis',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'FileUploadItem',
            knobs: {
                name: [
                    'very-long-file-name-123-very-long-file-name-123-very-long-file-name-123.jpg',
                ],
                uploadDate: ['22.01.2018'],
                size: [45000],
                showRestore: [true],
            },
        }),
        screenshotOpts: { clip },
        viewport: {
            width: 400,
            height: 700,
        },
    }),
);
