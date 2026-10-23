import { ParticleEngine } from './particle-engine';

const line = { x: 0, y: 0, width: 100, height: 20 };

describe('Отрисовка частиц Spoiler', () => {
    let canvas: HTMLCanvasElement;
    let engine: ParticleEngine;
    let frames: Map<number, FrameRequestCallback>;
    let frameId: number;
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
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach((callback) => callback(time));
    };

    beforeEach(() => {
        frames = new Map();
        frameId = 0;
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
            // Первая точка принадлежит ячейке 0:0:0. Текстовый сдвиг -4px отбрасывал эту ячейку.
            expect(particles[0][0]).toBeCloseTo(2.2206, 4);
            expect(particles[0][1]).toBeCloseTo(3.5877, 4);
            expect(Math.min(...particles.map(([x]) => x))).toBeLessThan(cellSize);
            expect(particles.length / (width * height)).toBeCloseTo(0.58 / 12, 2);
            expect(canvas.style.width).toBe('');
            expect(canvas.style.left).toBe('');
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

    it('держит прозрачность в заданном диапазоне и меняет её индивидуально', () => {
        const opacity: number[] = [];
        context.fill.mockImplementation(() => opacity.push(context.globalAlpha));
        engine.layout([line]);
        const initial = [...opacity];

        opacity.length = 0;
        engine.setPlaying(true);
        frame(0);
        frame(40);

        expect(opacity.length).toBe(initial.length);
        expect(Math.min(...opacity)).toBeGreaterThanOrEqual(0.12 * 0.38);
        expect(Math.max(...opacity)).toBeLessThanOrEqual(0.5);
        const changes = opacity.map((alpha, index) => alpha - initial[index]);
        expect(changes.some((change) => change > 0)).toBe(true);
        expect(changes.some((change) => change < 0)).toBe(true);
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
        frame(400);
        frame(800);

        expect(computedStyle).not.toHaveBeenCalled();
        expect(context.fillStyle).toBe('rgb(0, 0, 0)');

        frame(1200);

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

    it('синхронизирует цвет без неявной перерисовки', () => {
        let color = 'rgb(0, 0, 0)';
        jest.spyOn(window, 'getComputedStyle').mockImplementation(
            () => ({ color }) as CSSStyleDeclaration,
        );
        engine.layout([line]);
        context.fill.mockClear();
        color = 'rgb(255, 255, 255)';

        expect(engine.syncColor()).toBe(true);
        expect(context.fill).not.toHaveBeenCalled();

        engine.redraw();
        expect(context.fillStyle).toBe('rgb(255, 255, 255)');
        expect(context.fill).toHaveBeenCalled();
    });
});
