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
            ['hidden image', createUrl('Spoiler', { defaultHide: false, colors: 'default' }, true)],
            [
                'hidden inverted image',
                createUrl('Spoiler', { defaultHide: false, colors: 'inverted' }, true),
            ],
            ['revealed image', createUrl('Spoiler', { defaultHide: false, colors: 'default' })],
            ['hidden text', createUrl('SpoilerText', {}, true)],
            ['revealed text', createUrl('SpoilerText')],
        ],
        evaluate: async (page: Page) => {
            // Системная настройка оставляет детерминированный статичный рисунок частиц.
            await page.emulateMedia({ reducedMotion: 'reduce' });
            const spoiler = page.locator('[data-state][data-interactive]').first();
            const content = spoiler.locator('[data-spoiler-content]');
            const clickSpoiler = async () => {
                await spoiler.scrollIntoViewIfNeeded();
                // Общая рамка строчного Spoiler может захватывать пустое место вне строки.
                const point = await content.evaluate((node) => {
                    const rect = Array.from(node.getClientRects()).find(
                        ({ width, height }) => width > 0 && height > 0,
                    );

                    if (!rect) throw new Error('Не удалось найти область содержимого Spoiler');

                    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                });

                await page.mouse.click(point.x, point.y);
            };

            // Проверяем оба направления: скрытое состояние не должно перебивать reduced motion.
            let hidden = (await spoiler.getAttribute('data-state')) === 'hidden';
            for (let toggle = 0; toggle < 2; toggle += 1) {
                await clickSpoiler();
                hidden = !hidden;
                const state = await spoiler.evaluate((root) => {
                    const content = root.querySelector('[data-spoiler-content]')!;
                    const style = getComputedStyle(content);
                    const canvasStyle = getComputedStyle(
                        root.querySelector('[data-spoiler-canvas]')!,
                    );

                    return {
                        hidden: root.getAttribute('data-state') === 'hidden',
                        opacity: style.opacity,
                        duration: style.transitionDuration,
                        transform: style.transform,
                        filter: style.filter,
                        canvasTransform: canvasStyle.transform,
                        canvasFilter: canvasStyle.filter,
                        canvasDuration: canvasStyle.transitionDuration,
                    };
                });

                expect(state.hidden).toBe(hidden);
                expect(state.opacity).toBe(hidden ? '0' : '1');
                expect(state.duration).toBe('0s');
                expect(state.transform).toBe('none');
                expect(state.filter).toBe('none');
                expect(state.canvasTransform).toBe('none');
                expect(state.canvasFilter).toBe('none');
                expect(state.canvasDuration).toBe('0s');
            }
            const captureHidden =
                new URL(page.url()).searchParams.get('screenshot-state') === 'hidden';

            if (hidden !== captureHidden) await clickSpoiler();
            expect(await spoiler.getAttribute('data-state')).toBe(
                captureHidden ? 'hidden' : 'revealed',
            );
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
