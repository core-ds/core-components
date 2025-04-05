import { isNonNullable } from './fnUtils';

// TODO up typescript version
export function isObj<T, U extends object>(value: T): value is NonNullable<T> & U {
    return typeof value === 'object' && isNonNullable(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFn<T>(value: T): value is Extract<T, (this: any, ...args: any) => any> {
    return typeof value === 'function';
}

export function isBool<T>(value: T): value is Extract<T, boolean> {
    return typeof value === 'boolean';
}

export function isStr<T>(value: T): value is Extract<T, string> {
    return typeof value === 'string';
}
