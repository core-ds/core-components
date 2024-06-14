import { createPreview, generateTestCases, setupScreenshotTesting } from '../../screenshot-utils';

import { colors } from './Component';

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
                color: [...colors],
            },
        }),
        screenshotOpts: { clip },
    }),
);
