import { UIEvent, useEffect, useRef, useState } from 'react';

export const useFullWidthScroll = (isFullScroll: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const [isLeftOut, setIsLeftOut] = useState(false);
    const [isRightOut, setIsRightOut] = useState(false);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const node = e.currentTarget;

        setIsLeftOut(node.scrollLeft !== 0);
        setIsRightOut(node.scrollLeft + node.clientWidth >= node.scrollWidth);
    };

    useEffect(() => {
        const scrollableNode = scrollableContainerRef.current || containerRef.current;

        if (scrollableNode && isFullScroll) {
            const { scrollWidth, clientWidth } = scrollableNode;
            if (scrollWidth > clientWidth) setIsRightOut(true);
        }
    }, [isFullScroll]);

    return {
        containerRef,
        scrollableContainerRef,
        handleScroll,
        isRightOut,
        isLeftOut,
    };
};
