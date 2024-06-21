import React, { FC, MouseEvent, ReactNode, RefObject } from 'react';

import type { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import { getDataTestId } from '@alfalab/core-components-shared';

import { BottomSheetType } from '../../types/component-types';

import mobileStyles from '../../mobile.module.css';

type ListMobileProps = {
    BottomSheet: BottomSheetType;
    dataTestId?: string;
    open: boolean;
    label: ReactNode;
    placeholder?: string;
    footer: ReactNode;
    swipeable?: boolean;
    showSearch: boolean;
    bottomSheetProps?: Partial<BottomSheetProps>;
    menuRef: RefObject<HTMLDivElement>;
    scrollableContainerRef: RefObject<HTMLDivElement>;
    closeMenu: () => void;
    handleEntered: (node: HTMLElement, isAppearing: boolean) => void;
    renderSearch: () => ReactNode;
    onScroll?: (event: MouseEvent<HTMLDivElement>) => void;
    renderOptionsList: () => ReactNode;
};

export const ListBottomSheetMobile: FC<ListMobileProps> = (props) => {
    const {
        BottomSheet,
        dataTestId,
        open,
        label,
        placeholder,
        footer,
        swipeable,
        showSearch,
        bottomSheetProps,
        menuRef,
        scrollableContainerRef,
        closeMenu,
        handleEntered,
        renderSearch,
        onScroll,
        renderOptionsList,
    } = props;

    return (
        <BottomSheet
            dataTestId={getDataTestId(dataTestId, 'bottom-sheet')}
            open={open}
            className={mobileStyles.sheet}
            contentClassName={mobileStyles.sheetContent}
            containerClassName={mobileStyles.sheetContainer}
            title={label || placeholder}
            actionButton={footer}
            stickyHeader={true}
            hasCloser={true}
            swipeable={swipeable}
            initialHeight={showSearch ? 'full' : 'default'}
            {...bottomSheetProps}
            sheetContainerRef={menuRef}
            scrollableContainerRef={scrollableContainerRef}
            onClose={() => {
                closeMenu();
                bottomSheetProps?.onClose?.();
            }}
            transitionProps={{
                ...bottomSheetProps?.transitionProps,
                onEntered: handleEntered,
            }}
            bottomAddons={
                <React.Fragment>
                    {renderSearch()}
                    {bottomSheetProps?.bottomAddons}
                </React.Fragment>
            }
            containerProps={{
                ...bottomSheetProps?.containerProps,
                onScroll,
            }}
        >
            {renderOptionsList()}
        </BottomSheet>
    );
};
