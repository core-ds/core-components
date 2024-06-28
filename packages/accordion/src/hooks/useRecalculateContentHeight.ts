import { useEffect, useRef } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

export const useRecalculateContentHeight = (expanded: boolean) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const contentCaseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const recalculate = () => {
            let contentHeight;

            if (!contentRef.current || !contentCaseRef.current) {
                return;
            }

            if (expanded) {
                contentHeight = contentCaseRef.current.offsetHeight;
            } else {
                contentHeight = 0;
            }

            contentRef.current.style.height = `${contentHeight}px`;
        };

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(recalculate);

        if (contentCaseRef.current) {
            observer.observe(contentCaseRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [expanded]);

    return { contentRef, contentCaseRef };
};
