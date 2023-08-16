import { DependencyList, useRef, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

export const useCollapsibleElements = <
    ContainerType extends HTMLElement,
    AddonType extends HTMLElement,
>(
    selectors: string,
    deps: DependencyList = [],
) => {
    const [idsCollapsedElements, setIdsCollapsedElements] = useState<string[]>([]);

    const containerRef = useRef<ContainerType>(null);
    const addonRef = useRef<AddonType>(null);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const collapseElements = (inlineSize?: number) => {
            const container = containerRef.current;

            if (!container) return;

            const addon = addonRef.current;
            const containerWidth =
                (inlineSize || container.clientWidth) - (addon?.scrollWidth || 0) * 1.5; // при расчётах, даём кнопке "Ещё" чуть больше места, чтобы точно влезла
            const elements = Array.from(container.querySelectorAll(selectors)) as HTMLElement[];

            const collapsedIds = elements.reduce<string[]>((acc, element) => {
                const { offsetLeft, scrollWidth, id } = element;
                const elementOffset = offsetLeft + scrollWidth;
                const isCollapsedElement = getComputedStyle(element).visibility === 'collapse';
                const maxWidth =
                    addon && !isCollapsedElement
                        ? containerWidth -
                          (addon.scrollWidth + parseFloat(getComputedStyle(addon).marginLeft))
                        : containerWidth;

                if (elementOffset >= maxWidth) acc.push(id);

                return acc;
            }, []);

            setIdsCollapsedElements(collapsedIds);
        };

        const handleElementsResize = (entries: ResizeObserverEntry[]) => {
            if (Array.isArray(entries[0].contentBoxSize)) {
                const [{ inlineSize }] = entries[0].contentBoxSize;

                collapseElements(inlineSize);
            } else {
                // firefox v69-91 compatibility. See https://caniuse.com/mdn-api_resizeobserverentry_contentboxsize
                const { inlineSize } = entries[0].contentBoxSize as unknown as {
                    inlineSize: number;
                };

                collapseElements(inlineSize);
            }
        };

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(handleElementsResize);

        if (containerRef.current) {
            collapseElements();
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [selectors, ...deps]);

    return {
        containerRef,
        addonRef,
        idsCollapsedElements,
    };
};
