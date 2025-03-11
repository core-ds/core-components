import React, { FC, ReactNode, RefObject } from 'react';

import { OptionShape } from '../../../../typings';

import { ListBottomSheetMobileRestProps, ListModalMobileRestProps } from './types/types';
import { ListBottomSheetMobile } from './list-bottom-sheet-mobile';
import { ListModalMobile } from './list-modal-mobile';

type ListMobileProps = {
    baseProps: ListBottomSheetMobileRestProps | ListModalMobileRestProps;
    open: boolean;
    menuRef: RefObject<HTMLDivElement>;
    scrollableContainerRef: RefObject<HTMLDivElement>;
    flatOptions: OptionShape[];
    closeMenu: () => void;
    handleEntered: (node: HTMLElement, isAppearing: boolean) => void;
    renderSearch: () => ReactNode;
    renderOptionsList: () => ReactNode;
};

export const ListMobile: FC<ListMobileProps> = (props) => {
    const { baseProps, ...restProps } = props;
    const { isBottomSheet, nativeSelect } = baseProps;

    if (isBottomSheet && !nativeSelect) {
        return (
            <ListBottomSheetMobile
                {...(baseProps as ListBottomSheetMobileRestProps)}
                {...restProps}
            />
        );
    }

    if (!isBottomSheet && !nativeSelect) {
        return <ListModalMobile {...(baseProps as ListModalMobileRestProps)} {...restProps} />;
    }

    return null;
};
