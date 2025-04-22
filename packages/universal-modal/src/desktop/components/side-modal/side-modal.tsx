import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getMarginStyles } from '../../utils/get-margin-styles';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

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
        onClose,
        ...restProps
    } = props;
    const componentRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useModalWidth({ width, open, componentRef, margin });
    useModalHeight({ height, open, componentRef, margin });
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';
    const isVerticalCenter = verticalAlign === 'center';
    const isVerticalBottom = verticalAlign === 'bottom';

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
                [styles.wrapperAlignStart]: isHorizontalStart,
                [styles.wrapperAlignEnd]: isHorizontalEnd,
                [styles.wrapperJustifyCenter]: isVerticalCenter,
                [styles.wrapperJustifyEnd]: isVerticalBottom,
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
            onWheel={handleWheel}
            onClose={onClose}
        >
            <div className={styles.container}>
                <BaseUniversalModalContent wheelDeltaY={wheelDeltaY}>
                    {children}
                </BaseUniversalModalContent>
            </div>
        </BaseModal>
    );
});
