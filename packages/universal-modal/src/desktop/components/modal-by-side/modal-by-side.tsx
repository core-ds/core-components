import React, { forwardRef, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Drawer } from '@alfalab/core-components-drawer';
import { isClient } from '@alfalab/core-components-shared';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalBySideProps } from '../../types/props';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

import styles from './modal-by-side.module.css';
import transitions from './transitions.desktop.module.css';

export const ModalBySide = forwardRef<HTMLDivElement, ModalBySideProps>((props, ref) => {
    const {
        horizontalAlign = 'center',
        verticalAlign = 'center',
        dataTestId,
        wrapperClassName,
        className,
        width = 500,
        height = 'fullHeight',
        contentTransitionProps,
        children,
        margin = [0],
        overlay = true,
        onClose,
        ...restProps
    } = props;

    const modalRef = useRef<HTMLElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);

    useModalMargin({ margin, open: restProps.open, componentRef, horizontalAlign, verticalAlign });
    useModalWidth(width, restProps.open, componentRef);

    useModalHeight(height, restProps.open, componentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const appearCn = cn({
        [transitions.appearLeft]: horizontalAlign === 'start',
        [transitions.appearRight]: horizontalAlign === 'end',
    });

    const enterCn = cn({
        [transitions.enterLeft]: horizontalAlign === 'start',
        [transitions.enterRight]: horizontalAlign === 'end',
    });

    const exitCn = cn({
        [transitions.exitActiveLeft]: horizontalAlign === 'start',
        [transitions.exitActiveRight]: horizontalAlign === 'end',
    });

    // устанавливает боковое модальное окно вертикально по центру
    useEffect(() => {
        if (verticalAlign === 'center' && height !== 'fullHeight' && componentRef.current) {
            const { offsetHeight } = componentRef.current;
            let computedMarginTop = '0';

            if (isClient()) {
                computedMarginTop = window.getComputedStyle(componentRef.current).marginTop;
            }

            componentRef.current.style.top = `calc(50% - ${
                offsetHeight / 2
            }px - ${computedMarginTop})`;
        }
    }, [restProps.open, verticalAlign, componentRef, height]);

    if (horizontalAlign === 'start' || horizontalAlign === 'end') {
        const placement = horizontalAlign === 'start' ? 'left' : 'right';

        return (
            <Drawer
                {...restProps}
                dataTestId={dataTestId}
                ref={mergeRefs([ref, modalRef])}
                componentRef={componentRef}
                placement={placement}
                wrapperClassName={wrapperClassName}
                className={cn(className, styles.component, styles[verticalAlign], {
                    [styles.horizontalLeft]: horizontalAlign === 'start',
                    [styles.horizontalRight]: horizontalAlign === 'end',
                    [styles.verticalBottom]: verticalAlign === 'bottom',
                    [styles.overlayHidden]: !overlay,
                })}
                backdropProps={{
                    transparent: !overlay,
                }}
                contentTransitionProps={{
                    classNames: {
                        appear: appearCn,
                        enter: enterCn,
                        appearActive: transitions.enterActive,
                        enterActive: transitions.enterActive,
                        exit: transitions.exit,
                        exitActive: exitCn,
                    },
                    ...contentTransitionProps,
                }}
                disableBlockingScroll={!overlay}
                contentClassName={styles.drawerContent}
                onWheel={handleWheel}
                transitionProps={{ timeout: 200 }}
                onClose={onClose}
            >
                <BaseUniversalModalContent wheelDeltaY={wheelDeltaY}>
                    {children}
                </BaseUniversalModalContent>
            </Drawer>
        );
    }

    return null;
});
