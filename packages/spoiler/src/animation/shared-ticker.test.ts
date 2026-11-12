import { subscribeAnimationFrame } from './shared-ticker';

describe('Общий тикер анимаций Spoiler', () => {
    let frames: Map<number, FrameRequestCallback>;
    let cleanups: Array<() => void>;
    let nextId: number;
    let clock: number;
    const frame = (time: number) => {
        clock = time;
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach((callback) => callback(time));
    };

    beforeEach(() => {
        frames = new Map();
        cleanups = [];
        nextId = 0;
        clock = 0;
        jest.spyOn(window.performance, 'now').mockImplementation(() => clock);
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(
            (callback: FrameRequestCallback) => {
                frames.set(++nextId, callback);
                return nextId;
            },
        );
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) =>
            frames.delete(id),
        );
    });

    afterEach(() => {
        cleanups.forEach((cleanup) => cleanup());
        jest.restoreAllMocks();
    });

    it('обслуживает несколько подписчиков одним rAF и ограничивает частоту', () => {
        const first = jest.fn();
        const second = jest.fn();

        cleanups.push(subscribeAnimationFrame(first), subscribeAnimationFrame(second));
        expect(frames.size).toBe(1);
        frame(0);
        frame(16);
        expect(first).not.toHaveBeenCalled();
        frame(34);
        expect(first).toHaveBeenCalledWith(0.034, 34);
        expect(second).toHaveBeenCalledWith(0.034, 34);
        cleanups[0]();
        expect(frames.size).toBe(1);
        cleanups[1]();
        expect(frames.size).toBe(0);
    });

    it('не включает время паузы в первый шаг новой подписки', () => {
        const listener = jest.fn();
        const unsubscribe = subscribeAnimationFrame(listener);

        cleanups.push(unsubscribe);
        frame(0);
        frame(40);
        unsubscribe();
        cleanups.push(subscribeAnimationFrame(listener));
        frame(10000);
        expect(listener).toHaveBeenCalledTimes(1);
        frame(10040);
        expect(listener).toHaveBeenLastCalledWith(0.04, 10040);
    });

    it('отменяет следующий кадр при отписке из обработчика', () => {
        let unsubscribe = () => {};

        unsubscribe = subscribeAnimationFrame(() => unsubscribe());
        cleanups.push(unsubscribe);
        frame(0);
        frame(40);
        expect(frames.size).toBe(0);
    });

    it('не делает скачок после приостановки кадров браузером в скрытой вкладке', () => {
        const listener = jest.fn();

        cleanups.push(subscribeAnimationFrame(listener));
        frame(0);
        frame(40);
        frame(10000);
        expect(listener).toHaveBeenCalledTimes(1);
        frame(10040);
        expect(listener).toHaveBeenLastCalledWith(0.04, 10040);
    });

    it.each([60, 120])(
        'рисует переход на каждом кадре экрана %s Гц и затем возвращает ограничение',
        (rate) => {
            const listener = jest.fn();
            let transitioning = true;
            const interval = 1000 / rate;

            cleanups.push(subscribeAnimationFrame(listener, () => transitioning));
            for (let index = 1; index <= 6; index++) frame(index * interval);
            expect(listener).toHaveBeenCalledTimes(6);
            expect(listener.mock.calls[0][0]).toBeCloseTo(interval / 1000);
            expect(frames.size).toBe(1);

            transitioning = false;
            listener.mockClear();
            const end = clock;
            frame(end + 16);
            expect(listener).not.toHaveBeenCalled();
            frame(end + 34);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener.mock.calls[0][0]).toBeCloseTo(0.034);
        },
    );
});
