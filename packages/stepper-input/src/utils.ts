export function isNumber(value: number | null): value is number {
    return value !== null && !Number.isNaN(value);
}

export function isEmptyValue(value: string | number) {
    if (typeof value === 'string') return !value || value === '-';

    return !isNumber(value);
}

export function isValidValue(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export function valueToInt(value: string | number) {
    return typeof value === 'string' ? parseInt(value, 10) : value;
}

export function prepareString(value: string) {
    const hasMinus = value.startsWith('-');
    let nextString = value.replace('-', '');

    while (nextString.length > (hasMinus ? 0 : 1) && nextString.startsWith('0')) {
        nextString = nextString.replace('0', '');
    }

    return hasMinus ? `-${nextString}` : nextString;
}

export function getValidValue(value: string | number, min: number, max: number): number {
    const valueNumber = valueToInt(value);

    if (isValidValue(valueNumber, min, max)) return valueNumber;

    if (valueNumber > max) return max;

    return min;
}
