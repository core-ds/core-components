import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'CalendarWithSkeleton | defaultView',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CalendarWithSkeleton',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747, 1610718391747],
                        defaultView: ['years', 'months', 'days'],
                        calendarVisible: [false, true],
                    },
                    mockDate: 1613310391747,
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CalendarWithSkeleton | selected value, selectorView',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CalendarWithSkeleton',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747],
                        value: [1613310391747, 1613137591747],
                        selectorView: ['month-only', 'full'],
                        calendarVisible: [false, true],
                    },
                    mockDate: 1613310391747,
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'CalendarWithSkeleton | selected range',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'CalendarWithSkeleton',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747],
                        selectedFrom: [1610718391747, 1613010391747],
                        selectedTo: [1613310391747, 1615902391747],
                        calendarVisible: [false, true],
                    },
                    mockDate: 1613310391747,
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
