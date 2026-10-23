import { subscribeAnimationFrame } from './shared-ticker';

describe('Общий тикер анимаций Spoiler', () => {
    let frames: Map<number, FrameRequestCallback>;
    let cleanups: Array<() => void>;
    let nextId: number;
    const frame = (time: number) => {
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach((callback) => callback(time));
    };

    beforeEach(() => {
        frames = new Map();
        cleanups = [];
        nextId = 0;
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
        expect(first).toHaveBeenCalledWith(0.034);
        expect(second).toHaveBeenCalledWith(0.034);
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
        expect(listener).toHaveBeenLastCalledWith(0.04);
    });

    it('отменяет следующий кадр при отписке из обработчика', () => {
        let unsubscribe = () => {};

        unsubscribe = subscribeAnimationFrame(() => unsubscribe());
        cleanups.push(unsubscribe);
        frame(0);
        frame(40);
        expect(frames.size).toBe(0);
    });
});
