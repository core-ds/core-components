import React, {
    forwardRef,
    Fragment,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { useSwipeable } from 'react-swipeable';
import cn from 'classnames';
import elementClosest from 'element-closest';

import { Portal } from '@alfalab/core-components-portal';
import { Stack, stackingOrder } from '@alfalab/core-components-stack';
import { ToastPlate, ToastPlateProps } from '@alfalab/core-components-toast-plate';

import { useClickOutside } from './utils';

import styles from './index.module.css';

export type NotificationProps = ToastPlateProps & {
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;

    /**
     * Отступ от верхнего края
     */
    offset?: number;

    /**
     * Время до закрытия компонента
     */
    autoCloseDelay?: number | null;

    /**
     * Использовать портал
     */
    usePortal?: boolean;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Обработчик события истечения времени до закрытия компонента
     */
    onCloseTimeout?: () => void;

    /**
     * Обработчик события наведения курсора на компонент
     */
    onMouseEnter?: (event?: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик события снятия курсора с компонента
     */
    onMouseLeave?: (event?: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик клика вне компонента
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickOutside?: (event?: MouseEvent<any>) => void;
};

const notificationClassNameSelector = `.${styles.notificationComponent}`;

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
    (
        {
            className,
            actionSectionClassName,
            children,
            visible,
            offset = 108,
            hasCloser = true,
            autoCloseDelay = 5000,
            usePortal = true,
            zIndex = stackingOrder.TOAST,
            style,
            onClose,
            onCloseTimeout,
            onMouseEnter,
            onMouseLeave,
            onClickOutside,
            ...restProps
        },
        ref,
    ) => {
        const notificationRef = useRef<HTMLDivElement>(null);
        const autoCloseTimeoutRef = useRef(0);
        const closeTimeoutRef = useRef(0);

        const [isClosing, setIsClosing] = useState(false);

        const startAutoCloseTimer = useCallback(() => {
            if (autoCloseDelay !== null) {
                autoCloseTimeoutRef.current = window.setTimeout(() => {
                    if (onCloseTimeout) {
                        onCloseTimeout();
                    }
                }, autoCloseDelay);
            }
        }, [autoCloseDelay, onCloseTimeout]);

        const stopAutoCloseTimer = useCallback(() => {
            clearTimeout(autoCloseTimeoutRef.current);
        }, []);

        useEffect(
            () => () => {
                clearTimeout(closeTimeoutRef.current);
            },
            [],
        );

        useEffect(() => {
            elementClosest(window);
        }, []);

        useEffect(() => {
            if (visible) {
                startAutoCloseTimer();
            }

            return () => {
                stopAutoCloseTimer();
            };
        }, [startAutoCloseTimer, stopAutoCloseTimer, visible]);

        const handleMouseEnter = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                stopAutoCloseTimer();

                if (onMouseEnter) {
                    onMouseEnter(event);
                }
            },
            [onMouseEnter, stopAutoCloseTimer],
        );

        const handleMouseLeave = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                stopAutoCloseTimer();
                startAutoCloseTimer();

                if (onMouseLeave) {
                    onMouseLeave(event);
                }
            },
            [onMouseLeave, startAutoCloseTimer, stopAutoCloseTimer],
        );

        const handleOutsideClick = useCallback(
            (event: React.MouseEvent | React.TouchEvent) => {
                const isTargetNotification = !!(event.target as Element).closest(
                    notificationClassNameSelector,
                );

                /*
                 * проверка isTargetNotification нужна для предотвращения срабатывания handleOutsideClick
                 * при клике на другие нотификации, если их несколько на странице
                 */
                if (onClickOutside && visible && !isTargetNotification) {
                    onClickOutside(event as React.MouseEvent);
                }
            },
            [onClickOutside, visible],
        );

        useClickOutside(notificationRef, handleOutsideClick);

        const swipeableHandlers = useSwipeable({
            onSwiped: ({ dir }) => {
                if (onClose && ['Left', 'Right', 'Up'].includes(dir)) {
                    setIsClosing(true);

                    closeTimeoutRef.current = window.setTimeout(() => {
                        setIsClosing(false);
                        onClose();
                    }, 100);
                }
            },
            delta: 100,
        });

        const Wrapper = usePortal ? Portal : Fragment;

        return (
            <Stack value={zIndex}>
                {(computedZIndex) => (
                    <Wrapper>
                        <div {...swipeableHandlers}>
                            <ToastPlate
                                className={cn(
                                    styles.notificationComponent,
                                    {
                                        [styles.isVisible]: visible,
                                        [styles.isClosing]: isClosing,
                                    },
                                    className,
                                )}
                                contentClassName={styles.toastContent}
                                actionSectionClassName={cn(
                                    actionSectionClassName,
                                    styles.actionSection,
                                )}
                                style={{
                                    top: offset,
                                    zIndex: computedZIndex,
                                    ...style,
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                ref={mergeRefs([ref, notificationRef])}
                                role={visible ? 'alert' : undefined}
                                hasCloser={hasCloser}
                                onClose={onClose}
                                {...restProps}
                            >
                                {children}
                            </ToastPlate>
                        </div>
                    </Wrapper>
                )}
            </Stack>
        );
    },
);
