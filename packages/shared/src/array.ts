export function ensureArray<T>(val: T | T[]): T[] {
    return Array.isArray(val) ? val : [val];
}

// TODO up ts version
export function findLastIndex<T>(
    array: T[],
    predicate: (value: T, index: number, obj: T[]) => unknown,
): number {
    for (let index = array.length - 1; index >= 0; index--) {
        if (predicate(array[index], index, array)) {
            return index;
        }
    }

    return -1;
}

// TODO up ts version
export function every<T, S extends T>(
    array: T[],
    predicate: (value: T, index: number, obj: T[]) => value is S,
): array is S[] {
    for (let index = 0; index < array.length; index++) {
        if (!predicate(array[index], index, array)) {
            return false;
        }
    }

    return true;
}
