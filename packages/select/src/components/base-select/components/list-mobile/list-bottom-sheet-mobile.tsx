import React, { FC, ReactNode, RefObject } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';

import { OptionShape } from '../../../../typings';

import { ListBottomSheetMobileRestProps } from './types/types';

import mobileStyles from '../../mobile.module.css';

type ListMobileProps = {
    open: boolean;
    menuRef: RefObject<HTMLDivElement>;
    scrollableContainerRef: RefObject<HTMLDivElement>;
    flatOptions: OptionShape[];
    closeMenu: () => void;
    handleEntered: (node: HTMLElement, isAppearing: boolean) => void;
    renderSearch: () => ReactNode;
    renderOptionsList: () => ReactNode;
} & ListBottomSheetMobileRestProps;

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
        onScroll,
        flatOptions,
        closeMenu,
        handleEntered,
        renderSearch,
        renderOptionsList,
    } = props;

    if (BottomSheet) {
        const bottomAddons = bottomSheetProps?.bottomAddons;

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
                        {typeof bottomAddons === 'function'
                            ? bottomAddons(flatOptions)
                            : bottomAddons}
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
    }

    return null;
};
