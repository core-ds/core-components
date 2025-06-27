import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    customSnapshotIdentifier,
    generateTestCases,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 200, height: 100 };

describe('ActionButton ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'ActionButton',
            knobs: {
                children: 'Кнопка',
                icon: 'DiamondsMIcon',
            },
        },
        'transform:scale(3.2);position:static',
    ));

describe(
    'Action Button | views & colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ActionButton',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['primary', 'secondary'],
                        colors: ['default', 'inverted', 'static'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Action Button | disabled & loading',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'ActionButton',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['primary', 'secondary'],
                        disabled: [false, true],
                        loading: [false, true],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Action Button | screenshots hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'ActionButton',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) =>
            page.hover('button[class^=component]').then(() => page.waitForTimeout(500)),
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);

describe(
    'Action Button | screenshots pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'ActionButton',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => {
            return page.mouse
                .move(30, 30)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `pressed-${customSnapshotIdentifier(...args)}`,
        },
    }),
);
