import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { useSpringTransition } from '@alfalab/core-components-shared';

import { useScrollableContainerRef } from '../../hooks/use-scrollable-container-ref';
import { type UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getHeightStyle } from '../../utils/get-height-style';
import { getMarginStyles } from '../../utils/get-margin-styles';
import { getWidthStyle } from '../../utils/get-width-style';
import { ModalContent } from '../modal-content/modal-content';

import { getDefaultTransitionProps } from './get-default-transition-props';

import springStyles from '../../styles/transitions/spring.module.css';
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
                restProps.springAnimation
                    ? {
                          enter: {
                              translate: ['110% 0px', '0px 0px'],
                              springOptions: { stiffness: 260, damping: 32, mass: 1 },
                          },
                          exit: {
                              translate: ['0px 0px', '80px 0px'],
                              springOptions: { stiffness: 153, damping: 25, mass: 1 },
                          },
                          hook: useSpringTransition,
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
                ...(restProps.springAnimation && {
                    timeout: {
                        enter: 500,
                        exit: 530,
                    },
                    className: springStyles.backdrop,
                    transitionClassNames: {
                        enter: springStyles.enter,
                        appear: springStyles.appear,
                        enterActive: springStyles.enterActive,
                        appearActive: springStyles.appearActive,
                        enterDone: springStyles.enterDone,
                        appearDone: springStyles.appearDone,
                        exit: springStyles.exit,
                        exitActive: springStyles.exitActive,
                        exitDone: springStyles.exitDone,
                    },
                }),
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
