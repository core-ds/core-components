import { MutableRefObject, useEffect } from 'react';

import { hasOwnProperty, isClient } from '@alfalab/core-components-shared';

import { UniversalModalDesktopProps } from '../types/props';

type Params = {
    height: Exclude<UniversalModalDesktopProps['height'], undefined>;
    open: UniversalModalDesktopProps['open'];
    componentRef: MutableRefObject<HTMLDivElement | null>;
    margin: UniversalModalDesktopProps['margin'];
};

/** Устанавливает необходимую высоту модального окна */
export const useModalHeight = (params: Params) => {
    const { height, open, componentRef, margin } = params;

    const ref = componentRef;

    useEffect(() => {
        if (ref.current) {
            let viewportHeight = 0;
            let computedHeight = 0;

            if (isClient()) {
                viewportHeight = Math.max(
                    document.documentElement.clientHeight || 0,
                    window.innerHeight || 0,
                );

                computedHeight = parseFloat(window.getComputedStyle(ref.current).height);
            }

            if (height > viewportHeight || height === 'fullHeight') {
                const marginTop = (margin && hasOwnProperty(margin, 'top') && margin.top) || 0;
                const marginBottom =
                    (margin && hasOwnProperty(margin, 'bottom') && margin.bottom) || 0;

                ref.current.style.height = `calc(100% - ${marginTop}px - ${marginBottom}px)`;

                return;
            }

            if (height === 'hugContent') {
                ref.current.style.height = `${computedHeight}px`;

                return;
            }

            if (!Number.isNaN(parseFloat(String(height)))) {
                ref.current.style.height = `${parseFloat(String(height))}px`;
            }
        }
    }, [open, height, ref, margin]);
};
