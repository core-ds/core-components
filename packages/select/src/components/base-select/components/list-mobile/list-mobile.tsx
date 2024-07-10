import React, { FC, ReactNode, RefObject } from 'react';

import { OptionShape } from '@alfalab/core-components-select/typings';

import { ListBottomSheetMobileRestProps, ListModalMobileRestProps } from './types/types';
import { ListBottomSheetMobile } from './list-bottom-sheet-mobile';
import { ListModalMobile } from './list-modal-mobile';

type ListMobileProps = {
    commonProps: ListBottomSheetMobileRestProps | ListModalMobileRestProps;
    isBottomSheet: boolean;
    nativeSelect: boolean;
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
    const { commonProps, isBottomSheet, nativeSelect, ...rest } = props;

    if (isBottomSheet && !nativeSelect) {
        return (
            <ListBottomSheetMobile {...(commonProps as ListBottomSheetMobileRestProps)} {...rest} />
        );
    }

    if (!isBottomSheet && !nativeSelect) {
        return <ListModalMobile {...(commonProps as ListModalMobileRestProps)} {...rest} />;
    }

    return null;
};
