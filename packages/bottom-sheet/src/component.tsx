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
import { SwipeCallback, SwipeDirections, useSwipeable } from 'react-swipeable';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { getDataTestId } from '../../utils';

import { Footer } from './components/footer/Component';
import { Header, HeaderProps } from './components/header/Component';
import { SwipeableBackdrop } from './components/swipeable-backdrop/Component';
import type { BottomSheetProps } from './types';
import {
    CLOSE_OFFSET,
    convertPercentToNumber,
    HEADER_OFFSET,
    MARKER_HEIGHT,
    SCROLL_OFFSET,
    SWIPE_VELOCITY,
    TIMEOUT,
} from './utils';

import styles from './index.module.css';

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
            scrollLocked: scrollLockedProp,
            backdropProps,
            scrollableContainerRef = () => null,
            bottomSheetInstanceRef,
            sheetContainerRef = () => null,
            onClose,
            onBack,
            onMagnetize,
        },
        ref,
    ) => {
        const hasInitialIdx = initialActiveAreaIndex !== undefined;
        const fullHeight = use100vh() || 0;
        // Хук use100vh рассчитывает высоту вьюпорта в useEffect, поэтому на первый рендер всегда возвращает null.
        const isFirstRender = fullHeight === 0;

        const magneticAreas = useMemo(() => {
            if (magneticAreasProp) {
                return magneticAreasProp.map((area) => convertPercentToNumber(area, fullHeight));
            }

            return [0, fullHeight - HEADER_OFFSET];
        }, [fullHeight, magneticAreasProp]);

        const lastMagneticArea = magneticAreas[magneticAreas.length - 1];

        const [sheetOffset, setSheetOffset] = useState(0);
        const [backdropOpacity, setBackdropOpacity] = useState(1);
        const [activeArea, setActiveArea] = useState(0);

        const swipingInProgress = useRef<boolean | null>(null);
        const headerRef = useRef<HTMLDivElement>(null);
        const sheetHeight = useRef(0);
        const sheetRef = useRef<HTMLDivElement>(null);
        const scrollableContainer = useRef<HTMLDivElement | null>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        // Используется, чтобы вызвать ререндер при переключении фазы свайпа
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [swipePhase, setSwipePhase] = useState<string>();

        /**
         * Если перед спайпом был скролл, в момент начала свайпа deltaY будет содержать величину скролла, что
         * вызовет прыжок контента. Чтобы этого избежать, при начале свайпа запоминаем величину скролла и deltaY
         */
        const initialDeltaY = useRef<number>(0);

        const emptyHeader = !hasCloser && !leftAddons && !title && !hasBacker && !rightAddons;

        const titleIsReactElement = React.isValidElement(title);

        const headerProps: HeaderProps = {
            ...(titleIsReactElement
                ? { children: title }
                : { title: title ? title?.toString() : undefined }),
            scrollableParentRef: scrollableContainer,
            headerRef,
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

        const scrollToArea = (idx: number) => {
            swipingInProgress.current = false;
            const nextArea = magneticAreas[idx];

            if (nextArea === 0) {
                onClose();

                return;
            }

            if (nextArea) {
                setActiveArea(nextArea);
                setSheetOffset(lastMagneticArea - nextArea);
            }
        };

        const magnetize = (dir: SwipeDirections, velocity: number, deltaY: number) => {
            const shouldMagnetizeDownByVelocity = dir === 'Down' && velocity >= SWIPE_VELOCITY;
            const shouldMagnetizeUpByVelocity = dir === 'Up' && velocity >= SWIPE_VELOCITY;

            if (shouldMagnetizeDownByVelocity) {
                const nextArea = magneticAreas
                    .slice()
                    .reverse()
                    .find((area) => area < activeArea);

                if (nextArea === 0) {
                    onClose();

                    return;
                }

                const offset = nextArea
                    ? lastMagneticArea - nextArea
                    : lastMagneticArea - activeArea;

                setSheetOffset(offset);
                setActiveArea((prevState) => nextArea ?? prevState);

                return;
            }

            if (shouldMagnetizeUpByVelocity) {
                const nextArea = magneticAreas.find((area) => area > activeArea);
                const offset = nextArea ? lastMagneticArea - nextArea : 0;

                setSheetOffset(offset);
                setActiveArea((prevState) => nextArea ?? prevState);

                return;
            }

            const offset = getSheetOffset(deltaY);
            const currentSheetHeight = lastMagneticArea - offset;
            const secondArea = magneticAreas[1];
            const isSecondArea = activeArea === secondArea;
            const canClose = magneticAreas[0] === 0 && dir === 'Down';
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
                setSheetOffset(lastMagneticArea - nearestArea);
                setActiveArea(nearestArea);
                setBackdropOpacity(1);
            }
        };

        /**
         * Если контент внутри шторки скроллится - то шторка не должна свайпаться
         * Если шапка внутри шторки зафиксирована - то шторка должна свайпаться только в области шапки
         */
        const shouldSkipSwiping = (dir: SwipeDirections, startY: number) => {
            if (!swipeable) return true;

            if (scrollLockedProp || swipingInProgress.current) return false;

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

            return dir === 'Down'
                ? scrollableNode.scrollTop > 0
                : scrollableNode.scrollHeight -
                      scrollableNode.scrollTop -
                      scrollableNode.clientHeight >
                      SCROLL_OFFSET;
        };

        const handleSheetSwipe: SwipeCallback = ({ dir, initial, velocity, deltaY }) => {
            setSwipePhase('swipe');
            if (shouldSkipSwiping(dir, initial[1])) {
                return;
            }

            magnetize(dir, velocity, deltaY);
        };

        const handleSheetSwipeStart: SwipeCallback = ({ dir, initial, deltaY }) => {
            setSwipePhase('start');

            initialDeltaY.current =
                dir === 'Down' ? (scrollableContainer.current?.scrollTop ?? 0) + deltaY : 0;

            if (shouldSkipSwiping(dir, initial[1])) {
                return;
            }

            swipingInProgress.current = true;
        };

        const handleSheetSwiped: SwipeCallback = () => {
            setSwipePhase('swiped');
            swipingInProgress.current = false;
        };

        const handleSheetSwiping: SwipeCallback = ({ initial, deltaY, dir, event }) => {
            setSwipePhase('swiping');

            if (shouldSkipSwiping(dir, initial[1])) {
                return;
            }

            swipingInProgress.current = true;

            // Учитываем начальный сдвиг, только если свайп начался внутри контента
            const respectInitialDeltaY =
                event.target === contentRef.current ||
                contentRef.current?.contains(event.target as HTMLElement);

            const offset = getSheetOffset(
                respectInitialDeltaY ? deltaY - Math.max(0, initialDeltaY.current) : deltaY,
            );

            const opacity = getBackdropOpacity(offset);

            setSheetOffset(offset);
            setBackdropOpacity(opacity);
        };

        const sheetSwipeableHandlers = useSwipeable({
            onSwipeStart: handleSheetSwipeStart,
            onSwiping: handleSheetSwiping,
            onSwipedDown: handleSheetSwipe,
            onSwipedUp: handleSheetSwipe,
            onSwiped: handleSheetSwiped,
            trackMouse: swipeable,
            delta: 5,
        });

        const handleExited = (node: HTMLElement) => {
            const idx = initialActiveAreaIndex as number;

            setBackdropOpacity(1);
            setSheetOffset(
                hasInitialIdx ? lastMagneticArea - magneticAreas[idx] : magneticAreas[0],
            );
            setActiveArea(hasInitialIdx ? magneticAreas[idx] : lastMagneticArea);

            if (transitionProps.onExited) {
                transitionProps.onExited(node);
            }
        };

        const handleEntered = (node: HTMLElement, isAppearing: boolean) => {
            setBackdropOpacity(1);
            setSheetHeight();
            // Ready for swiping
            swipingInProgress.current = false;

            if (transitionProps.onEntered) {
                transitionProps.onEntered(node, isAppearing);
            }
        };

        useEffect(() => {
            // Инициализируем стейт только после того, как была рассчитана высота вьюпорта.
            if (!isFirstRender) {
                setSheetOffset(
                    hasInitialIdx ? lastMagneticArea - magneticAreas[initialActiveAreaIndex] : 0,
                );

                setActiveArea(
                    hasInitialIdx ? magneticAreas[initialActiveAreaIndex] : lastMagneticArea,
                );
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isFirstRender]);

        useEffect(() => {
            onMagnetize?.(open ? getActiveAreaIndex(activeArea) : 0);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeArea, open]);

        useImperativeHandle(bottomSheetInstanceRef, () => ({
            scrollToArea,
        }));

        const getSwipeStyles = (): CSSProperties =>
            sheetOffset ? { transform: `translateY(${sheetOffset}px)` } : {};

        const getHeightStyles = (): CSSProperties => ({
            height: !isFirstRender && initialHeight === 'full' ? `${lastMagneticArea}px` : 'unset',
            maxHeight: isFirstRender ? 0 : `${lastMagneticArea}px`,
        });

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
                }}
            >
                <div
                    style={{ ...getHeightStyles() }}
                    className={styles.wrapper}
                    onTransitionEnd={setSheetHeight}
                >
                    <div
                        className={cn(styles.component, bgClassName, className, {
                            [styles.withTransition]: swipingInProgress.current === false,
                        })}
                        style={{
                            ...getSwipeStyles(),
                            ...getHeightStyles(),
                        }}
                        {...sheetSwipeableHandlers}
                        ref={mergeRefs([sheetRef, sheetContainerRef, sheetSwipeableHandlers.ref])}
                        onTransitionEnd={setSheetHeight}
                    >
                        <div
                            {...containerProps}
                            className={cn(
                                styles.scrollableContainer,
                                containerProps?.className,
                                containerClassName,
                                {
                                    [styles.scrollLocked]:
                                        scrollLockedProp || swipingInProgress.current,
                                    [styles.hiddenScrollbar]: hideScrollbar,
                                },
                            )}
                            ref={mergeRefs([scrollableContainer, scrollableContainerRef])}
                        >
                            {swipeable && <div className={cn(styles.marker)} />}

                            {!hideHeader && !emptyHeader && <Header {...headerProps} />}

                            <div
                                className={cn(styles.content, contentClassName, {
                                    [styles.noHeader]: hideHeader || emptyHeader,
                                    [styles.noFooter]: !actionButton,
                                })}
                                ref={contentRef}
                            >
                                {children}
                            </div>

                            {actionButton && (
                                <Footer
                                    sticky={stickyFooter}
                                    className={cn(bgClassName, footerClassName)}
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
