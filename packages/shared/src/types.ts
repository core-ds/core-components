import { isNonNullable } from './fnUtils';

export function isObject<T>(value: T): value is Extract<T, object> {
    return isNonNullable(value) && typeof value === 'object';
}

export function isFunc<T>(value: T): value is Extract<T, (this: any, ...args: any) => any> {
    return typeof value === 'function';
}

export function isBool<T>(value: T): value is Extract<T, boolean> {
    return typeof value === 'boolean';
}

export function isStr<T>(value: T): value is Extract<T, string> {
    return typeof value === 'string';
}
