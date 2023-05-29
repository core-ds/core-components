import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

jest.mock('date-fns', () => ({ isThisMonth: () => false }));

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});
describe('Calendar', () =>
    createPreview({
        testStory: false,
        componentName: 'Calendar',
        knobs: {
            selectorView: 'full',
            defaultMonth: new Date('2023-03-01').getTime(),
        },
    }));

describe(
    'Calendar | defaultView',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747, 1610718391747],
                        defaultView: 'years',
                        responsive: true,
                    },
                    mockDate: 1613310391747,
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747, 1610718391747],
                        defaultView: 'months',
                    },
                    mockDate: 1613310391747,
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747, 1610718391747],
                        defaultView: 'days',
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
    'Calendar | selected value, selectorView',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747],
                        value: [1613310391747, 1613137591747],
                        selectorView: ['month-only', 'full'],
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
    'Calendar | selected range',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747],
                        selectedFrom: [1610718391747, 1613010391747],
                        selectedTo: [1613310391747, 1615902391747],
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
    'Calendar | shape and dayAddons props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747],
                        value: 1613310391747,
                        selectorView: 'month-only',
                        shape: 'rectangular',
                    },
                    mockDate: 1613310391747,
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Calendar',
                    size: { width: 350, height: 400 },
                    knobs: {
                        month: [1613310391747],
                        value: 1613310391747,
                        selectorView: 'month-only',
                        shape: 'rectangular',
                        dayAddons: [[{ date: 1613310391747, addon: 100 }]],
                    },
                    mockDate: 1613310391747,
                }),
            ],
        ],
        screenshotOpts: { clip: { x: 0, y: 0, width: 600, height: 600 } },
    }),
);
