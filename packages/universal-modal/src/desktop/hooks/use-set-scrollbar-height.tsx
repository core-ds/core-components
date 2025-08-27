import { RefObject, useEffect } from 'react';

import { SCROLLBAR_DEFAULT_GAP } from '../constants';

interface Params {
    scrollbarRef: RefObject<HTMLDivElement>;
    verticalBarRef: RefObject<HTMLDivElement>;
    headerElementRef: RefObject<HTMLDivElement>;
    footerElementRef: RefObject<HTMLDivElement>;
}

/** Устанавливает размер полосы прокрутки в зависимости от наличия хедера и футера */
export const useSetScrollbarHeight = (params: Params) => {
    const { scrollbarRef, verticalBarRef, headerElementRef, footerElementRef } = params;

    useEffect(() => {
        if (scrollbarRef.current) {
            const verticalBar = verticalBarRef.current;

            if (verticalBar) {
                const headerHeight = headerElementRef?.current?.offsetHeight || 0;
                const footerHeight = footerElementRef?.current?.offsetHeight || 0;

                let topGap;
                let topOffset;
                let bottomGap;

                if (headerHeight) {
                    // если есть header уменьшаем размер скролла на величину хедера и добавляем отступ сверху
                    topGap = headerHeight;
                    topOffset = headerHeight;
                } else {
                    // иначе уменьшаем размер скролла и увеличиваем отступ на величину скругления
                    topGap = SCROLLBAR_DEFAULT_GAP;
                    topOffset = SCROLLBAR_DEFAULT_GAP;
                }

                if (footerHeight) {
                    // если есть footer уменьшаем размер скролла на величину футера
                    bottomGap = footerHeight;
                } else {
                    // иначе уменьшаем размер на величину скругления
                    bottomGap = SCROLLBAR_DEFAULT_GAP;
                }

                verticalBar.style.height = `calc(100% - ${topGap}px - ${bottomGap}px)`;
                verticalBar.style.top = `${topOffset}px`;
            }
        }
    });
};
