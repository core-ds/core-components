import {
    setupScreenshotTesting,
    generateTestCases,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 1920, height: 100 };

describe(
    'Alert | screenshots views',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Alert',
            knobs: {
                children: 'Вам одобрено. Согласитесь на предложение',
                view: ['common', 'negative', 'positive', 'attention'],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe(
    'Alert | screenshots with title and closer',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Alert',
            knobs: {
                children: 'Вам одобрено. Согласитесь на предложение',
                title: ['Title', ''],
                hasCloser: [true, false],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe(
    'Alert | screenshots with buttons',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Alert',
            packageName: 'alert',
            testStory: false,
            knobs: {
                buttons: [true],
                title: ['Title', ''],
            },
        }),
        screenshotOpts: { clip: { ...clip, height: 140 } },
    }),
);
