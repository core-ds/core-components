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
import { getMarginValues } from '../../../utils/getMarginValues';

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

    const { right, left } = getMarginValues(margin);

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
            className={cn(className, styles.component, {
                [styles.overlayHidden]: !overlay,
            })}
            contentClassName={styles.content}
            transitionProps={{
                classNames: {},
                timeout: 200,
                onEnter: () => {
                    if (componentRef.current) {
                        if (isHorizontalStart) {
                            componentRef.current.style.transform = `translateX(calc(-100% - ${left}px))`;
                        }
                        if (isHorizontalEnd) {
                            componentRef.current.style.transform = `translateX(calc(100% + ${right}px))`;
                        }
                    }
                },
                onEntering: () => {
                    if (componentRef.current) {
                        componentRef.current.style.transform = 'translateX(0)';
                        componentRef.current.style.transition = 'transform 200ms ease-in';
                    }
                },
                onEntered: () => {
                    if (componentRef.current) {
                        componentRef.current.style.transform = 'translateX(0)';
                    }
                },
                onExit: () => {
                    if (componentRef.current) {
                        componentRef.current.style.transform = 'translateX(0)';
                    }
                },
                onExiting: () => {
                    if (componentRef.current) {
                        componentRef.current.style.transition = 'transform 200ms ease-out';

                        if (isHorizontalStart) {
                            componentRef.current.style.transform = `translateX(calc(-100% - ${left}px))`;
                        }

                        if (isHorizontalEnd) {
                            componentRef.current.style.transform = `translateX(calc(100% + ${right}px))`;
                        }
                    }
                },
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
