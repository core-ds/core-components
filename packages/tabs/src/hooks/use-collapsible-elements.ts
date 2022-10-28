import {
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

export const useCollapsibleElements = <
    ContainerType extends HTMLElement,
    AddonType extends HTMLElement
>(selectors: string) => {
    const [idsCollapsedElements, setIdsCollapsedElements] = useState<string[]>([]);

    const containerRef = useRef<ContainerType>(null);
    const addonRef = useRef<AddonType>(null);

    useLayoutEffect(() => {
        const collapseElements = (inlineSize?: number) => {
            const container = containerRef.current;

            if (!container) return;

            const addon = addonRef.current;
            const containerWidth = inlineSize || container.clientWidth;
            const elements = Array.from(container.querySelectorAll(selectors)) as HTMLElement[];

            const idsCollapsedElements = elements.reduce<string[]>((
                acc,
                element,
            ) => {
                const { offsetLeft, offsetWidth, id } = element;
                const elementOffset = offsetLeft + offsetWidth;
                const isCollapsedElement = getComputedStyle(element).visibility === 'collapse';
                const maxWidth = addon && !isCollapsedElement
                    ? containerWidth - (addon.offsetWidth + parseFloat(getComputedStyle(addon).marginLeft))
                    : containerWidth;

                return elementOffset >= maxWidth
                    ? [...acc, id]
                    : acc;
            }, []);

            setIdsCollapsedElements(idsCollapsedElements);
        }


        const handleElementsResize = (entries: ResizeObserverEntry[]) => {
            const [{ inlineSize }] = entries[0].contentBoxSize;

            collapseElements(inlineSize)
        };

        const observer = new ResizeObserver(handleElementsResize);

        if (containerRef.current) {
            collapseElements();
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [selectors]);

    return {
        containerRef,
        addonRef,
        idsCollapsedElements,
    };
};
