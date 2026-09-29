import { type RefObject, useEffect } from 'react';

const SCROLLBAR_DEFAULT_GAP = 16;

interface Params {
    scrollbarRef: RefObject<HTMLDivElement>;
    verticalBarRef: RefObject<HTMLDivElement>;
    headerElementRef: RefObject<HTMLDivElement>;
    footerElementRef: RefObject<HTMLDivElement>;
}

/** Устанавливает отсупы для scrollbar в зависимости от высоты хедера и футера */
export const useSetScrollbarHeight = (params: Params) => {
    const { scrollbarRef, verticalBarRef, headerElementRef, footerElementRef } = params;

    useEffect(() => {
        const applyScrollbarHeight = () => {
            const verticalBar = verticalBarRef.current;

            if (!scrollbarRef.current || !verticalBar) {
                return;
            }

            const headerHeight = headerElementRef?.current?.offsetHeight || 0;
            const footerHeight = footerElementRef?.current?.offsetHeight || 0;

            const topOffset = headerHeight || SCROLLBAR_DEFAULT_GAP;
            const bottomGap = footerHeight || SCROLLBAR_DEFAULT_GAP;

            verticalBar.style.top = `${topOffset}px`;
            verticalBar.style.bottom = `${bottomGap}px`;
        };

        applyScrollbarHeight();

        const resizeObserver = new ResizeObserver(applyScrollbarHeight);

        if (headerElementRef.current) {
            resizeObserver.observe(headerElementRef.current);
        }

        if (footerElementRef.current) {
            resizeObserver.observe(footerElementRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
