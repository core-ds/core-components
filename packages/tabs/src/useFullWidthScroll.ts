import { UIEvent, useEffect, useRef } from 'react';

export const useFullWidthScroll = (isFullScroll: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const node = e.currentTarget;
        const containerNode = containerRef.current;

        if (containerNode) {
            if (node.scrollLeft) {
                containerNode.style.marginLeft = '-16px';
            } else containerNode.style.marginLeft = '0';
            if (node.scrollLeft + node.clientWidth >= node.scrollWidth - 2) {
                containerNode.style.marginRight = '0';
            } else {
                containerNode.style.marginRight = '-16px';
            }
        }
    };

    useEffect(() => {
        const scrollableContainerNode = scrollableContainerRef.current;
        const containerNode = containerRef.current;

        if (containerNode && isFullScroll) {
            if (scrollableContainerNode) {
                const { scrollWidth, clientWidth } = scrollableContainerNode;
                if (scrollWidth > clientWidth) containerNode.style.marginRight = '-16px';
            } else {
                const { scrollWidth, clientWidth } = containerNode;
                if (scrollWidth > clientWidth) containerNode.style.marginRight = '-16px';
            }
        }
    }, [isFullScroll]);

    const isHandleScroll = isFullScroll && scrollableContainerRef.current;

    return {
        containerRef,
        scrollableContainerRef,
        handleScroll: isHandleScroll ? handleScroll : undefined,
    };
};
