import { useLayoutEffect, useRef, useState } from 'react';

export function useRefAsState<T>(
    initialValue: T,
): [ref: React.MutableRefObject<T>, value: T | null];
export function useRefAsState<T>(
    initialValue: T | null,
): [ref: React.RefObject<T>, value: T | null];
export function useRefAsState<T>(initialValue: T | null) {
    const ref = useRef(initialValue);
    const [value, setValue] = useState<T | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        const nextValue = ref.current;

        if (nextValue) {
            if (nextValue !== value) {
                setValue(nextValue);
            }
        } else if (value) {
            setValue(null);
        }
    });

    return [ref, value];
}
