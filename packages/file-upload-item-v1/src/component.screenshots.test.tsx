import {
    setupScreenshotTesting,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const clip = { x: 0, y: 0, width: 1920, height: 150 };

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('FileUploadItemV1', () =>
    createPreview(
        {
            packageName: 'file-upload-item-v1',
            componentName: 'FileUploadItemV1',
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
    'FileUploadItemV1 | name with statuses',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item-v1',
            componentName: 'FileUploadItemV1',
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
    'FileUploadItemV1 | meta',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item-v1',
            componentName: 'FileUploadItemV1',
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
    'FileUploadItemV1 | hide meta when uploadStatus !== SUCCESS',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item-v1',
            componentName: 'FileUploadItemV1',
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
    'FileUploadItemV1 | hide meta when showRestore === true',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item-v1',
            componentName: 'FileUploadItemV1',
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
    'FileUploadItemV1 | ellipsis',
    screenshotTesting({
        cases: generateTestCases({
            packageName: 'file-upload-item-v1',
            componentName: 'FileUploadItemV1',
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
