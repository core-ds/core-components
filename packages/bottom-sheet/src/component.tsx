import React, {
    CSSProperties,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { use100vh } from 'react-div-100vh';
import mergeRefs from 'react-merge-refs';
import { SwipeCallback, SwipeEventData, TapCallback, useSwipeable } from 'react-swipeable';
import { HandledEvents } from 'react-swipeable/es/types';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { fnUtils, getDataTestId, os } from '@alfalab/core-components-shared';

import { Footer } from './components/footer/Component';
import { Header, HeaderProps } from './components/header/Component';
import { SwipeableBackdrop } from './components/swipeable-backdrop/Component';
import { horizontalDirections } from './consts/swipeConsts';
import { ShouldSkipSwipingParams } from './types/swipeTypes';
import type { BottomSheetProps } from './types';
import {
    CLOSE_OFFSET,
    convertPercentToNumber,
    MARKER_HEIGHT,
    SCROLL_OFFSET,
    SWIPE_VELOCITY,
    TIMEOUT,
} from './utils';

import styles from './index.module.css';

const { isNil } = fnUtils;

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
    (
        {
            open,
            title,
            container,
            usePortal,
            backgroundColor,
            titleSize = 'default',
            subtitle,
            actionButton,
            contentClassName,
            containerClassName,
            containerProps,
            headerClassName,
            footerClassName,
            addonClassName,
            closerClassName,
            backerClassName,
            modalClassName,
            modalWrapperClassName,
            className,
            leftAddons,
            rightAddons,
            bottomAddons,
            hasCloser,
            hasBacker,
            titleAlign = 'left',
            trimTitle,
            stickyHeader,
            stickyFooter = true,
            initialHeight = 'default',
            hideOverlay,
            hideScrollbar,
            hideHeader,
            disableOverlayClick,
            disableBlockingScroll,
            disableFocusLock,
            children,
            zIndex,
            transitionProps = {},
            magneticAreas: magneticAreasProp,
            initialActiveAreaIndex,
            dataTestId,
            swipeable = true,
            swipeableContent = true,
            swipeThreshold = 5,
            scrollLocked: scrollLockedProp,
            backdropProps,
            scrollableContainerRef = () => null,
            bottomSheetInstanceRef,
            sheetContainerRef = () => null,
            headerOffset = 24,
            onClose,
            onBack,
            onMagnetize,
            onSwipeStart,
            onSwipeEnd,
            disableRestoreFocus,
            disableAutoFocus,
            disableEscapeKeyDown,
            keepMounted,
            onMagnetizeEnd,
            onOffsetChange,
            swipeableMarker,
            swipeableMarkerClassName,
            backButtonProps,
        },
        ref,
    ) => {
        const fullHeight = use100vh() || 0;
        // Хук use100vh рассчитывает высоту вьюпорта в useEffect, поэтому на первый рендер всегда возвращает null.
        const isFirstRender = fullHeight === 0;

        const magneticAreas = useMemo(() => {
            if (magneticAreasProp) {
                return magneticAreasProp.map((area) =>
                    convertPercentToNumber(area, fullHeight, headerOffset),
                );
            }

            const iOSViewHeight = document?.documentElement?.clientHeight || window.innerHeight;
            const viewHeight = os.isIOS() ? iOSViewHeight : fullHeight;

            return [0, viewHeight - headerOffset];
        }, [fullHeight, headerOffset, magneticAreasProp]);

        const lastMagneticArea = magneticAreas[magneticAreas.length - 1];

        const [sheetOffset, setSheetOffset] = useState(0);
        const [backdropOpacity, setBackdropOpacity] = useState(1);
        const [activeAreaIdx, setActiveAreaIdx] = useState(-1);

        const [swipingInProgress, setSwipingInProgress] = useState<boolean | null>(null);
        const scrollOccurred = useRef<boolean>(false);
        const headerRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const sheetHeight = useRef(0);
        const sheetRef = useRef<HTMLDivElement>(null);
        const scrollableContainer = useRef<HTMLDivElement | null>(null);

        const activeArea = magneticAreas[activeAreaIdx];
        const emptyHeader = !hasCloser && !leftAddons && !title && !hasBacker && !rightAddons;
        const titleIsReactElement = React.isValidElement(title);

        const headerProps: HeaderProps = {
            ...(titleIsReactElement
                ? { children: title }
                : { title: title ? title?.toString() : undefined }),
            scrollableParentRef: scrollableContainer,
            headerRef,
            headerOffset,
            className: headerClassName,
            addonClassName,
            closerClassName,
            backButtonClassName: backerClassName,
            leftAddons,
            rightAddons,
            bottomAddons,
            hasCloser,
            hasBackButton: hasBacker,
            align: titleAlign,
            trim: trimTitle,
            sticky: stickyHeader,
            dataTestId: getDataTestId(dataTestId, 'header'),
            onBack,
            titleSize,
            subtitle,
            onClose,
            backButtonProps,
        };

        const startSwiping = (event: HandledEvents) => {
            setSwipingInProgress((p) => {
                if (!p) onSwipeStart?.(event);

                return true;
            });
        };

        const stopSwiping = (event: HandledEvents | null) => {
            setSwipingInProgress((p) => {
                if (p) onSwipeEnd?.(event);

                return false;
            });
            scrollOccurred.current = false;
        };

        const getBackdropOpacity = (offset: number): number => {
            const canClose = magneticAreas[0] === 0;
            const secondArea = magneticAreas[1];
            const isSecondArea = secondArea === activeArea;

            if (canClose && isSecondArea && sheetOffset > lastMagneticArea - secondArea) {
                const opacity = 1 - (offset - (lastMagneticArea - secondArea)) / secondArea;

                return Math.max(0, Number(opacity.toFixed(2)));
            }

            return 1;
        };

        const getSheetOffset = (deltaY: number): number => {
            let offset = lastMagneticArea - activeArea + deltaY;
            const maxOffset = magneticAreas[0] === 0 ? 0 : lastMagneticArea - magneticAreas[0];

            if (maxOffset) {
                offset = Math.min(maxOffset, offset);
            }

            return Math.max(0, Math.round(offset));
        };

        const getActiveAreaIndex = (area?: number) => magneticAreas.findIndex((a) => a === area);

        const setSheetHeight = () => {
            if (sheetRef.current) {
                sheetHeight.current = sheetRef.current.getBoundingClientRect().height - sheetOffset;
            }
        };

        const handleTransitionEnd = (event: React.TransitionEvent) => {
            setSheetHeight();

            if (event.propertyName === 'transform' && event.target === event.currentTarget) {
                onMagnetizeEnd?.(getActiveAreaIndex(activeArea));
            }
        };

        const scrollToArea = (idx: number) => {
            stopSwiping(null);
            const nextArea = magneticAreas[idx];
            const nextAreaIdx = getActiveAreaIndex(nextArea);

            if (nextArea === 0) {
                onClose();

                return;
            }

            if (nextAreaIdx !== -1) {
                setActiveAreaIdx(nextAreaIdx);
                setSheetOffset(lastMagneticArea - nextArea);
                onMagnetize?.(nextAreaIdx);
            }
        };

        const magnetize = (velocity: number, deltaY: number) => {
            const shouldMagnetizeDownByVelocity = deltaY >= 0 && velocity >= SWIPE_VELOCITY;
            const shouldMagnetizeUpByVelocity = deltaY < 0 && velocity >= SWIPE_VELOCITY;

            const updatePosition = (nextOffset: number, nextAreaIdx: number) => {
                setSheetOffset(nextOffset);
                setActiveAreaIdx((prevState) => (nextAreaIdx === -1 ? prevState : nextAreaIdx));

                if (nextAreaIdx !== -1) {
                    onMagnetize?.(nextAreaIdx);

                    // Если nextOffset == offset, то onTransitionEnd не отработает и onMagnetizeEnd не вызовется
                    if (sheetOffset === nextOffset) {
                        onMagnetizeEnd?.(nextAreaIdx);
                        setSheetHeight();
                    }
                }
            };

            if (shouldMagnetizeDownByVelocity) {
                const nextArea = magneticAreas
                    .slice()
                    .reverse()
                    .find((area) => area < activeArea);

                if (nextArea === 0) {
                    onClose();

                    return;
                }

                const nextOffset = nextArea
                    ? lastMagneticArea - nextArea
                    : lastMagneticArea - activeArea;
                const nextAreaIdx = getActiveAreaIndex(nextArea);

                updatePosition(nextOffset, nextAreaIdx);

                return;
            }

            if (shouldMagnetizeUpByVelocity) {
                const nextArea = magneticAreas.find((area) => area > activeArea);
                const nextAreaIdx = getActiveAreaIndex(nextArea);
                const nextOffset = nextArea ? lastMagneticArea - nextArea : 0;

                updatePosition(nextOffset, nextAreaIdx);

                return;
            }

            const offset = getSheetOffset(deltaY);
            const currentSheetHeight = lastMagneticArea - offset;
            const secondArea = magneticAreas[1];
            const isSecondArea = activeArea === secondArea;
            const canClose = magneticAreas[0] === 0 && deltaY >= 0;
            const shouldCloseByOffset =
                isSecondArea && canClose && 1 - currentSheetHeight / activeArea > CLOSE_OFFSET;

            if (shouldCloseByOffset) {
                onClose();

                return;
            }

            const { nearestArea } = magneticAreas.reduceRight(
                (res, area) => {
                    if (Math.abs(area - currentSheetHeight) < res.minOffset) {
                        res.minOffset = area - currentSheetHeight;
                        res.nearestArea = area;
                    }

                    return res;
                },
                {
                    nearestArea: lastMagneticArea,
                    minOffset: lastMagneticArea,
                },
            );

            if (nearestArea === 0) {
                onClose();
            } else {
                const nextOffset = lastMagneticArea - nearestArea;
                const nextAreaIdx = getActiveAreaIndex(nearestArea);

                setBackdropOpacity(1);
                updatePosition(nextOffset, nextAreaIdx);
            }
        };

        /**
         * Если контент внутри шторки скроллится - то шторка не должна свайпаться
         * Если шапка внутри шторки зафиксирована - то шторка должна свайпаться только в области шапки
         */
        const shouldSkipSwiping = (swipeParams: ShouldSkipSwipingParams) => {
            const { deltaY, startY, event, dir } = swipeParams;

            if (scrollLockedProp || swipingInProgress) return false;

            if (!swipeableContent && contentRef.current?.contains(event.target as HTMLElement)) {
                return true;
            }

            const scrollableNode = scrollableContainer.current;
            // Точка верхней границы (y координата)
            const bottomSheetTopY = fullHeight - sheetHeight.current;

            if (
                !scrollableNode ||
                (!stickyHeader && Math.abs(bottomSheetTopY - startY) <= MARKER_HEIGHT) ||
                (stickyHeader &&
                    headerRef.current &&
                    Math.abs(bottomSheetTopY - startY) <= headerRef.current.clientHeight)
            ) {
                return false;
            }

            const shouldScroll =
                deltaY >= 0
                    ? scrollableNode.scrollTop > 0
                    : scrollableNode.scrollHeight -
                          scrollableNode.scrollTop -
                          scrollableNode.clientHeight >
                      SCROLL_OFFSET;

            if (!scrollOccurred.current && shouldScroll) {
                scrollOccurred.current = true;
            }

            // Если контент внутри шторки скроллится горизонально - то шторка не должна закрываться
            if (horizontalDirections.includes(dir)) {
                return true;
            }

            return shouldScroll;
        };

        const handleSheetSwipeEnd: SwipeCallback = (swipeParams: SwipeEventData) => {
            const { initial, velocity, deltaY, event, dir } = swipeParams;
            const shouldPreventSwipe =
                scrollOccurred.current ||
                shouldSkipSwiping({ deltaY, startY: initial[1], event, dir });

            if (shouldPreventSwipe) {
                return;
            }

            magnetize(velocity, deltaY);
        };

        const handleSheetSwipeStart: SwipeCallback = (swipeParams: SwipeEventData) => {
            const { deltaY, initial, event, dir } = swipeParams;

            if (shouldSkipSwiping({ deltaY, startY: initial[1], event, dir })) {
                return;
            }

            startSwiping(event);
        };

        const handleTouchEnd: TapCallback = ({ event }) => stopSwiping(event);

        const handleSheetSwipeMove: SwipeCallback = (swipeParams: SwipeEventData) => {
            const { initial, deltaY, event, dir } = swipeParams;
            const shouldPreventSwipe =
                scrollOccurred.current ||
                shouldSkipSwiping({ deltaY, startY: initial[1], event, dir });

            if (shouldPreventSwipe) {
                return;
            }

            if (!swipingInProgress) {
                startSwiping(event);
            }

            const offset = getSheetOffset(deltaY);
            const opacity = getBackdropOpacity(offset);

            setSheetOffset(offset);
            setBackdropOpacity(opacity);
        };

        const sheetSwipeableHandlers = useSwipeable({
            onSwipeStart: handleSheetSwipeStart,
            onSwiping: handleSheetSwipeMove,
            onSwiped: handleSheetSwipeEnd,
            onTouchEndOrOnMouseUp: handleTouchEnd,
            trackMouse: swipeable,
            trackTouch: swipeable,
            delta: swipeThreshold,
        });

        const handleExited = (node: HTMLElement) => {
            const idx = initialActiveAreaIndex as number;

            setBackdropOpacity(1);
            setSheetOffset(isNil(idx) ? magneticAreas[0] : lastMagneticArea - magneticAreas[idx]);
            setActiveAreaIdx(isNil(idx) ? magneticAreas.length - 1 : idx);
            onMagnetizeEnd?.(0);
            if (transitionProps.onExited) {
                transitionProps.onExited(node);
            }
        };

        const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
            onMagnetize?.(initialActiveAreaIndex ?? magneticAreas.length - 1);

            if (transitionProps.onEnter) {
                transitionProps.onEnter(node, isAppearing);
            }
        };

        const handleExit = (node: HTMLElement) => {
            onMagnetize?.(0);

            if (transitionProps.onExit) {
                transitionProps.onExit(node);
            }
        };

        const handleEntered = (node: HTMLElement, isAppearing: boolean) => {
            setBackdropOpacity(1);
            setSheetHeight();
            // Ready for swiping
            setSwipingInProgress(false);
            onMagnetizeEnd?.(getActiveAreaIndex(activeArea));

            if (transitionProps.onEntered) {
                transitionProps.onEntered(node, isAppearing);
            }
        };

        useEffect(() => {
            if (!isFirstRender) {
                // Инициализируем стейт только после того, как была рассчитана высота вьюпорта
                if (activeAreaIdx === -1) {
                    const idx = initialActiveAreaIndex as number;

                    setSheetOffset(isNil(idx) ? 0 : lastMagneticArea - magneticAreas[idx]);
                    setActiveAreaIdx(isNil(idx) ? magneticAreas.length - 1 : idx);
                } else {
                    setSheetOffset(activeArea ? lastMagneticArea - activeArea : 0);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isFirstRender, magneticAreas, lastMagneticArea]);

        useEffect(() => {
            if (!sheetRef.current) return;

            const maxOffset = fullHeight - headerOffset;

            const offset = open ? sheetOffset : maxOffset;

            const percent = (offset / maxOffset) * 100;

            onOffsetChange?.(offset, percent);
        }, [fullHeight, headerOffset, onOffsetChange, open, sheetOffset]);

        useImperativeHandle(bottomSheetInstanceRef, () => ({
            scrollToArea,
        }));

        const getSwipeStyles = (): CSSProperties =>
            sheetOffset ? { transform: `translateY(${sheetOffset}px)` } : {};

        const getHeightStyles = (): CSSProperties => ({
            height:
                !isFirstRender && (initialHeight === 'full' || magneticAreasProp)
                    ? `${lastMagneticArea}px`
                    : 'unset',
            maxHeight: isFirstRender ? 0 : `${lastMagneticArea}px`,
        });

        const renderMarker = () => {
            if (swipeable) {
                if (swipeableMarker) {
                    return (
                        <div className={cn(styles.marker, swipeableMarkerClassName)}>
                            {swipeableMarker}
                        </div>
                    );
                }

                return (
                    <div
                        className={cn(
                            styles.marker,
                            styles.defaultMarker,
                            swipeableMarkerClassName,
                        )}
                    />
                );
            }

            return null;
        };

        const bgClassName = backgroundColor && styles[`background-${backgroundColor}`];

        return (
            <BaseModal
                open={open}
                ref={ref}
                container={container}
                dataTestId={dataTestId}
                zIndex={zIndex}
                onClose={onClose}
                usePortal={usePortal}
                scrollHandler={scrollableContainer}
                Backdrop={SwipeableBackdrop}
                backdropProps={{
                    ...backdropProps,
                    className: styles.disabledPointerEvents,
                    opacity: backdropOpacity,
                    opacityTimeout: TIMEOUT,
                    invisible: hideOverlay,
                }}
                disableBackdropClick={hideOverlay ? true : disableOverlayClick}
                className={cn(styles.modal, modalClassName)}
                wrapperClassName={cn(modalWrapperClassName, {
                    [styles.disabledPointerEvents]: hideOverlay,
                })}
                disableBlockingScroll={disableBlockingScroll}
                disableFocusLock={disableFocusLock}
                transitionProps={{
                    appear: true,
                    timeout: TIMEOUT,
                    classNames: styles,
                    ...transitionProps,
                    onExited: handleExited,
                    onEntered: handleEntered,
                    onEnter: handleEnter,
                    onExit: handleExit,
                }}
                disableAutoFocus={disableAutoFocus}
                disableEscapeKeyDown={disableEscapeKeyDown}
                disableRestoreFocus={disableRestoreFocus}
                keepMounted={keepMounted}
            >
                <div
                    className={cn(styles.wrapper, {
                        [styles.fullscreen]: headerOffset === 0 && sheetOffset === 0,
                    })}
                    onTransitionEnd={setSheetHeight}
                >
                    <div
                        className={cn(styles.component, bgClassName, className, {
                            [styles.withTransition]: swipingInProgress === false,
                            [styles.safeAreaBottom]: os.isIOS(),
                        })}
                        style={{
                            ...getSwipeStyles(),
                            ...getHeightStyles(),
                        }}
                        {...sheetSwipeableHandlers}
                        ref={mergeRefs([sheetRef, sheetContainerRef, sheetSwipeableHandlers.ref])}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {renderMarker()}
                        <div
                            {...containerProps}
                            className={cn(
                                styles.scrollableContainer,
                                containerProps?.className,
                                containerClassName,
                                {
                                    [styles.scrollLocked]: scrollLockedProp || swipingInProgress,
                                    [styles.hiddenScrollbar]: hideScrollbar,
                                },
                            )}
                            ref={mergeRefs([scrollableContainer, scrollableContainerRef])}
                        >
                            {!hideHeader && !emptyHeader && <Header {...headerProps} />}

                            <div
                                ref={contentRef}
                                className={cn(styles.content, contentClassName, {
                                    [styles.noHeader]: hideHeader || emptyHeader,
                                    [styles.noFooter]: !actionButton,
                                })}
                                data-test-id={getDataTestId(dataTestId, 'content')}
                            >
                                {children}
                            </div>

                            {actionButton && (
                                <Footer
                                    sticky={stickyFooter}
                                    className={cn(bgClassName, footerClassName)}
                                    dataTestId={getDataTestId(dataTestId, 'footer')}
                                >
                                    {actionButton}
                                </Footer>
                            )}
                        </div>
                    </div>
                </div>
            </BaseModal>
        );
    },
);

BottomSheet.displayName = 'BottomSheet';
