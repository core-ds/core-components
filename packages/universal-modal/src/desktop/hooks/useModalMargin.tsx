import { MutableRefObject, useEffect } from 'react';

import { BaseUniversalModalProps } from '../types/props';

type UseModalMarginProps = {
    margin: BaseUniversalModalProps['margin'];
    open: boolean;
    componentRef: MutableRefObject<HTMLDivElement | null>;
    horizontalAlign: BaseUniversalModalProps['horizontalAlign'];
    verticalAlign: BaseUniversalModalProps['verticalAlign'];
};

/** Преобразует переданный массив отступов [12, 12] => '12px 12px' и устанавливает стиль модалке */
export const useModalMargin = ({
    margin,
    open,
    componentRef,
    horizontalAlign,
    verticalAlign,
}: UseModalMarginProps) => {
    const ref = componentRef;

    useEffect(() => {
        if (ref.current && open && margin) {
            ref.current.style.margin = margin
                .map((value) => (value === 'auto' ? value : `${value}px`))
                .join(' ');

            // Корректируем margin для top / bottom. Иначе при значении auto будет по центру, при любом другом значении всегда сверху.
            if (horizontalAlign === 'center' && verticalAlign) {
                if (verticalAlign === 'top' && ref.current.style.marginTop === 'auto') {
                    ref.current.style.marginTop = '0';
                }
                if (verticalAlign === 'bottom' && ref.current.style.marginBottom === 'auto') {
                    ref.current.style.marginBottom = '0';
                }
            }
        }
    }, [open, ref, margin, horizontalAlign, verticalAlign]);
};
