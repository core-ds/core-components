import { type RefObject, useCallback, useRef, type WheelEvent } from 'react';

interface Params {
    overlay: boolean;
    refObject?: RefObject<HTMLDivElement>;
}

export const useScrollableContainerRef = ({ overlay, refObject }: Params) => {
    const innerScrollableContainerRef = useRef<HTMLDivElement>(null);
    const scrollableContainerRef = refObject || innerScrollableContainerRef;

    const handleWheel = useCallback(
        (e: WheelEvent<HTMLElement>) => {
            if (!overlay || e.target !== e.currentTarget) {
                return;
            }

            scrollableContainerRef.current?.scrollBy({
                top: e.deltaY,
            });
        },
        [overlay, scrollableContainerRef],
    );

    return {
        handleWheel,
        scrollableContainerRef,
    };
};
