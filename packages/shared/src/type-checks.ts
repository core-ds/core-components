/* eslint-disable @typescript-eslint/ban-types */
import { isNonNullable } from './fnUtils';

export function isFn<T>(value: T): value is T & Function {
    return typeof value === 'function';
}

export function isObject<T>(value: T): value is T & object {
    return isNonNullable(value) && typeof value === 'object';
}
