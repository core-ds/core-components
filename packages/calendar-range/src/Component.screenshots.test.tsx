import {
    setupScreenshotTesting,
    generateTestCases,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('CalendarRange', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'CalendarRange',
            knobs: {
                selectorView: 'full',
            },
        },
        'width:800px;transform: scale(0.8)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe(
    'CalendarRange',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'CalendarRange',
            testStory: false,
            knobs: {
                valueTo: '25.03.2021',
                valueFrom: '02.05.2022',
                defaultMonth: 6,
                minDate: '24.03.2021',
                maxDate: '06.05.2022',
                offDays: [new Date('25.03.2021').setDate(1)],
            },
        }),
        viewport: {
            width: 320,
            height: 600,
        },
        screenshotOpts: {
            fullPage: true,
        },
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 1,
        },
    }),
);
