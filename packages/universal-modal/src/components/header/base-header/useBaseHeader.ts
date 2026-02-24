import { useContext, useEffect, useRef } from 'react';

import { type NavigationBarPrivateProps } from '@alfalab/core-components-navigation-bar-private';

import { ModalContext } from '../../../Context';

type Params = Pick<NavigationBarPrivateProps, 'title' | 'children' | 'bottomAddons' | 'onClose'>;

export const useBaseHeader = (params: Params) => {
    const { title, children, bottomAddons, onClose } = params;

    const {
        componentRef,
        headerHighlighted,
        onClose: handleCloseByContext,
        setHasHeader,
    } = useContext(ModalContext);

    const titleRef = useRef<HTMLDivElement>(null);

    const hasContent = Boolean(title || children || bottomAddons);

    const handleClose: NavigationBarPrivateProps['onClose'] = (...args) => {
        if (onClose) {
            return onClose(...args);
        }

        return handleCloseByContext(...args);
    };

    useEffect(() => {
        setHasHeader(true);

        return () => {
            setHasHeader(false);
        };
    }, [setHasHeader]);

    return { headerHighlighted, hasContent, componentRef, titleRef, handleClose };
};
