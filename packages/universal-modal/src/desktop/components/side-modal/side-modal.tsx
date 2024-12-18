import React, { forwardRef, useRef } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalBySideProps } from '../../types/props';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

import containerTransitions from './container-transitions.module.css';
import styles from './side-modal.module.css';

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

    useModalMargin({ margin, open, componentRef, horizontalAlign, verticalAlign });
    useModalWidth(width, open, componentRef);
    useModalHeight(height, open, componentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';
    const isVerticalCenter = verticalAlign === 'center';
    const isVerticalBottom = verticalAlign === 'bottom';

    const enter = cn({
        [containerTransitions.enterLeft]: isHorizontalStart,
        [containerTransitions.enterRight]: isHorizontalEnd,
    });

    const transitionProps: Partial<TransitionProps> = {
        appear: enter,
        enter,
        enterActive: containerTransitions.enterActive,
        appearActive: containerTransitions.enterActive,
        enterDone: containerTransitions.enterDone,
        exit: containerTransitions.exit,
        exitActive: cn({
            [containerTransitions.exitActiveLeft]: isHorizontalStart,
            [containerTransitions.exitActiveRight]: isHorizontalEnd,
        }),
    };

    return (
        <BaseModal
            {...restProps}
            open={open}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            scrollHandler='content'
            disableBlockingScroll={!overlay}
            wrapperClassName={cn({
                [styles.wrapperAlignStart]: isHorizontalStart,
                [styles.wrapperAlignEnd]: isHorizontalEnd,
                [styles.wrapperJustifyCenter]: isVerticalCenter,
                [styles.wrapperJustifyEnd]: isVerticalBottom,
            })}
            className={cn(className, styles.component, {
                [styles.overlayHidden]: !overlay,
            })}
            transitionProps={{
                classNames: transitionProps,
                timeout: 200,
            }}
            backdropProps={{
                transparent: !overlay,
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
