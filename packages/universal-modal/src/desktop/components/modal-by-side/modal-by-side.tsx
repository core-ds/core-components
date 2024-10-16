import React, { cloneElement, forwardRef, isValidElement, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Drawer } from '@alfalab/core-components-drawer';
import { isClient } from '@alfalab/core-components-shared';

import { SIZE_TO_CLASSNAME_MAP } from '../../../consts';
import { UniversalModalDesktopProps } from '../../types/props';
import { useModalHeight } from '../hooks/useModalHeight';
import { useModalMargin } from '../hooks/useModalMargin';
import { useModalWidth } from '../hooks/useModalWidth';

import styles from './modal-by-side.module.css';
import transitions from './transitions.desktop.module.css';

export const ModalBySide = forwardRef<HTMLDivElement, UniversalModalDesktopProps>((props, ref) => {
    const {
        horizontalAlign = 'center',
        verticalAlign = 'center',
        dataTestId,
        wrapperClassName,
        className,
        backdropProps,
        size = 500,
        width = 500,
        height = 'fullHeight',
        contentTransitionProps,
        children,
        margin = [12],
        overlay = true,
        ...restProps
    } = props;

    const modalRef = useRef<HTMLElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);

    const enterCn = cn({
        [transitions.enterRight]: horizontalAlign === 'right',
        [transitions.enterLeft]: horizontalAlign === 'left',
    });

    const exitCn = cn({
        [transitions.exitActiveRight]: horizontalAlign === 'right',
        [transitions.exitActiveLeft]: horizontalAlign === 'left',
    });

    useModalMargin(margin, restProps.open, componentRef);
    useModalWidth(width, restProps.open, componentRef);
    useModalHeight(height, restProps.open, componentRef);

    /**
     * устанавливает боковое модальное окно вертикально по центру
     * transform приводит к артефактам из-за CSSTransition, поэтому рассчитываем через высоту
     */
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

    if (horizontalAlign === 'right' || horizontalAlign === 'left') {
        return (
            <Drawer
                {...restProps}
                dataTestId={dataTestId}
                ref={mergeRefs([ref, modalRef])}
                componentRef={componentRef}
                placement={horizontalAlign}
                wrapperClassName={wrapperClassName}
                className={cn(
                    className,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    styles.hidden,
                    styles.component,
                    styles[horizontalAlign],
                    styles[verticalAlign],
                    {
                        [styles.overlayHidden]: !overlay,
                    },
                )}
                backdropProps={{
                    transparent: !overlay,
                }}
                contentTransitionProps={{
                    classNames: {
                        appear: enterCn,
                        enter: enterCn,
                        appearActive: transitions.enterActive,
                        enterActive: transitions.enterActive,
                        exit: transitions.exit,
                        exitActive: exitCn,
                        exitDone: exitCn,
                    },
                    ...contentTransitionProps,
                }}
                disableBlockingScroll={!overlay}
            >
                {React.Children.map(children, (child) =>
                    isValidElement(child) ? cloneElement(child, { size }) : child,
                )}
            </Drawer>
        );
    }

    return null;
});
