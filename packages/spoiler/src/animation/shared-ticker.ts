type Listener = (seconds: number, timestamp: number) => void;
type Subscription = { previous: number; fullRate?: () => boolean };

const FRAME_INTERVAL = 1000 / 30;
const MAX_FRAME_GAP = 250;
const listeners = new Map<Listener, Subscription>();
let frame: number | undefined;

/** Один цикл на все активные эффекты; время паузы не попадает в следующий шаг. */
const tick = (timestamp: number) => {
    frame = requestAnimationFrame(tick);
    for (const [listener, subscription] of listeners) {
        const elapsed = timestamp - subscription.previous;

        if (elapsed > 0 && (subscription.fullRate?.() || elapsed >= FRAME_INTERVAL)) {
            subscription.previous = timestamp;
            // Браузер приостанавливает rAF в скрытой вкладке: пропускаем накопленное время.
            if (elapsed <= MAX_FRAME_GAP) listener(elapsed / 1000, timestamp);
        }
    }
};

/** Переходы идут на каждом кадре браузера; фоновое движение остаётся ограничено по частоте. */
export const subscribeAnimationFrame = (listener: Listener, fullRate?: () => boolean) => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function')
        return () => {};
    if (!listeners.has(listener))
        listeners.set(listener, { previous: window.performance.now(), fullRate });
    if (frame === undefined) frame = requestAnimationFrame(tick);

    return () => {
        listeners.delete(listener);
        if (!listeners.size && frame !== undefined) {
            cancelAnimationFrame(frame);
            frame = undefined;
        }
    };
};
