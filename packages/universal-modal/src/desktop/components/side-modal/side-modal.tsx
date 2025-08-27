import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { useModalWheel } from '../../hooks/useModalWheel';
import type { UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getHeightStyle } from '../../utils/get-height-style';
import { getMarginStyles } from '../../utils/get-margin-styles';
import { getMaxHeightStyle } from '../../utils/get-max-height-style';
import { getWidthStyle } from '../../utils/get-width-style';
import { ModalContent } from '../modal-content/modal-content';

import { getDefaultTransitionProps } from './get-default-transition-props';

import styles from './index.module.css';

export const SideModal = forwardRef<HTMLDivElement, UniversalModalDesktopProps>((props, ref) => {
    const {
        width = 500,
        height = 'fullHeight',
        horizontalAlign = 'center',
        verticalAlign = 'center',
        overlay = true,
        open,
        dataTestId,
        className,
        children,
        margin,
        scrollableContainerRef,
        onClose,
        ...restProps
    } = props;
    const componentRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const {
        isFullSizeModal,
        componentTransitions: fullSizeModalContentTransitions,
        backdropTransitions: fullSizeModalBackdropTransitions,
    } = getFullSizeModalTransitions({ verticalAlign, width, height });

    return (
        <BaseModal
            {...restProps}
            open={open}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            contentElementRef={contentRef}
            scrollHandler='content'
            disableBlockingScroll={!overlay}
            wrapperClassName={cn(styles.wrapper, {
                [styles.wrapperAlignStart]: horizontalAlign === 'start',
                [styles.wrapperAlignEnd]: horizontalAlign === 'end',
                [styles.wrapperJustifyCenter]: verticalAlign === 'center',
                [styles.wrapperJustifyEnd]: verticalAlign === 'bottom',
            })}
            className={cn(styles.component, className, {
                [styles.overlayHidden]: !overlay,
                ...getMarginStyles({ styles, margin }),
            })}
            contentClassName={styles.content}
            transitionProps={{
                ...getDefaultTransitionProps({
                    horizontalAlign,
                    margin,
                }),
                ...(isFullSizeModal && fullSizeModalContentTransitions),
                ...restProps.transitionProps,
            }}
            backdropProps={{
                transparent: !overlay,
                ...(isFullSizeModal && fullSizeModalBackdropTransitions),
                ...restProps.backdropProps,
            }}
            componentDivProps={{
                style: {
                    width: getWidthStyle(width, margin),
                    height: getHeightStyle(height, margin),
                    ...(height === 'hugContent' && {
                        maxHeight: getMaxHeightStyle(margin),
                    }),
                },
            }}
            onWheel={handleWheel}
            onClose={onClose}
        >
            <ModalContent
                height={height}
                wheelDeltaY={wheelDeltaY}
                scrollableContainerRef={scrollableContainerRef}
            >
                {children}
            </ModalContent>
        </BaseModal>
    );
});
