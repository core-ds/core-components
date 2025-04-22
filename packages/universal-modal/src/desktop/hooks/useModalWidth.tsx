import { MutableRefObject, useContext, useEffect } from 'react';

import { hasOwnProperty, isClient } from '@alfalab/core-components-shared';

import { ResponsiveContext } from '../../ResponsiveContext';
import { UniversalModalDesktopProps } from '../types/props';

type Params = {
    width: Exclude<UniversalModalDesktopProps['width'], undefined>;
    open: UniversalModalDesktopProps['open'];
    componentRef: MutableRefObject<HTMLDivElement | null>;
    margin: UniversalModalDesktopProps['margin'];
};

/** Устанавливает необходимую ширину модального окна */
export const useModalWidth = (params: Params) => {
    const { width, open, componentRef, margin } = params;

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

            if (width > viewportWidth || width === 'fullWidth') {
                const marginLeft = (margin && hasOwnProperty(margin, 'left') && margin.left) || 0;
                const marginRight =
                    (margin && hasOwnProperty(margin, 'right') && margin.right) || 0;

                ref.current.style.width = `calc(100% - ${marginLeft}px - ${marginRight}px)`;

                if (setModalWidth) {
                    setModalWidth(viewportWidth - marginLeft - marginRight);
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
    }, [open, width, ref, setModalWidth, context, margin]);
};
