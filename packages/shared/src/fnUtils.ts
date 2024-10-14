import { hasOwnProperty } from './object';
import { isObj } from './type-checks';

/**
 * Возвращает true, если значение равно null или undefined
 */
export function isNullable<T>(value: T): value is T & (null | undefined) {
    return !isNonNullable(value);
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
    return value != null;
}

export function shallowEqual<T>(a: T, b: T): boolean {
    if (Object.is(a, b)) {
        return true;
    }

    if (!isObj(a) || a === null || !isObj(b) || b === null) {
        return false;
    }

    const aKeys = Object.keys(a) as Array<keyof typeof a>;
    const bKeys = Object.keys(b) as Array<keyof typeof b>;

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
        if (!hasOwnProperty(b, aKeys[i]) || !Object.is(a[aKeys[i]], b[aKeys[i]])) {
            return false;
        }
    }

    return true;
}

export function assert(condition: boolean, msg?: string): asserts condition {
    if (process.env.NODE_ENV === 'development' && !condition) {
        throw new Error(msg);
    }
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
