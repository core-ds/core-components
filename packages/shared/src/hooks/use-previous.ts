import { useRef, useState } from 'react';

export function usePrevious<T>(
    value: T,
    isEqual: (a: T, b: T) => boolean = Object.is,
): T | undefined {
    const ref = useRef(value);
    const [previous, setPrevious] = useState<T>();

    if (!isEqual(ref.current, value)) {
        setPrevious(ref.current);
        ref.current = value;
    }

    return previous;
}
