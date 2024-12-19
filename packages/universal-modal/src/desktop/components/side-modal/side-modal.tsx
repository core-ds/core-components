import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalBySideProps } from '../../types/props';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

import styles from './side-modal.module.css';
import transitions from './transitions.module.css';

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

    useModalMargin({ margin, open, componentRef: contentRef, horizontalAlign, verticalAlign });
    useModalWidth(width, open, contentRef);
    useModalHeight(height, open, contentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';
    const isVerticalCenter = verticalAlign === 'center';
    const isVerticalBottom = verticalAlign === 'bottom';

    const enter = cn({
        [transitions.enterLeft]: isHorizontalStart,
        [transitions.enterRight]: isHorizontalEnd,
    });

    const transitionProps: Partial<TransitionProps> = {
        appear: enter,
        enter,
        appearActive: transitions.enterActive,
        enterActive: transitions.enterActive,
        enterDone: transitions.enterDone,
        exit: transitions.exit,
        exitActive: cn({
            [transitions.exitActiveLeft]: isHorizontalStart,
            [transitions.exitActiveRight]: isHorizontalEnd,
        }),
    };

    // главная обёртка компонента может содержать пустоты в виде отступов, необходимо закрывать мадалку при клике на них
    const handleContentOutsideClick = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (contentRef.current && !contentRef.current.contains(target)) {
                if (onClose) {
                    onClose();
                }
            }
        },
        [onClose],
    );

    useEffect(() => {
        const element = componentRef.current;

        if (element) {
            element.addEventListener('click', handleContentOutsideClick);
        }

        return () => {
            if (element) {
                element.removeEventListener('click', handleContentOutsideClick);
            }
        };
    }, [open, handleContentOutsideClick]);

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
            })}
            className={cn(className, styles.component, {
                [styles.componentAlignCenter]: isVerticalCenter,
                [styles.componentAlignEnd]: isVerticalBottom,
                [styles.overlayHidden]: !overlay,
            })}
            contentClassName={styles.content}
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
