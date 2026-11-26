let cached: number | undefined;

export const getNow = () => {
    if (cached === undefined) {
        cached = performance.now();
        queueMicrotask(() => {
            cached = undefined;
        });
    }

    return cached;
};

export interface Value {
    current: number;
    updatedAt: number;
    velocity: number;
}

const maxVelocityDelta = 30;

export const createValue = (current: number): Value => ({
    current,
    updatedAt: getNow(),
    velocity: 0,
});

export const jump = (value: Value, current: number) => {
    Object.assign(value, { current, updatedAt: getNow(), velocity: 0 });
};

export const setWithVelocity = (value: Value, prev: number, current: number, delta: number) => {
    const updatedAt = getNow();
    const elapsed = Math.min(updatedAt - (updatedAt - delta), maxVelocityDelta);

    Object.assign(value, {
        current,
        updatedAt,
        velocity: elapsed ? (current - prev) * (1000 / elapsed) : 0,
    });
};

export const getVelocity = (value: Value) =>
    getNow() - value.updatedAt > maxVelocityDelta ? 0 : value.velocity;
