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
            const spoiler = page.locator('[data-state]').first();

            // Проверяем оба направления: скрытое состояние не должно перебивать reduced motion.
            for (let toggle = 0; toggle < 2; toggle += 1) {
                await spoiler.click();
                const state = await spoiler.evaluate((root) => {
                    const content = root.querySelector('[data-spoiler-content]')!;
                    const style = getComputedStyle(content);

                    return {
                        hidden: root.getAttribute('data-state') === 'hidden',
                        opacity: style.opacity,
                        duration: style.transitionDuration,
                    };
                });

                expect(state.opacity).toBe(state.hidden ? '0' : '1');
                expect(state.duration).toBe('0s');
            }
            if (new URL(page.url()).searchParams.get('screenshot-state') === 'hidden') {
                await spoiler.click();
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
