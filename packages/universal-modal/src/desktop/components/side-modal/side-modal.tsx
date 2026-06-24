import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { useScrollableContainerRef } from '../../hooks/use-scrollable-container-ref';
import { type UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getHeightStyle } from '../../utils/get-height-style';
import { getMarginStyles } from '../../utils/get-margin-styles';
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
        scrollableContainerRef: scrollableContainerRefProp,
        onClose,
        ...restProps
    } = props;
    const componentRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { handleWheel, scrollableContainerRef } = useScrollableContainerRef({
        overlay,
        refObject: scrollableContainerRefProp,
    });

    const {
        isFullSizeModal,
        componentTransitions: fullSizeModalContentTransitions,
        backdropTransitions: fullSizeModalBackdropTransitions,
    } = getFullSizeModalTransitions({ verticalAlign, width, height });

    const withoutOverlay = !overlay;

    return (
        <BaseModal
            {...restProps}
            springAnimation={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                restProps.springAnimation
                    ? {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          ...restProps.springAnimation,
                          springOptions: { stiffness: 320, damping: 28, mass: 1.5 },
                          enter: { translate: ['100% 0px', '0px 0px'] },
                          exit: { translate: ['0px 0px', '100% 0px'] },
                      }
                    : undefined
            }
            open={open}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            contentElementRef={contentRef}
            scrollHandler='content'
            scrollLock={overlay}
            wrapperClassName={cn(styles.wrapper, styles.baseModalContainer, {
                [styles.wrapperAlignStart]: horizontalAlign === 'start',
                [styles.wrapperAlignEnd]: horizontalAlign === 'end',
                [styles.wrapperJustifyCenter]: verticalAlign === 'center',
                [styles.wrapperJustifyEnd]: verticalAlign === 'bottom',
                [styles.withoutOverlay]: withoutOverlay,
            })}
            className={cn(styles.component, className, styles.baseModalComponent, {
                ...getMarginStyles({ styles, margin, height }),
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
                shouldRender: overlay,
                ...(isFullSizeModal && fullSizeModalBackdropTransitions),
                ...restProps.backdropProps,
            }}
            componentDivProps={{
                style: {
                    width: getWidthStyle(width, margin),
                    ...getHeightStyle(height, margin),
                },
            }}
            onWheel={handleWheel}
            onClose={onClose}
        >
            <ModalContent height={height} scrollableContainerRef={scrollableContainerRef}>
                {children}
            </ModalContent>
        </BaseModal>
    );
});
