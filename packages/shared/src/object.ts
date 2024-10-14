import { isNonNullable } from './fnUtils';

export function isObject<T>(value: T): value is NonNullable<T & object> {
    return isNonNullable(value) && typeof value === 'object';
}

export function hasOwnProperty<T extends object, K extends keyof T>(val: T, prop: K): boolean {
    return Object.prototype.hasOwnProperty.call(val, prop);
}
