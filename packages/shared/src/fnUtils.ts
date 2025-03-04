/**
 * Возвращает true, если значение равно null или undefined
 */
export function isNullable<T>(value: T): value is T & (null | undefined) {
    return !isNonNullable(value);
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
    return value != null;
}

/**
 * Выбор значения между min max границами
 */
function clamp<T extends Date | number>(value: T, min: T, max: T): T {
    const clampedValue = Math.min(Number(max), Math.max(Number(min), Number(value)));

    return (value instanceof Date ? new Date(clampedValue) : clampedValue) as T;
}

export function noop() {}

export const fnUtils = {
    clamp,
    noop,
    isNil: isNullable,
};
