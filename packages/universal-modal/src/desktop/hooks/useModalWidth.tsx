import { MutableRefObject, useContext, useEffect } from 'react';

import { isClient } from '@alfalab/core-components-shared';

import { ResponsiveContext } from '../../ResponsiveContext';

/** Устанавливает необходимую ширину модального окна */
export const useModalWidth = (
    width: number | 'fullWidth',
    open: boolean,
    componentRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const ref = componentRef;
    const context = useContext(ResponsiveContext);
    const { setModalWidth } = context || {};

    useEffect(() => {
        if (ref.current) {
            let viewportWidth = 0;
            let computedMarginLeft = 0;
            let computedMarginRight = 0;

            if (isClient()) {
                viewportWidth = Math.max(
                    document.documentElement.clientWidth || 0,
                    window.innerWidth || 0,
                );

                computedMarginLeft = parseFloat(window.getComputedStyle(ref.current).marginLeft);
                computedMarginRight = parseFloat(window.getComputedStyle(ref.current).marginRight);
            }

            if (width > viewportWidth || width === 'fullWidth') {
                ref.current.style.width = `calc(100% - ${computedMarginLeft}px - ${computedMarginRight}px)`;

                if (setModalWidth) {
                    setModalWidth(viewportWidth - computedMarginLeft - computedMarginRight);
                }

                return;
            }

            if (!Number.isNaN(parseFloat(String(width)))) {
                ref.current.style.width = `${parseFloat(String(width))}px`;

                if (setModalWidth) {
                    setModalWidth(width);
                }
            }
        }
    }, [open, width, ref, setModalWidth, context]);
};
