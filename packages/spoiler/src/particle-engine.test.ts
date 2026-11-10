import { ParticleEngine } from './particle-engine';

const line = { x: 0, y: 0, width: 100, height: 20 };

describe('Отрисовка частиц Spoiler', () => {
    let canvas: HTMLCanvasElement;
    let engine: ParticleEngine;
    let frames: Map<number, FrameRequestCallback>;
    let frameId: number;
    let clock: number;
    let context: {
        setTransform: jest.Mock;
        clearRect: jest.Mock;
        beginPath: jest.Mock;
        arc: jest.Mock;
        fill: jest.Mock;
        clip: jest.Mock;
        save: jest.Mock;
        restore: jest.Mock;
        fillStyle: string;
        globalAlpha: number;
    };
    const OriginalPath = global.Path2D;

    const frame = (time: number) => {
        clock = time;
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach((callback) => callback(time));
    };

    beforeEach(() => {
        frames = new Map();
        frameId = 0;
        clock = 0;
        jest.spyOn(window.performance, 'now').mockImplementation(() => clock);
        jest.replaceProperty(window, 'devicePixelRatio', 1);
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(
            (callback: FrameRequestCallback) => {
                frames.set(++frameId, callback);
                return frameId;
            },
        );
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) =>
            frames.delete(id),
        );
        context = {
            setTransform: jest.fn(),
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            clip: jest.fn(),
            save: jest.fn(),
            restore: jest.fn(),
            fillStyle: '',
            globalAlpha: 1,
        };
        global.Path2D = jest.fn().mockImplementation(() => ({
            moveTo: jest.fn(),
            arcTo: jest.fn(),
            closePath: jest.fn(),
        }));
        canvas = document.createElement('canvas');
        canvas.style.color = 'black';
        document.body.append(canvas);
        engine = new ParticleEngine(canvas, context as unknown as CanvasRenderingContext2D);
        engine.configure(2);
    });

    afterEach(() => {
        engine.destroy();
        canvas.remove();
        jest.restoreAllMocks();
        global.Path2D = OriginalPath;
    });

    it('детерминированно воспроизводит узор после повторного layout и в новом экземпляре', () => {
        engine.layout([line]);
        const initial = [...context.arc.mock.calls];

        context.arc.mockClear();
        engine.layout([line]);
        expect(context.arc.mock.calls).toEqual(initial);

        const second = new ParticleEngine(
            canvas,
            context as unknown as CanvasRenderingContext2D,
            'text',
        );
        try {
            second.configure(2);
            context.arc.mockClear();
            second.layout([line]);
            expect(context.arc.mock.calls).toEqual(initial);
        } finally {
            second.destroy();
        }
    });

    it('для element строит сетку без текстового отступа и удерживает частицы внутри', () => {
        const width = 200;
        const height = 100;
        const cellSize = Math.sqrt(12 / 0.58);
        const block = new ParticleEngine(
            canvas,
            context as unknown as CanvasRenderingContext2D,
            'element',
        );

        try {
            block.configure(0);
            context.arc.mockClear();
            block.layout([{ x: 0, y: 0, width, height }]);
            const particles = context.arc.mock.calls;

            particles.forEach(([x, y, radius]) => {
                expect(x - radius).toBeGreaterThanOrEqual(0);
                expect(x + radius).toBeLessThanOrEqual(width);
                expect(y - radius).toBeGreaterThanOrEqual(0);
                expect(y + radius).toBeLessThanOrEqual(height);
            });
            // Первая ячейка не теряется из-за текстового сдвига, крайняя колонка заполнена.
            expect(particles[0][0]).toBeGreaterThanOrEqual(0);
            expect(particles[0][0]).toBeLessThan(cellSize);
            expect(particles.some(([x]) => x > width - cellSize)).toBe(true);
            expect(Math.min(...particles.map(([x]) => x))).toBeLessThan(cellSize);
            expect(particles.length / (width * height)).toBeCloseTo(0.58 / 12, 2);
        } finally {
            block.destroy();
        }
    });

    it('ограничивает количество частиц и размер canvas', () => {
        engine.layout([{ ...line, width: 10000, height: 10000 }]);

        expect(context.arc.mock.calls.length).toBeGreaterThan(0);
        expect(context.arc.mock.calls.length).toBeLessThanOrEqual(5000);
        expect(canvas.width * canvas.height).toBeLessThanOrEqual(4000000);
    });

    it('останавливает цикл и очищает canvas для пустого содержимого', () => {
        engine.layout([line]);
        engine.setPlaying(true);
        context.arc.mockClear();
        context.clearRect.mockClear();

        engine.layout([]);

        expect(frames.size).toBe(0);
        expect(context.arc).not.toHaveBeenCalled();
        expect(context.clearRect).toHaveBeenCalled();
    });

    it('плавно меняет яркость вместе с размером, сохраняя индивидуальный ритм точек', () => {
        const opacity: number[] = [];
        context.fill.mockImplementation(() => opacity.push(context.globalAlpha));
        engine.layout([line]);
        engine.setPlaying(true);
        opacity.length = 0;
        context.arc.mockClear();
        engine.redraw();
        const initial = [...opacity];
        const initialRadii = context.arc.mock.calls.map(([, , radius]) => radius);

        opacity.length = 0;
        context.arc.mockClear();
        frame(0);
        frame(40);

        expect(opacity.length).toBe(initial.length);
        expect(Math.min(...opacity)).toBeGreaterThanOrEqual(0.65 * 0.2);
        expect(Math.max(...opacity)).toBeLessThanOrEqual(0.8);
        const changes = opacity.map((alpha, index) => alpha - initial[index]);
        expect(changes.some((change) => change > 0)).toBe(true);
        expect(changes.some((change) => change < 0)).toBe(true);
        changes.forEach((change, index) => {
            const radiusChange = context.arc.mock.calls[index][2] - initialRadii[index];

            expect(change * radiusChange).toBeGreaterThan(0);
        });

        opacity.length = 0;
        for (let time = 80; time <= 5200; time += 40) frame(time);
        expect(Math.min(...opacity)).toBeGreaterThanOrEqual(0.65 * 0.2);
        expect(Math.min(...opacity)).toBeLessThan(0.17);
        expect(Math.max(...opacity)).toBeGreaterThan(0.65);
        expect(Math.max(...opacity)).toBeLessThanOrEqual(0.8);
    });

    it('проверяет цвет не чаще раза в секунду и применяет изменение темы', () => {
        let color = 'rgb(0, 0, 0)';
        const computedStyle = jest
            .spyOn(window, 'getComputedStyle')
            .mockImplementation(() => ({ color }) as CSSStyleDeclaration);

        engine.layout([line]);
        expect(context.fillStyle).toBe('rgb(0, 0, 0)');
        engine.setPlaying(true);
        computedStyle.mockClear();
        color = 'rgb(255, 255, 255)';

        frame(0);
        for (let time = 40; time <= 800; time += 40) frame(time);

        expect(computedStyle).not.toHaveBeenCalled();
        expect(context.fillStyle).toBe('rgb(0, 0, 0)');

        for (let time = 840; time <= 1200; time += 40) frame(time);

        expect(computedStyle).toHaveBeenCalledTimes(1);
        expect(context.fillStyle).toBe('rgb(255, 255, 255)');
    });

    it('не оставляет пустой кадр при смене цвета вместе с раскладкой', () => {
        let color = 'rgb(0, 0, 0)';
        jest.spyOn(window, 'getComputedStyle').mockImplementation(
            () => ({ color }) as CSSStyleDeclaration,
        );
        engine.layout([line]);
        engine.setPlaying(true);
        context.fill.mockClear();
        color = 'rgb(255, 255, 255)';

        engine.layout([{ ...line, width: 120 }]);

        expect(context.fillStyle).toBe('rgb(255, 255, 255)');
        expect(context.fill).toHaveBeenCalled();
    });

    it.each(['text', 'element'] as const)(
        'в режиме %s собирает точки к центру до 8 px и завершает затухание за 280 мс',
        (mode) => {
            engine.destroy();
            engine = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                mode,
            );
            const opacity: number[] = [];
            const referenceOpacity: number[] = [];
            const referenceContext = { ...context, arc: jest.fn(), fill: jest.fn() };
            const reference = new ParticleEngine(
                canvas,
                referenceContext as unknown as CanvasRenderingContext2D,
                mode,
            );

            context.fill.mockImplementation(() => opacity.push(context.globalAlpha));
            referenceContext.fill.mockImplementation(() =>
                referenceOpacity.push(referenceContext.globalAlpha),
            );
            try {
                engine.layout([line]);
                reference.layout([line]);
                engine.setPlaying(true);
                reference.setPlaying(true);
                frame(0);
                engine.setOpen(true);
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                opacity.length = 0;
                referenceOpacity.length = 0;
                frame(140);

                const middle = context.arc.mock.calls;
                const idle = referenceContext.arc.mock.calls;

                expect(middle.length).toBeGreaterThan(0);
                expect(middle.length).toBe(idle.length);
                middle.forEach(([x, y, radius], index) => {
                    const centerX = line.x + line.width / 2;
                    const centerY = line.y + line.height / 2;
                    const idleX = idle[index][0];
                    const idleY = idle[index][1];

                    expect(Math.hypot(x - centerX, y - centerY)).toBeLessThan(
                        Math.hypot(idleX - centerX, idleY - centerY),
                    );
                    expect((x - centerX) * (idleX - centerX)).toBeGreaterThanOrEqual(0);
                    expect((y - centerY) * (idleY - centerY)).toBeGreaterThanOrEqual(0);
                    expect(Math.hypot(x - idle[index][0], y - idle[index][1])).toBeLessThanOrEqual(
                        8,
                    );
                    expect(x - radius).toBeGreaterThanOrEqual(-4);
                    expect(x + radius).toBeLessThanOrEqual(line.width + 4);
                    expect(y - radius).toBeGreaterThanOrEqual(0);
                    expect(y + radius).toBeLessThanOrEqual(line.height);
                    expect(radius).toBeGreaterThan(0);
                    expect(radius).toBeLessThan(idle[index][2]);
                    expect(opacity[index]).toBeLessThan(referenceOpacity[index]);
                });
                expect(
                    middle.some(
                        ([x, y], index) => Math.hypot(x - idle[index][0], y - idle[index][1]) > 2,
                    ),
                ).toBe(true);
                const fading = opacity.map((alpha, index) => alpha / referenceOpacity[index]);

                expect(Math.max(...fading) - Math.min(...fading)).toBeGreaterThan(0.1);
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                frame(240);
                const displacement = context.arc.mock.calls.map(([x, y], index) =>
                    Math.hypot(
                        x - referenceContext.arc.mock.calls[index][0],
                        y - referenceContext.arc.mock.calls[index][1],
                    ),
                );
                expect(Math.max(...displacement)).toBeGreaterThan(6);
                expect(Math.max(...displacement)).toBeLessThanOrEqual(8);
                reference.destroy();
                context.fill.mockClear();
                frame(280);

                expect(context.fill).not.toHaveBeenCalled();
                expect(frames.size).toBe(0);
            } finally {
                reference.destroy();
            }
        },
    );

    it.each(['text', 'element'] as const)(
        'в режиме %s плавно расходится от центра в облако без вспышки и новой раскладки',
        (mode) => {
            engine.destroy();
            engine = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                mode,
            );
            const opacity: number[] = [];
            const referenceOpacity: number[] = [];
            const referenceContext = { ...context, arc: jest.fn(), fill: jest.fn() };
            const reference = new ParticleEngine(
                canvas,
                referenceContext as unknown as CanvasRenderingContext2D,
                mode,
            );
            context.fill.mockImplementation(() => opacity.push(context.globalAlpha));
            referenceContext.fill.mockImplementation(() =>
                referenceOpacity.push(referenceContext.globalAlpha),
            );

            try {
                engine.layout([line]);
                reference.layout([line]);
                engine.setOpen(true);
                engine.setPlaying(true);
                reference.setPlaying(true);
                engine.setOpen(false);
                opacity.length = 0;
                referenceOpacity.length = 0;
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                frame(0);
                frame(40);
                const initial = context.arc.mock.calls;
                const initialIdle = referenceContext.arc.mock.calls;
                const initialOpacity = opacity.map(
                    (alpha, index) => alpha / referenceOpacity[index],
                );

                // В начале видны только слабые точки: полной яркости одним кадром быть не должно.
                expect(Math.max(...initialOpacity)).toBeGreaterThan(0);
                expect(Math.max(...initialOpacity)).toBeLessThan(0.1);
                opacity.length = 0;
                referenceOpacity.length = 0;
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                frame(140);
                const middle = context.arc.mock.calls;

                expect(middle.length).toBe(referenceContext.arc.mock.calls.length);
                middle.forEach(([x, y, radius], index) => {
                    const idle = referenceContext.arc.mock.calls[index];
                    const initialDistance = Math.hypot(
                        initial[index][0] - initialIdle[index][0],
                        initial[index][1] - initialIdle[index][1],
                    );
                    expect(Math.hypot(x - idle[0], y - idle[1])).toBeLessThanOrEqual(
                        initialDistance + 0.25,
                    );
                    const centerX = line.x + line.width / 2;
                    const centerY = line.y + line.height / 2;
                    const centerDistance = Math.hypot(x - centerX, y - centerY);

                    expect(centerDistance).toBeGreaterThan(
                        Math.hypot(initial[index][0] - centerX, initial[index][1] - centerY),
                    );
                    expect(centerDistance).toBeLessThan(
                        Math.hypot(idle[0] - centerX, idle[1] - centerY),
                    );
                    expect(radius).toBeLessThan(idle[2]);
                    expect(opacity[index] / referenceOpacity[index]).toBeGreaterThan(
                        initialOpacity[index],
                    );
                    expect(opacity[index] / referenceOpacity[index]).toBeLessThan(0.7);
                    // Круги не слипаются в полосы на краях даже у однострочного текста.
                    expect(y - radius).toBeGreaterThan(0);
                    expect(y + radius).toBeLessThan(line.height);
                });
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                frame(280);
                expect(context.arc.mock.calls).toEqual(referenceContext.arc.mock.calls);
            } finally {
                reference.destroy();
            }
        },
    );

    it('при обратном переключении продолжает из текущего положения без скачка', () => {
        engine.layout([line]);
        engine.setPlaying(true);
        frame(0);
        engine.setOpen(true);
        context.arc.mockClear();
        frame(120);
        const middle = [...context.arc.mock.calls];
        context.arc.mockClear();

        engine.setOpen(false);

        expect(context.arc.mock.calls).toEqual(middle);
        context.arc.mockClear();
        frame(240);
        expect(context.arc.mock.calls).not.toEqual(middle);
    });

    it('отсчитывает переход от нажатия, не включая время до него из фонового кадра', () => {
        engine.layout([line]);
        engine.setPlaying(true);
        frame(40);
        clock = 60;
        engine.setOpen(true);
        frame(64);
        frame(200);
        context.fill.mockClear();
        frame(339);
        expect(context.fill).toHaveBeenCalled();
        context.fill.mockClear();
        frame(340);
        expect(context.fill).not.toHaveBeenCalled();
        expect(frames.size).toBe(0);
    });

    it('в статичном режиме переключается без перехода и цикла кадров', () => {
        engine.layout([line]);
        engine.setPlaying(false);
        context.fill.mockClear();
        engine.setOpen(true);
        expect(context.fill).not.toHaveBeenCalled();
        engine.setOpen(false);
        expect(context.fill).toHaveBeenCalled();
        expect(frames.size).toBe(0);
    });
});
