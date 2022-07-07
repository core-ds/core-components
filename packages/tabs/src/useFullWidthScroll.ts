import { UIEvent, useEffect, useRef, useState } from 'react';

export const useFullWidthScroll = (isFullScroll: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const [isLeftOut, setIsLeftOut] = useState(false);
    const [isRightOut, setIsRightOut] = useState(false);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const node = e.currentTarget;
        const containerNode = containerRef.current;

        if (containerNode) {
            if (node.scrollLeft) {
                setIsLeftOut(true);
            } else {
                setIsLeftOut(false);
            }
            if (node.scrollLeft + node.clientWidth >= node.scrollWidth - 2) {
                setIsRightOut(false);
            } else {
                setIsRightOut(true);
            }
        }
    };

    useEffect(() => {
        const scrollableContainerNode = scrollableContainerRef.current;
        const containerNode = containerRef.current;

        if (containerNode && isFullScroll) {
            if (scrollableContainerNode) {
                const { scrollWidth, clientWidth } = scrollableContainerNode;
                if (scrollWidth > clientWidth) {
                    setIsRightOut(true);
                }
            } else {
                const { scrollWidth, clientWidth } = containerNode;
                if (scrollWidth > clientWidth) {
                    setIsRightOut(true);
                }
            }
        }
    }, [isFullScroll]);

    const isHandleScroll = isFullScroll && scrollableContainerRef.current;

    return {
        containerRef,
        scrollableContainerRef,
        handleScroll: isHandleScroll ? handleScroll : undefined,
        isRightOut,
        isLeftOut,
    };
};
