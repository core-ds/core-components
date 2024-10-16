import { MutableRefObject, useEffect } from 'react';

import { BaseUniversalModalProps } from '../../types/props';

/** Преобразует переданный массив отступов [12, 12] => '12px 12px' и передаем стиль модалке */
export const useModalMargin = (
    margin: BaseUniversalModalProps['margin'],
    open: boolean,
    componentRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const ref = componentRef;

    useEffect(() => {
        if (ref.current && open && margin) {
            ref.current.style.margin = margin.map((value) => `${value}px`).join(' ');
        }
    }, [open, ref, margin]);
};
