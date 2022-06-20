import { setupScreenshotTesting, generateTestCases } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

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
    }),
);
