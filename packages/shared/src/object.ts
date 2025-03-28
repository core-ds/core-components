/* eslint-disable @typescript-eslint/no-explicit-any */
// https://stackoverflow.com/a/74608626
type Intersect<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
// https://stackoverflow.com/a/52991061
// eslint-disable-next-line @typescript-eslint/ban-types
type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

export function hasOwnProperty<T extends object, K extends OptionalKeys<T>>(
    val: T,
    prop: K,
): val is T & { [P in K]-?: T[P] };
export function hasOwnProperty<T extends object, K extends keyof T>(val: T, prop: K): boolean;
export function hasOwnProperty<T extends object, K extends keyof Intersect<T>>(
    val: T,
    prop: K,
): val is Extract<T, K extends OptionalKeys<T> ? { [P in K]?: any } : { [P in K]: any }>;
export function hasOwnProperty<T extends object>(val: T, prop: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(val, prop);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
