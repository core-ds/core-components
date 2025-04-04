import { MutableRefObject, useEffect } from 'react';
import { isClient } from '@balafla/core-components-shared';

/** Устанавливает необходимую высоту модального окна */
export const useModalHeight = (
    height: number | 'fullHeight',
    open: boolean,
    componentRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const ref = componentRef;

    useEffect(() => {
        if (ref.current) {
            let viewportHeight = 0;
            let computedMarginTop = 0;
            let computedMarginBottom = 0;

            if (isClient()) {
                viewportHeight = Math.max(
                    document.documentElement.clientHeight || 0,
                    window.innerHeight || 0,
                );
                // рассчитываем margin'ы для дальнейшего вычитания из высоты viewport'а
                computedMarginTop = parseFloat(window.getComputedStyle(ref.current).marginTop);
                computedMarginBottom = parseFloat(
                    window.getComputedStyle(ref.current).marginBottom,
                );
            }

            if (height > viewportHeight || height === 'fullHeight') {
                ref.current.style.height = `calc(100% - ${computedMarginTop}px - ${computedMarginBottom}px)`;

                return;
            }

            if (!Number.isNaN(parseFloat(String(height)))) {
                ref.current.style.height = `${parseFloat(String(height))}px`;
            }
        }
    }, [open, height, ref]);
};
