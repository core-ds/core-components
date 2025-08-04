import {
    createPreview,
    createSpriteStorybookUrl,
    generateTestCases,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';

import { COLORS, SIZES } from './consts';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 70, height: 35 };

describe('Status', () =>
    createPreview(
        {
            componentName: 'Status',
            knobs: {
                children: 'Статус',
                view: 'contrast',
                color: 'red',
            },
        },
        'transform:scale(4)',
    ));

describe(
    'Status | screenshots views and colors',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Status',
            knobs: {
                children: 'Label',
                view: ['muted-alt', 'contrast', 'muted'],
                color: [...COLORS],
            },
        }),
        screenshotOpts: { clip },
    }),
);

describe(
    'Status | size, shape, uppercase',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Status',
                    knobs: {
                        children: 'Label',
                        view: ['muted-alt'],
                        color: ['blue'],
                        size: [...SIZES],
                        shape: ['rectangular', 'rounded'],
                        uppercase: [true, false],
                    },
                }),
            ],
        ],
    }),
);

describe(
    'Status | views, uppercase',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Status',
                    knobs: {
                        children: 'Label',
                        uppercase: [true, false],
                        view: ['muted-alt', 'contrast', 'muted'],
                        color: 'blue',
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: {
                x: 0,
                y: 0,
                width: 1024,
                height: 200,
            },
        },
    }),
);

describe(
    'Status | leftAddons prop',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Status',
                    knobs: {
                        children: 'Label',
                        uppercase: false,
                        leftAddons: 'left',
                        size: [...SIZES],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            clip: {
                x: 0,
                y: 0,
                width: 1024,
                height: 200,
            },
        },
    }),
);
