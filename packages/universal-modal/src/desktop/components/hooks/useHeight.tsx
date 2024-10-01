import { MutableRefObject, useEffect } from 'react';

import { isClient } from '@alfalab/core-components-shared';

/** Устанавливает необходимую высоту модального окна */
export const useHeight = (
    height: number | 'fullHeight',
    open: boolean,
    componentRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const ref = componentRef;

    useEffect(() => {
        if (ref.current) {
            let viewportHeight = 0;
            const modalSideGap = 12;

            if (isClient()) {
                viewportHeight = Math.max(
                    document.documentElement.clientHeight || 0,
                    window.innerHeight || 0,
                );
            }

            const fullWidth = viewportHeight - modalSideGap * 2;
            const computedWidth =
                height > viewportHeight || height === 'fullHeight' ? fullWidth : height;

            if (!Number.isNaN(parseFloat(String(computedWidth)))) {
                ref.current.style.height = `${parseFloat(String(computedWidth))}px`;
            }
        }
    }, [open, height, ref]);
};
