import { type RefObject, useEffect } from 'react';

export const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    handler: () => void,
    active = true,
    ignoredRefs: Array<RefObject<HTMLElement>> = [],
) => {
    useEffect(() => {
        if (!active) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;

            if (!ref.current) return;

            if (ref.current.contains(target)) return;

            if (ignoredRefs.some((r) => r.current?.contains(target))) return;

            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        // eslint-disable-next-line consistent-return
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, active, ignoredRefs]);
};
