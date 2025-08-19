// eslint-disable-next-line @typescript-eslint/ban-types
export function isFn<T>(value: T): value is Extract<T, Function> {
    return typeof value === 'function';
}
