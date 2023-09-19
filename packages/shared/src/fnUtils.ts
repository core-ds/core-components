/**
 * Возвращает true, если значение равно null или undefined
 */
function isNil(value: unknown) {
    return value == null;
}

/**
 * Выбор значения между min max границами
 */
function clamp<T extends Date | number>(value: T, min: T, max: T): T {
    const clampedValue = Math.min(Number(max), Math.max(Number(min), Number(value)));

    return (value instanceof Date ? new Date(clampedValue) : clampedValue) as T;
}

function noop() {}

export const fnUtils = {
    clamp,
    noop,
    isNil,
};
