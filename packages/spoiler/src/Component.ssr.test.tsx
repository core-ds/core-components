import React from 'react';
import { renderToString } from 'react-dom/server';

import { Spoiler } from './Component';

describe('Spoiler: серверный рендеринг', () => {
    it('рендерит произвольный блок в div без браузерных API', () => {
        const html = renderToString(
            <Spoiler mode='element'>
                <section>
                    <img src='/image.png' alt='Сад' />
                </section>
            </Spoiler>,
        );
        expect(html).toMatch(/^<div/);
        expect(html).toContain('aria-hidden="true"');
        expect(html).toContain('data-state="hidden"');
        expect(html).toContain('<section><img');
        expect(html).toContain('Показать скрытое содержимое');
    });

    it('рендерит скрытое состояние без браузерных API', () => {
        const html = renderToString(<Spoiler>Скрытый текст</Spoiler>);
        const contentTag = html.match(/<span(?=[^>]*data-spoiler-content="")[^>]*>/)?.[0];

        expect(html).toContain('data-state="hidden"');
        expect(html).toContain('aria-expanded="false"');
        expect(html).toContain('aria-label="Показать скрытый текст"');
        expect(contentTag).toContain('aria-hidden="true"');
        expect(html).toContain('Скрытый текст');
    });

    it('сохраняет явно раскрытое состояние при серверном рендеринге', () => {
        const html = renderToString(
            <Spoiler revealed={true}>
                <strong>Открытый текст</strong>
            </Spoiler>,
        );

        expect(html).toContain('data-state="revealed"');
        expect(html).toContain('aria-expanded="true"');
        expect(html).not.toContain('aria-label="Показать скрытый текст"');
        expect(html).toContain('<strong>Открытый текст</strong>');
    });
});
