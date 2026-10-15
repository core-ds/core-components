type Listener = (seconds: number) => void;

const FRAME_INTERVAL = 1000 / 30;
const listeners = new Map<Listener, number | undefined>();
let frame: number | undefined;

/** Один цикл на все активные эффекты; время паузы не попадает в следующий шаг. */
const tick = (timestamp: number) => {
    frame = requestAnimationFrame(tick);
    listeners.forEach((previous, listener) => {
        if (previous === undefined) {
            listeners.set(listener, timestamp);
        } else if (timestamp - previous >= FRAME_INTERVAL) {
            listeners.set(listener, timestamp);
            listener(Math.min((timestamp - previous) / 1000, 1));
        }
    });
};

/** Подписывает эффекты Spoiler на один цикл requestAnimationFrame. */
export const subscribeAnimationFrame = (listener: Listener) => {
    if (!listeners.has(listener)) listeners.set(listener, undefined);
    if (frame === undefined) frame = requestAnimationFrame(tick);

    return () => {
        listeners.delete(listener);
        if (!listeners.size && frame !== undefined) {
            cancelAnimationFrame(frame);
            frame = undefined;
        }
    };
};
