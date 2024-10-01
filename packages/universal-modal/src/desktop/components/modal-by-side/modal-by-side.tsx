import React, { cloneElement, forwardRef, isValidElement, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Drawer } from '@alfalab/core-components-drawer';

import { SIZE_TO_CLASSNAME_MAP } from '../../../consts';
import { UniversalModalDesktopProps } from '../../types/props';
import { useHeight } from '../hooks/useHeight';
import { useWidth } from '../hooks/useWidth';

import { useCenterTop } from './hooks/useCenterTop';

import styles from './modal-by-side.module.css';
import transitions from './transitions.desktop.module.css';

export const ModalBySide = forwardRef<HTMLDivElement, UniversalModalDesktopProps>((props, ref) => {
    const {
        horizontalAlign = 'center',
        dataTestId,
        wrapperClassName,
        className,
        backdropProps,
        size = 500,
        width = 500,
        height = 'fullHeight',
        verticalAlign = 'center',
        contentTransitionProps,
        children,
        ...restProps
    } = props;

    const modalRef = useRef<HTMLElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);

    const enterCn = cn({
        [transitions.appearRight]: horizontalAlign === 'right',
        [transitions.appearLeft]: horizontalAlign === 'left',
    });

    const exitCn = cn({
        [transitions.exitActiveRight]: horizontalAlign === 'right',
        [transitions.exitActiveLeft]: horizontalAlign === 'left',
    });

    useWidth(width, restProps.open, componentRef);
    useHeight(height, restProps.open, componentRef);
    useCenterTop(verticalAlign, restProps.open, componentRef);

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
                )}
                backdropProps={backdropProps}
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
            >
                {React.Children.map(children, (child) =>
                    isValidElement(child) ? cloneElement(child, { size }) : child,
                )}
            </Drawer>
        );
    }

    return null;
});
