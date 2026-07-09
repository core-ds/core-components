import {
    generateTestCases,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';
import { Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 100, height: 100 };

describe(
    'IconButtonDesktop | border radius',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'IconButton',
            subComponentName: 'IconButtonDesktop',
            knobs: {
                view: 'primary',
                transparentBg: true,
                size: [24, 32, 40, 48, 56],
            },
            testStory: false,
        }),
        evaluate: (page: Page) =>
            page.hover('button[class*=component]').then(() => page.waitForTimeout(500)),
        screenshotOpts: {
            clip,
        },
    }),
);
