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

            if (isClient()) {
                viewportWidth = Math.max(
                    document.documentElement.clientWidth || 0,
                    window.innerWidth || 0,
                );
            }

            const computedWidth =
                width > viewportWidth || width === 'fullWidth' ? viewportWidth : width;

            if (!Number.isNaN(parseFloat(String(computedWidth)))) {
                ref.current.style.width = `${parseFloat(String(computedWidth))}px`;

                if (setModalWidth) {
                    setModalWidth(computedWidth);
                }
            }
        }
    }, [open, width, ref, setModalWidth, context]);
};
