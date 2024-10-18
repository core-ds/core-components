import { MutableRefObject, useEffect, useState } from 'react';

import { isClient } from '@alfalab/core-components-shared';

/** Устанавливает необходимую ширину модального окна */
export const useModalWidth = (
    width: number | 'fullWidth',
    open: boolean,
    componentRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const ref = componentRef;
    const [currentWidth, setCurrentWidth] = useState<number>(0);

    useEffect(() => {
        if (ref.current) {
            let viewportWidth = 0;
            const modalSideGap = 12;

            if (isClient()) {
                viewportWidth = Math.max(
                    document.documentElement.clientWidth || 0,
                    window.innerWidth || 0,
                );
            }

            const fullWidth = viewportWidth - modalSideGap * 2;
            const computedWidth =
                width > viewportWidth || width === 'fullWidth' ? fullWidth : width;

            if (!Number.isNaN(parseFloat(String(computedWidth)))) {
                ref.current.style.width = `${parseFloat(String(computedWidth))}px`;
                setCurrentWidth(computedWidth);
            }
        }
    }, [open, width, ref]);

    return {
        currentWidth,
    };
};
