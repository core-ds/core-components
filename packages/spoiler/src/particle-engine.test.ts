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
            rect: jest.fn(),
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
        engine.redraw();
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

    it('сохраняет текущий кадр и движение под курсором при повторном замере той же геометрии', () => {
        const referenceContext = { ...context, arc: jest.fn(), fill: jest.fn() };
        const reference = new ParticleEngine(
            canvas,
            referenceContext as unknown as CanvasRenderingContext2D,
        );
        const opacity: number[] = [];
        context.fill.mockImplementation(() => opacity.push(context.globalAlpha));
        jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            top: 0,
            width: 116,
            height: 28,
        } as DOMRect);

        try {
            reference.configure(2);
            [engine, reference].forEach((instance) => {
                instance.layout([line]);
                instance.setPlaying(true);
                instance.setPointer(54, 14);
            });
            for (let time = 40; time < 400; time += 40) frame(time);
            context.arc.mockClear();
            opacity.length = 0;
            frame(400);
            const before = [...context.arc.mock.calls];
            const beforeOpacity = [...opacity];
            context.arc.mockClear();
            opacity.length = 0;

            engine.layout([{ ...line }]);
            engine.redraw();

            expect(context.arc.mock.calls).toEqual(before);
            expect(opacity).toEqual(beforeOpacity);
            context.arc.mockClear();
            referenceContext.arc.mockClear();
            frame(440);
            expect(context.arc.mock.calls.length).toBeGreaterThan(0);
            expect(context.arc.mock.calls).toEqual(referenceContext.arc.mock.calls);
        } finally {
            reference.destroy();
        }
    });

    it('перестраивает облако при изменении геометрии, шрифта и DPR', () => {
        engine.layout([line]);
        const initialWidth = canvas.width;
        context.arc.mockClear();

        engine.layout([{ ...line, width: 150 }]);
        expect(canvas.width).toBeGreaterThan(initialWidth);
        const beforeFontChange = [...context.arc.mock.calls];
        context.arc.mockClear();
        engine.configure(2, 24);
        engine.layout([{ ...line, width: 150 }]);
        expect(context.arc.mock.calls.length).toBeGreaterThan(0);
        expect(context.arc.mock.calls).not.toEqual(beforeFontChange);

        const beforeDprChange = { width: canvas.width, height: canvas.height };
        jest.replaceProperty(window, 'devicePixelRatio', 0.75);
        engine.layout([{ ...line, width: 150 }]);
        expect(canvas.width).toBe(beforeDprChange.width * 0.75);
        expect(canvas.height).toBe(beforeDprChange.height * 0.75);
    });

    it.each([
        { dpr: 1, scale: 2 },
        { dpr: 1.5, scale: 2 },
        { dpr: 2, scale: 2 },
        { dpr: 3, scale: 2 },
    ])('при DPR $dpr ограничивает разрешение canvas масштабом $scale', ({ dpr, scale }) => {
        jest.replaceProperty(window, 'devicePixelRatio', dpr);

        engine.layout([line]);

        expect(canvas.width).toBe(116 * scale);
        expect(canvas.height).toBe(28 * scale);
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
            // После прореживания края обе крайние колонки всё ещё содержат частицы.
            expect(particles.some(([x]) => x > width - cellSize)).toBe(true);
            expect(Math.min(...particles.map(([x]) => x))).toBeLessThan(cellSize);
            const center = particles.filter(
                ([x, y]) => x >= 20 && x <= width - 20 && y >= 20 && y <= height - 20,
            );
            expect(center.length / ((width - 40) * (height - 40))).toBeCloseTo(0.58 / 12, 2);
        } finally {
            block.destroy();
        }
    });

    it('ограничивает количество частиц и размер canvas', () => {
        engine.layout([{ ...line, width: 10000, height: 10000 }]);

        expect(context.arc.mock.calls.length).toBeGreaterThan(0);
        expect(context.arc.mock.calls.length).toBeLessThanOrEqual(4000);
        expect(canvas.width * canvas.height).toBeLessThanOrEqual(4000000);
    });

    it.each(
        (['text', 'element'] as const).flatMap((mode) => [
            { mode, expand: false, repel: false },
            { mode, expand: true, repel: false },
            { mode, expand: false, repel: true },
            { mode, expand: true, repel: true },
        ]),
    )(
        'в режиме $mode независимо применяет expand=$expand и repel=$repel',
        ({ mode, expand, repel }) => {
            engine.destroy();
            engine = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                mode,
            );
            const referenceContext = {
                ...context,
                arc: jest.fn(),
                fill: jest.fn(),
                setTransform: jest.fn(),
            };
            const reference = new ParticleEngine(
                canvas,
                referenceContext as unknown as CanvasRenderingContext2D,
                mode,
            );
            const rect = { x: 0, y: 0, width: 200, height: 40 };
            const edge = mode === 'text' ? 4 : 0;
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
                left: 0,
                top: 0,
                width: rect.width + 2 * edge + 8,
                height: rect.height + 8,
            } as DOMRect);
            try {
                engine.layout([rect]);
                reference.layout([rect]);
                engine.setPlaying(true);
                reference.setPlaying(true);
                engine.setInteraction(expand, repel);
                engine.setPointer(50 + edge + 4, 24);
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                context.setTransform.mockClear();
                frame(100);

                const transforms = context.setTransform.mock.calls;
                // Маска задаёт фактический масштаб облака; возвращаем координаты в исходную область.
                const scaleX =
                    transforms[transforms.length - 2][0] / transforms[transforms.length - 1][0];
                const scaleY =
                    transforms[transforms.length - 2][3] / transforms[transforms.length - 1][3];
                expect(scaleX > 1).toBe(expand);
                expect(scaleY > 1).toBe(expand);
                const particles = context.arc.mock.calls;
                expect(particles.length).toBeGreaterThan(0);
                expect(particles.length).toBe(referenceContext.arc.mock.calls.length);
                const offsets = particles.map(([x, y, radius], index) => {
                    const idle = referenceContext.arc.mock.calls[index];
                    expect(radius).toBe(idle[2]);
                    return Math.hypot(
                        100 + (x - 100) / scaleX - idle[0],
                        20 + (y - 20) / scaleY - idle[1],
                    );
                });
                expect(offsets.some((distance) => distance > 0.01)).toBe(repel);
                if (!repel) expect(Math.max(...offsets)).toBeLessThan(0.000001);

                engine.setInteraction(false, false);
                context.arc.mockClear();
                engine.redraw();
                expect(context.arc.mock.calls).toEqual(particles);
                for (let time = 140; time <= 3100; time += 40) {
                    context.arc.mockClear();
                    referenceContext.arc.mockClear();
                    frame(time);
                }
                expect(context.arc.mock.calls).toEqual(referenceContext.arc.mock.calls);
            } finally {
                reference.destroy();
            }
        },
    );

    it.each([
        { width: 150, height: 150 },
        { width: 240, height: 80 },
    ])(
        'удерживает точки в прямоугольной маске $width × $height при hover и переключении',
        ({ width, height }) => {
            const rect = { x: 0, y: 0, width, height };
            const block = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                'element',
            );
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
                left: 0,
                top: 0,
                width: width + 8,
                height: height + 8,
            } as DOMRect);
            let count = 0;

            try {
                block.configure(75);
                block.layout([rect]);
                block.setPlaying(true);
                block.setPointer(width / 2, height / 4);
                for (let time = 0; time <= 1600; time += 40) {
                    if (time === 800) block.setOpen(true);
                    if (time === 1200) block.setOpen(false);
                    context.arc.mockClear();
                    frame(time);
                    context.arc.mock.calls.forEach(([x, y, radius]) => {
                        count += 1;
                        expect(x - radius).toBeGreaterThanOrEqual(-4);
                        expect(x + radius).toBeLessThanOrEqual(width + 4);
                        expect(y - radius).toBeGreaterThanOrEqual(-4);
                        expect(y + radius).toBeLessThanOrEqual(height + 4);
                    });
                }
                expect(count).toBeGreaterThan(0);
            } finally {
                block.destroy();
            }
        },
    );

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

    it('обновляет цвет статичного облака при неизменной геометрии', () => {
        engine.layout([line]);
        context.fill.mockClear();
        canvas.style.color = 'white';

        engine.layout([{ ...line }]);

        expect(context.fillStyle).toBe('rgb(255, 255, 255)');
        expect(context.fill).toHaveBeenCalled();
        expect(frames.size).toBe(0);
    });

    it.each(['text', 'element'] as const)(
        'в режиме %s завершает fade за 320 мс, сохраняя траектории и размеры точек в буфере',
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
                    expect([x, y]).toEqual(idle[index].slice(0, 2));
                    expect(x - radius).toBeGreaterThanOrEqual(-4);
                    expect(x + radius).toBeLessThanOrEqual(line.width + 4);
                    expect(y - radius).toBeGreaterThanOrEqual(0);
                    expect(y + radius).toBeLessThanOrEqual(line.height);
                    expect(radius).toBeGreaterThan(0);
                    expect(radius).toBe(idle[index][2]);
                    expect(opacity[index]).toBeLessThan(referenceOpacity[index]);
                });
                const fading = opacity.map((alpha, index) => alpha / referenceOpacity[index]);

                expect(Math.max(...fading) - Math.min(...fading)).toBeGreaterThan(0.1);
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                frame(240);
                expect(context.arc.mock.calls.map(([x, y]) => [x, y])).toEqual(
                    referenceContext.arc.mock.calls.map(([x, y]) => [x, y]),
                );
                reference.destroy();
                context.fill.mockClear();
                frame(320);

                expect(context.fill).not.toHaveBeenCalled();
                expect(frames.size).toBe(0);
            } finally {
                reference.destroy();
            }
        },
    );

    it.each(['text', 'element'] as const)(
        'в режиме %s плавно появляется на обычных траекториях без вспышки и новой раскладки',
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
                expect(context.arc.mock.calls.map(([x, y]) => [x, y])).toEqual(
                    referenceContext.arc.mock.calls.map(([x, y]) => [x, y]),
                );
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
                    expect([x, y]).toEqual(idle.slice(0, 2));
                    expect(radius).toBe(idle[2]);
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
                frame(320);
                expect(context.arc.mock.calls).toEqual(referenceContext.arc.mock.calls);
            } finally {
                reference.destroy();
            }
        },
    );

    it('при обратном переключении продолжает из текущего положения без скачка', () => {
        const opacity: number[] = [];
        context.fill.mockImplementation(() => opacity.push(context.globalAlpha));
        engine.layout([line]);
        engine.setPlaying(true);
        frame(0);
        engine.setOpen(true);
        context.arc.mockClear();
        opacity.length = 0;
        frame(120);
        const middle = [...context.arc.mock.calls];
        const middleOpacity = [...opacity];
        context.arc.mockClear();
        opacity.length = 0;

        engine.setOpen(false);

        expect(context.arc.mock.calls).toEqual(middle);
        expect(opacity).toEqual(middleOpacity);
        context.arc.mockClear();
        frame(240);
        expect(context.arc.mock.calls).not.toEqual(middle);
    });

    it('при отключении движения завершает текущий переход и останавливает кадры', () => {
        engine.layout([line]);
        engine.setPlaying(true);
        engine.setOpen(true);
        frame(160);
        expect(frames.size).toBeGreaterThan(0);
        context.fill.mockClear();

        engine.setPlaying(false);

        expect(context.fill).not.toHaveBeenCalled();
        expect(frames.size).toBe(0);
        engine.setOpen(false);
        expect(context.fill).toHaveBeenCalled();
        expect(frames.size).toBe(0);
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
        frame(379);
        expect(context.fill).toHaveBeenCalled();
        context.fill.mockClear();
        frame(380);
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

    it.each(['text', 'element'] as const)(
        'в режиме %s плавно расширяет облако и отталкивает ближайшие точки без изменения узора',
        (mode) => {
            engine.destroy();
            engine = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                mode,
            );
            const referenceContext = { ...context, arc: jest.fn(), fill: jest.fn() };
            const reference = new ParticleEngine(
                canvas,
                referenceContext as unknown as CanvasRenderingContext2D,
                mode,
            );
            const rect = { x: -100, y: 24, width: 200, height: mode === 'text' ? 20 : 100 };
            const edge = mode === 'text' ? 4 : 0;
            const paddingX = 4;
            const paddingY = 4;
            const pointer = { x: rect.x + 60, y: rect.y + rect.height / 2 };

            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
                left: 300,
                top: 100,
                width: (rect.width + edge * 2 + paddingX * 2) * 2,
                height: (rect.height + paddingY * 2) * 2,
            } as DOMRect);

            try {
                engine.layout([rect]);
                reference.layout([rect]);
                engine.setPlaying(true);
                reference.setPlaying(true);
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                const buffer = { width: canvas.width, height: canvas.height };
                engine.setPointer(
                    300 + (60 + edge + paddingX) * 2,
                    100 + rect.height + paddingY * 2,
                );
                expect(context.arc).not.toHaveBeenCalled();
                frame(40);
                const first = [...context.arc.mock.calls];
                const idle = [...referenceContext.arc.mock.calls];
                const hoverProgress = 1 - Math.exp(-0.04 / 0.3);
                const eased = hoverProgress ** 2 * (3 - 2 * hoverProgress);
                const expansionX = paddingX * eased;
                const expansionY = paddingY * eased;
                const scaleX = 1 + (2 * expansionX) / (rect.width + 2 * edge);
                const scaleY = 1 + (2 * expansionY) / rect.height;
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                const localPointerX = centerX + (pointer.x - centerX) / scaleX;
                let moved = 0;
                let movedInExtendedRadius = 0;
                let unchanged = 0;

                first.forEach(([x, y, radius], index) => {
                    const [baseX, baseY, baseRadius] = idle[index];
                    const localX = centerX + (x - centerX) / scaleX;
                    const localY = centerY + (y - centerY) / scaleY;
                    const distance = Math.hypot(baseX - localPointerX, baseY - pointer.y);
                    const displacement = Math.hypot(localX - baseX, localY - baseY);

                    expect(radius).toBe(baseRadius);
                    // Первый кадр не прыгает сразу к полному смещению в 10 px.
                    expect(displacement).toBeLessThan(1.3);
                    expect(x - radius).toBeGreaterThanOrEqual(rect.x - edge - expansionX);
                    expect(x + radius).toBeLessThanOrEqual(rect.x + rect.width + edge + expansionX);
                    expect(y - radius).toBeGreaterThanOrEqual(rect.y - expansionY);
                    expect(y + radius).toBeLessThanOrEqual(rect.y + rect.height + expansionY);
                    if (distance < 24) {
                        expect(
                            Math.hypot(localX - localPointerX, localY - pointer.y),
                        ).toBeGreaterThan(distance);
                        moved += 1;
                    } else if (distance >= 40 && distance < 48) {
                        expect(displacement).toBeGreaterThan(0);
                        movedInExtendedRadius += 1;
                    } else if (distance >= 50) {
                        expect(displacement).toBeCloseTo(0, 10);
                        expect(Math.abs(x - baseX)).toBeGreaterThan(0);
                        unchanged += 1;
                    }
                });
                expect(first.length).toBe(idle.length);
                expect({ width: canvas.width, height: canvas.height }).toEqual(buffer);
                expect(moved).toBeGreaterThan(0);
                expect(movedInExtendedRadius).toBeGreaterThan(0);
                expect(unchanged).toBeGreaterThan(0);

                engine.clearPointer();
                context.arc.mockClear();
                engine.redraw();
                expect(context.arc.mock.calls).toEqual(first);
                for (let time = 80; time <= 3000; time += 40) {
                    context.arc.mockClear();
                    referenceContext.arc.mockClear();
                    frame(time);
                }
                expect(context.arc.mock.calls).toEqual(referenceContext.arc.mock.calls);
            } finally {
                reference.destroy();
            }
        },
    );

    it.each([
        { width: 150, height: 150 },
        { width: 300, height: 80 },
    ])(
        'в блоке $width × $height раздвигает точки в пределах 4 px, не увеличивая их радиусы',
        (rectSize) => {
            engine.destroy();
            engine = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                'element',
            );
            const referenceContext = { ...context, arc: jest.fn(), fill: jest.fn() };
            const reference = new ParticleEngine(
                canvas,
                referenceContext as unknown as CanvasRenderingContext2D,
                'element',
            );
            const rect = { x: 0, y: 0, ...rectSize };
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
                left: 0,
                top: 0,
                width: rect.width + 8,
                height: rect.height + 8,
            } as DOMRect);

            try {
                [engine, reference].forEach((instance) => {
                    instance.layout([rect]);
                    instance.setPlaying(true);
                });
                const buffer = { width: canvas.width, height: canvas.height };
                engine.setPointer(4, 4);
                for (let time = 40; time <= 2000; time += 40) frame(time);
                context.arc.mockClear();
                referenceContext.arc.mockClear();
                frame(2040);
                const idle = referenceContext.arc.mock.calls;
                const hovered = context.arc.mock.calls;
                const distant = idle
                    .map(([x], index) => (x > rect.width / 2 ? index : -1))
                    .filter((index) => index >= 0);
                expect(distant.length).toBeGreaterThan(1);
                expect(hovered).toHaveLength(idle.length);
                distant.forEach((index) => {
                    expect(hovered[index][0]).toBeCloseTo(
                        rect.width / 2 + (idle[index][0] - rect.width / 2) * (1 + 8 / rect.width),
                        6,
                    );
                    expect(hovered[index][1]).toBeCloseTo(
                        rect.height / 2 +
                            (idle[index][1] - rect.height / 2) * (1 + 8 / rect.height),
                        6,
                    );
                });
                expect(hovered.map(([, , radius]) => radius)).toEqual(
                    idle.map(([, , radius]) => radius),
                );
                expect({ width: canvas.width, height: canvas.height }).toEqual(buffer);
            } finally {
                reference.destroy();
            }
        },
    );

    it.each(['text', 'element'] as const)(
        'в режиме %s мягко начинает расширение и сужение, сохраняя предел 4 px',
        (mode) => {
            engine.destroy();
            engine = new ParticleEngine(
                canvas,
                context as unknown as CanvasRenderingContext2D,
                mode,
            );
            const referenceContext = { ...context, arc: jest.fn(), fill: jest.fn() };
            const reference = new ParticleEngine(
                canvas,
                referenceContext as unknown as CanvasRenderingContext2D,
                mode,
            );
            const edge = mode === 'text' ? 4 : 0;
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
                left: 0,
                top: 0,
                width: 108 + edge * 2,
                height: 28,
            } as DOMRect);

            try {
                engine.layout([line]);
                reference.layout([line]);
                engine.setPlaying(true);
                reference.setPlaying(true);
                // Дальний край не попадает в радиус отталкивания: проверяем только рост оболочки.
                const index = referenceContext.arc.mock.calls.findIndex(([x]) => x > 90);
                expect(index).toBeGreaterThanOrEqual(0);
                const expansionAt = (time: number) => {
                    context.arc.mockClear();
                    referenceContext.arc.mockClear();
                    frame(time);
                    const x = context.arc.mock.calls[index][0];
                    const idleX = referenceContext.arc.mock.calls[index][0];

                    return ((x - 50) / (idleX - 50) - 1) * (50 + edge);
                };

                engine.setPointer(4 + edge, 14);
                const first = expansionAt(40);
                expect(first).toBeGreaterThan(0);
                expect(first).toBeLessThan(0.2);
                let expanded = first;
                for (let time = 80; time <= 2000; time += 40) {
                    const next = expansionAt(time);
                    expect(next).toBeGreaterThanOrEqual(expanded - 1e-10);
                    expect(next).toBeLessThanOrEqual(4 + 1e-10);
                    expanded = next;
                }
                expect(expanded).toBeCloseTo(4, 6);

                engine.clearPointer();
                const firstReturn = expansionAt(2040);
                expect(firstReturn).toBeLessThan(expanded);
                expect(expanded - firstReturn).toBeLessThan(0.2);
                for (let time = 2080; time <= 4000; time += 40) expansionAt(time);
                expect(expansionAt(4040)).toBeCloseTo(0, 6);
            } finally {
                reference.destroy();
            }
        },
    );

    it('игнорирует курсор в статичном и раскрытом состоянии и сбрасывает отталкивание при паузе', () => {
        engine.layout([line]);
        const bounds = jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            top: 0,
            width: 116,
            height: 28,
        } as DOMRect);
        engine.setPointer(54, 10);
        expect(bounds).not.toHaveBeenCalled();
        expect(frames.size).toBe(0);

        engine.setPlaying(true);
        engine.setPointer(54, 10);
        frame(40);
        context.arc.mockClear();
        engine.setPlaying(false);
        const paused = [...context.arc.mock.calls];
        engine.layout([line]);
        context.arc.mockClear();
        engine.redraw();
        expect(context.arc.mock.calls).toEqual(paused);
        engine.setOpen(true);
        engine.setPlaying(true);
        bounds.mockClear();
        engine.setPointer(54, 10);
        expect(bounds).not.toHaveBeenCalled();
        expect(frames.size).toBe(0);
    });
});
