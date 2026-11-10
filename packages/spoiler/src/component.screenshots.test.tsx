import {
    createStorybookUrl,
    setupScreenshotTesting,
} from '@alfalab/core-components-screenshot-utils';
import { type Page } from 'playwright';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const createUrl = (
    subComponentName: 'Spoiler' | 'SpoilerText',
    knobs: Record<string, string | boolean> = {},
    hidden = false,
) => {
    const url = createStorybookUrl({
        componentName: 'Spoiler',
        subComponentName,
        testStory: false,
        knobs,
    });

    return hidden ? `${url}&screenshot-state=hidden` : url;
};

describe(
    'Spoiler | screenshots',
    screenshotTesting({
        cases: [
            ['hidden image', createUrl('Spoiler', { defaultOpen: true, colors: 'default' }, true)],
            [
                'hidden inverted image',
                createUrl('Spoiler', { defaultOpen: true, colors: 'inverted' }, true),
            ],
            ['revealed image', createUrl('Spoiler', { defaultOpen: true, colors: 'default' })],
            ['hidden text', createUrl('SpoilerText', {}, true)],
            ['revealed text', createUrl('SpoilerText')],
        ],
        evaluate: async (page: Page) => {
            // Системная настройка оставляет детерминированный статичный рисунок частиц.
            await page.emulateMedia({ reducedMotion: 'reduce' });
            if (new URL(page.url()).searchParams.get('screenshot-state') === 'hidden') {
                await page.getByRole('button').first().click();
            }
        },
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 480,
            height: 260,
        },
    }),
);
