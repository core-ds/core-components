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

import backdropTransitions from './backdrop-transitions.module.css';
import containerTransitions from './container-transitions.module.css';
import contentTransitions from './content-transitions.desktop.module.css';
import styles from './modal-by-side.module.css';

export const ModalBySide = forwardRef<HTMLDivElement, ModalBySideProps>((props, ref) => {
    const {
        horizontalAlign = 'center',
        verticalAlign = 'center',
        dataTestId,
        wrapperClassName,
        className,
        width = 500,
        height = 'fullHeight',
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

    const contentTransitionProps = {
        appear: contentTransitions.class,
        enter: contentTransitions.class,
        appearActive: contentTransitions.class,
        enterActive: contentTransitions.class,
        exit: contentTransitions.class,
        exitActive: contentTransitions.class,
    };

    const enterClassName = cn({
        [containerTransitions.enterRight]: horizontalAlign === 'end',
        [containerTransitions.enterLeft]: horizontalAlign === 'start',
    });

    const exitClassName = cn({
        [containerTransitions.exitActiveRight]: horizontalAlign === 'end',
        [containerTransitions.exitActiveLeft]: horizontalAlign === 'start',
    });

    const transitionProps = {
        enter: enterClassName,
        appear: enterClassName,
        enterActive: containerTransitions.enterActive,
        appearActive: containerTransitions.enterActive,
        exit: containerTransitions.exit,
        exitActive: exitClassName,
    };

    const backdropProps = {
        enter: backdropTransitions.backdropEnter,
        appear: backdropTransitions.backdropEnter,
        enterActive: backdropTransitions.backdropEnterActive,
        appearActive: backdropTransitions.backdropEnterActive,
        enterDone: backdropTransitions.backdropEnterDone,
        appearDone: backdropTransitions.backdropEnterDone,
        exit: backdropTransitions.backdropExit,
        exitActive: backdropTransitions.backdropExitActive,
        exitDone: backdropTransitions.backdropExitDone,
    };

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
                    transitionClassNames: backdropProps,
                    timeout: 200,
                    transparent: !overlay,
                }}
                contentTransitionProps={{
                    classNames: contentTransitionProps,
                    timeout: 200,
                }}
                transitionProps={{
                    classNames: transitionProps,
                    timeout: 200,
                }}
                disableBlockingScroll={!overlay}
                contentClassName={styles.drawerContent}
                onWheel={handleWheel}
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
