import React, {
    CSSProperties,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    useRef,
    useState,
} from 'react';
import { SwipeCallback, useSwipeable } from 'react-swipeable';
import cn from 'classnames';

import { BaseModal, BaseModalProps } from '@alfalab/core-components-base-modal';
import { Closer } from '@alfalab/core-components-navigation-bar-private/shared';
import { createPaddingStyle, easingFns, getDataTestId } from '@alfalab/core-components-shared';

import { PaddingType } from '../../types';

import { PopupBackdrop } from './components/backdrop';

import styles from './index.module.css';

const SWIPE_VELOCITY = 0.3;
const CLOSE_OFFSET = 0.3;
const ANIMATION_DURATION = 350;

export type PopupSheetProps = Omit<BaseModalProps, 'onClose' | 'dataTestId'> & {
    /**
     * Наличие кнопки закрытия
     */
    hasCloser?: boolean;

    /**
     * Будет ли свайпаться шторка
     */
    swipeable?: boolean;

    /**
     * Отступы
     */
    padding?: PaddingType;

    /**
     * Обработчик закрытия
     */
    onClose?: (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
        reason?: 'backdropClick' | 'escapeKeyDown' | 'closerClick' | 'swipe',
    ) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для кнопки закрытия используется модификатор -closer
     */
    dataTestId?: string;
};

const DEFAULT_PADDING = 32;

export const PopupSheet = forwardRef<HTMLDivElement, PopupSheetProps>(
    (
        {
            children,
            hasCloser,
            className,
            onClose,
            transitionProps,
            contentProps,
            swipeable,
            dataTestId,
            backdropProps,
            padding = DEFAULT_PADDING,
            ...restProps
        },
        ref,
    ) => {
        const [sheetOffset, setSheetOffset] = useState(0);
        const [backdropOpacity, setBackdropOpacity] = useState(1);

        const sheetHeight = useRef(0);
        const sheetRef = useRef<HTMLDivElement>(null);
        const bySwipeCloseAnimation = useRef(false);

        const getSheetOffset = (deltaY: number): number => Math.max(0, deltaY);

        const getBackdropOpacity = (offset: number): number =>
            Math.max(0, 1 - offset / sheetHeight.current);

        const getSwipeStyles = (): CSSProperties =>
            sheetOffset ? { transform: `translateY(${sheetOffset}px)` } : {};

        const handleSwiping: SwipeCallback = ({ deltaY }) => {
            const offset = getSheetOffset(deltaY);

            setSheetOffset(offset);
            setBackdropOpacity(getBackdropOpacity(offset));
        };

        const handleSwiped: SwipeCallback = ({ deltaY, velocity, event }) => {
            const shouldCloseByVelocity = deltaY >= 0 && velocity >= SWIPE_VELOCITY;
            const shouldCloseByOffset = deltaY >= sheetHeight.current * CLOSE_OFFSET;

            const offset = sheetOffset;
            const animDuration = ANIMATION_DURATION / 2;
            let start: number;

            if (shouldCloseByVelocity || shouldCloseByOffset) {
                bySwipeCloseAnimation.current = true;
                onClose?.(event as MouseEvent<HTMLElement>, 'swipe');

                const runLoop = (timeStamp: number) => {
                    if (!start) start = timeStamp;
                    const elapsedTime = timeStamp - start;

                    if (elapsedTime <= animDuration) {
                        const nextOffset =
                            offset +
                            (sheetHeight.current - offset) *
                                easingFns.easeInOutQuad(elapsedTime / animDuration);

                        if (nextOffset > 0) {
                            setSheetOffset(nextOffset);
                        }
                        requestAnimationFrame(runLoop);
                    } else {
                        setSheetOffset(0);
                        bySwipeCloseAnimation.current = false;
                    }
                };

                requestAnimationFrame(runLoop);
            } else {
                const runLoop = (timeStamp: number) => {
                    if (!start) start = timeStamp;
                    const elapsedTime = timeStamp - start;

                    if (elapsedTime <= animDuration) {
                        const nextOffset =
                            offset - offset * easingFns.easeInOutQuad(elapsedTime / animDuration);

                        if (nextOffset > 0) {
                            setSheetOffset(nextOffset);
                            setBackdropOpacity(getBackdropOpacity(nextOffset));
                        }
                        requestAnimationFrame(runLoop);
                    } else {
                        setSheetOffset(0);
                        setBackdropOpacity(1);
                    }
                };

                requestAnimationFrame(runLoop);
            }
        };

        const handleEntered = (node: HTMLElement, isAppearing: boolean) => {
            bySwipeCloseAnimation.current = false;
            if (sheetRef.current) {
                sheetHeight.current = sheetRef.current.offsetHeight;
            }

            if (transitionProps?.onEntered) {
                transitionProps.onEntered(node, isAppearing);
            }
        };

        const handleExited = (node: HTMLElement) => {
            bySwipeCloseAnimation.current = false;
            setSheetOffset(0);
            setBackdropOpacity(1);

            if (transitionProps?.onExited) {
                transitionProps.onExited(node);
            }
        };

        const sheetSwipeableHandlers = useSwipeable({
            onSwiping: handleSwiping,
            onSwiped: handleSwiped,
            trackMouse: swipeable,
            trackTouch: swipeable,
            delta: 5,
        });

        return (
            <BaseModal
                {...restProps}
                onClose={onClose}
                ref={ref}
                className={cn(styles.component, className)}
                dataTestId={dataTestId}
                Backdrop={PopupBackdrop}
                backdropProps={{
                    ...backdropProps,
                    opacity: backdropOpacity,
                }}
                transitionProps={{
                    classNames: {
                        enter: styles.enter,
                        appear: styles.appear,
                        enterActive: styles.enterActive,
                        appearActive: styles.appearActive,
                        exit: bySwipeCloseAnimation.current ? styles.exitBySwipe : styles.exit,
                        exitActive: bySwipeCloseAnimation.current
                            ? styles.exitActiveBySwipe
                            : styles.exitActive,
                    },
                    timeout: ANIMATION_DURATION,
                    ...transitionProps,
                    onEntered: handleEntered,
                    onExited: handleExited,
                }}
                componentDivProps={{
                    ref: sheetRef,
                    style: getSwipeStyles(),
                }}
                contentProps={{
                    style: createPaddingStyle(padding),
                    ...contentProps,
                    ...sheetSwipeableHandlers,
                    className: cn(styles.content, contentProps?.className),
                }}
            >
                {hasCloser && (
                    <Closer
                        view='mobile'
                        className={styles.closer}
                        onClick={onClose}
                        dataTestId={getDataTestId(dataTestId, 'closer')}
                    />
                )}
                {children}
            </BaseModal>
        );
    },
);

PopupSheet.displayName = 'PopupSheet';
