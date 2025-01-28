import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalBySideProps } from '../../types/props';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

import styles from './side-modal.module.css';
import fullSizeBackdropTransitions from '../../styles/full-size-backdrop-transitions.module.css';
import fullSizeVerticalTopTransitions from '../../styles/full-size-vertical-top-transitions.module.css';
import { getDefaultTransitionProps } from './get-default-transition-props';

export const SideModal = forwardRef<HTMLDivElement, ModalBySideProps>((props, ref) => {
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
        margin = [0],
        onClose,
        ...restProps
    } = props;
    const componentRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useModalMargin({ margin, open, componentRef, horizontalAlign, verticalAlign });
    useModalWidth(width, open, componentRef);
    useModalHeight(height, open, componentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';
    const isVerticalCenter = verticalAlign === 'center';
    const isVerticalBottom = verticalAlign === 'bottom';

    const isFullSizeModal = width === 'fullWidth' && height === 'fullHeight';

    const transitionProps = () => {
        if (isFullSizeModal) {
            if (verticalAlign === 'top') {
                return {
                    classNames: fullSizeVerticalTopTransitions,
                    timeout: {
                        enter: 200,
                        exit: 400,
                    },
                };
            }
            return {};
        }

        return getDefaultTransitionProps({
            componentRef,
            horizontalAlign,
            margin,
        });
    };

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
            wrapperClassName={cn({
                [styles.wrapperAlignStart]: isHorizontalStart,
                [styles.wrapperAlignEnd]: isHorizontalEnd,
                [styles.wrapperJustifyCenter]: isVerticalCenter,
                [styles.wrapperJustifyEnd]: isVerticalBottom,
            })}
            className={cn(styles.component, className, {
                [styles.overlayHidden]: !overlay,
            })}
            contentClassName={styles.content}
            transitionProps={{
                ...transitionProps(),
                ...restProps.transitionProps,
            }}
            backdropProps={{
                transparent: !overlay,
                ...(isFullSizeModal && {
                    timeout: {
                        enter: 0,
                        exit: 400,
                    },
                    transitionClassNames: fullSizeBackdropTransitions,
                }),
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
