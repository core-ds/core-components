export function ensureArray<T>(val: T | T[]): T[] {
    return Array.isArray(val) ? val : [val];
}
