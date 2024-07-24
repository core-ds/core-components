import React, { FC, ReactNode, RefObject } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { OptionShape } from '@alfalab/core-components-select/typings';
import { getDataTestId } from '@alfalab/core-components-shared';

import { ListModalMobileRestProps } from './types/types';

import mobileStyles from '../../mobile.module.css';

type ListModalMobileProps = {
    open: boolean;
    menuRef: RefObject<HTMLDivElement>;
    scrollableContainerRef: RefObject<HTMLDivElement>;
    flatOptions: OptionShape[];
    closeMenu: () => void;
    handleEntered: (node: HTMLElement, isAppearing: boolean) => void;
    renderSearch: () => ReactNode;
    renderOptionsList: () => ReactNode;
} & ListModalMobileRestProps;

export const ListModalMobile: FC<ListModalMobileProps> = (props) => {
    const {
        ModalMobile,
        dataTestId,
        open,
        modalProps,
        modalHeaderProps,
        modalFooterProps,
        menuRef,
        scrollableContainerRef,
        label,
        placeholder,
        onScroll,
        flatOptions,
        closeMenu,
        handleEntered,
        renderSearch,
        renderOptionsList,
    } = props;

    if (ModalMobile) {
        return (
            <ModalMobile
                dataTestId={getDataTestId(dataTestId, 'modal')}
                open={open}
                hasCloser={true}
                {...modalProps}
                componentRef={menuRef}
                onClose={(...args) => {
                    closeMenu();
                    modalProps?.onClose?.(...args);
                }}
                contentClassName={cn(mobileStyles.sheetContent, modalProps?.contentClassName)}
                ref={mergeRefs([
                    scrollableContainerRef,
                    modalProps?.ref as React.Ref<HTMLDivElement>,
                ])}
                wrapperProps={{
                    ...modalProps?.wrapperProps,
                    onScroll,
                }}
                transitionProps={{
                    ...modalProps?.transitionProps,
                    onEntered: handleEntered,
                }}
            >
                <ModalMobile.Header
                    hasCloser={true}
                    sticky={true}
                    {...modalHeaderProps}
                    title={undefined}
                    bottomAddons={
                        <React.Fragment>
                            {renderSearch()}
                            {flatOptions.length > 0 && modalHeaderProps?.bottomAddons}
                        </React.Fragment>
                    }
                >
                    {modalHeaderProps?.title || label || placeholder}
                </ModalMobile.Header>

                <ModalMobile.Content flex={true} className={mobileStyles.modalContent}>
                    {renderOptionsList()}
                </ModalMobile.Content>

                {modalFooterProps?.children && <ModalMobile.Footer {...modalFooterProps} />}
            </ModalMobile>
        );
    }

    return null;
};
