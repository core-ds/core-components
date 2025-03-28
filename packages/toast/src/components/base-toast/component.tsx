import React, {
    forwardRef,
    MouseEventHandler,
    TouchEventHandler,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { Portal } from '@alfalab/core-components-portal';
import { noop } from '@alfalab/core-components-shared';
import { Stack } from '@alfalab/core-components-stack';
import { stackingOrder } from '@alfalab/core-components-stack-context';
import {
    ToastPlate as ToastPlateComponent,
    ToastPlateProps,
} from '@alfalab/core-components-toast-plate';
import { useClickOutside, usePrevious } from '@alfalab/hooks';

import styles from './index.module.css';

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};

export type BaseToastProps = ToastPlateProps &
    Pick<
        PopoverProps,
        | 'fallbackPlacements'
        | 'position'
        | 'open'
        | 'getPortalContainer'
        | 'preventFlip'
        | 'transition'
        | 'useAnchorWidth'
    > & {
        /**
         * Элемент, относительного которого появляется тост.
         * Если не передавать, тост будет позиционирован снизу экрана (position: fixed).
         */
        anchorElement?: HTMLElement | null;

        /**
         * Через сколько исчезнет компонент (ms).
         */
        autoCloseDelay?: number;

        /**
         * Отступ снизу (при fixed-позиционировании).
         */
        bottomOffset?: number;

        /**
         * z-index компонента
         */
        zIndex?: number;

        /**
         * Разрешить закрывать toast кликом вне компонента
         * @default true
         */
        closeWithClickOutside?: boolean;

        /**
         * Обработчик закрытия компонента.
         */
        onClose: () => void;

        /**
         * Плашка тоста.
         * По-дефолту рендерит компонент ToastPlate
         */
        ToastPlate?: typeof ToastPlateComponent;

        /**
         * Смещение поповера.
         * Если позиционирование top, bottom, то [x, y].
         * Если позиционирование left, right то [y, x].
         * Необходимо использовать вместе с anchorElement
         */
        offset?: [number, number];
    };

export const BaseToast = forwardRef<HTMLDivElement, BaseToastProps>(
    (
        {
            anchorElement,
            position,
            offset,
            open,
            autoCloseDelay = 3000,
            className,
            titleClassName,
            bottomOffset,
            style = {},
            block,
            zIndex = stackingOrder.TOAST,
            ToastPlate,
            onMouseEnter,
            onMouseLeave,
            onTouchStart,
            onClose,
            getPortalContainer,
            useAnchorWidth,
            closeWithClickOutside = true,
            fallbackPlacements,
            ...restProps
        },
        ref,
    ) => {
        const plateRef = useRef<HTMLDivElement>(null);
        const timerId = useRef(0);
        const prevOpen = usePrevious(open);

        const startTimer = useCallback(() => {
            clearTimeout(timerId.current);

            timerId.current = window.setTimeout(() => {
                onClose?.();
            }, autoCloseDelay);
        }, [autoCloseDelay, onClose]);

        const stopTimer = useCallback(() => {
            clearTimeout(timerId.current);
        }, []);

        const handleMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>(
            (event) => {
                stopTimer();

                if (onMouseEnter) {
                    onMouseEnter(event);
                }
            },
            [onMouseEnter, stopTimer],
        );

        const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>(
            (event) => {
                startTimer();

                if (onMouseLeave) {
                    onMouseLeave(event);
                }
            },
            [onMouseLeave, startTimer],
        );

        const handleTouchStart = useCallback<TouchEventHandler<HTMLDivElement>>(
            (event) => {
                stopTimer();

                if (onTouchStart) {
                    onTouchStart(event);
                }
            },
            [onTouchStart, stopTimer],
        );

        const handleClickOutside = useCallback(() => {
            onClose();
            stopTimer();
        }, [onClose, stopTimer]);

        useClickOutside(plateRef, closeWithClickOutside ? handleClickOutside : noop);

        useEffect(() => () => clearTimeout(timerId.current), []);

        useEffect(() => {
            if (open !== prevOpen && open) {
                startTimer();
            }
        }, [open, prevOpen, startTimer, stopTimer]);

        const props = {
            block,
            titleClassName: cn(titleClassName, styles.title),
            onClose,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onTouchStart: handleTouchStart,
            ref: mergeRefs([ref, plateRef]),
        };

        if (anchorElement) {
            return (
                <Popover
                    open={open}
                    anchorElement={anchorElement}
                    position={position}
                    offset={offset}
                    popperClassName={styles.popoverInner}
                    className={cn({ [styles.block]: block })}
                    getPortalContainer={getPortalContainer}
                    zIndex={zIndex}
                    useAnchorWidth={useAnchorWidth}
                    fallbackPlacements={fallbackPlacements}
                >
                    {ToastPlate ? (
                        <ToastPlate {...restProps} style={style} className={className} {...props} />
                    ) : null}
                </Popover>
            );
        }

        return (
            <Stack value={zIndex}>
                {(computedZIndex) => (
                    <Portal getPortalContainer={getPortalContainer}>
                        <CSSTransition
                            unmountOnExit={true}
                            in={open}
                            timeout={150}
                            nodeRef={plateRef}
                            classNames={CSS_TRANSITION_CLASS_NAMES}
                        >
                            {ToastPlate ? (
                                <ToastPlate
                                    {...restProps}
                                    className={cn(styles.fixed, styles.toastPlate, className)}
                                    style={{
                                        ...style,
                                        bottom: bottomOffset && `${bottomOffset}px`,
                                        zIndex: computedZIndex,
                                    }}
                                    {...props}
                                />
                            ) : null}
                        </CSSTransition>
                    </Portal>
                )}
            </Stack>
        );
    },
);
