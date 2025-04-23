import { RefObject, useEffect } from 'react';

import { UniversalModalDesktopProps } from '../types/props';

export const useHugContentHeight = (
    componentRef: RefObject<HTMLElement>,
    open: UniversalModalDesktopProps['open'],
    height: UniversalModalDesktopProps['height'],
) => {
    useEffect(() => {
        if (height === 'hugContent') {
            if (!componentRef.current) return;

            const { offsetHeight, style } = componentRef.current;

            style.maxHeight = `${offsetHeight}px`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
};
