import { RefObject, useEffect } from 'react';

type Params = {
    scrollableNodeRef: RefObject<HTMLDivElement>;
    wheelDeltaY: number;
};

/** Изменение позиции скролла */
export const useOutsideScroll = (params: Params) => {
    const { scrollableNodeRef, wheelDeltaY } = params;

    useEffect(() => {
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.scrollBy({
                top: wheelDeltaY,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wheelDeltaY]);
};
