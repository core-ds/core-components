import React, {
    CSSProperties,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { use100vh } from 'react-div-100vh';
import { SwipeCallback, useSwipeable } from 'react-swipeable';
import { TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import { BaseModal, BaseModalProps } from '@alfalab/core-components-base-modal';

import { getDataTestId } from '../../utils';

import { Footer } from './components/footer/Component';
import { Header, HeaderProps } from './components/header/Component';
import { SwipeableBackdrop } from './components/swipeable-backdrop/Component';

import styles from './index.module.css';

export type BottomSheetTitleAlign = 'center' | 'left';

export type BottomSheetProps = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Управление видимостью
     */
    open: boolean;

    /**
     * Заголовок
     */
    title?: ReactNode;

    /**
     * Кнопка действия (обычно, это кнопка закрытия)
     */
    actionButton?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс
     */
    contentClassName?: string;

    /**
     * Дополнительные пропсы на контейнер.
     */
    containerProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Дополнительный класс
     */
    containerClassName?: string;

    /**
     * Дополнительный класс шапки
     */
    headerClassName?: string;

    /**
     * Дополнительный класс футера
     */
    footerClassName?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;

    /**
     * Дополнительный класс для компонента крестика
     */
    closerClassName?: string;

    /**
     * Дополнительный класс для компонента стрелки назад
     */
    backerClassName?: string;

    /**
     * Дополнительный класс для компонента модального окна
     */
    modalClassName?: string;

    /**
     * Дополнительный класс для обертки модального окна
     */
    modalWrapperClassName?: string;

    /**
     * TransitionProps, прокидываются в компонент CSSTransitionProps.
     */
    transitionProps?: Partial<TransitionProps>;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Будет ли свайпаться шторка
     * @default true
     */
    swipeable?: boolean;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: boolean;

    /**
     * Наличие компонента стрелки назад
     */
    hasBacker?: boolean;

    /**
     * Выравнивание заголовка
     */
    titleAlign?: BottomSheetTitleAlign;

    /**
     * Фиксирует шапку
     */
    stickyHeader?: boolean;

    /**
     * Фиксирует футер
     */
    stickyFooter?: boolean;

    /**
     * Высота шторки
     */
    initialHeight?: 'default' | 'full';

    /**
     * Будет ли виден оверлэй
     */
    hideOverlay?: boolean;

    /**
     * Будет ли видна шапка
     */
    hideHeader?: boolean;

    /**
     * Будет ли обрезан заголовок
     */
    trimTitle?: boolean;

    /**
     * Запретить закрытие шторки кликом на оверлэй
     */
    disableOverlayClick?: boolean;

    /**
     * Отключает блокировку скролла при открытии модального окна
     */
    disableBlockingScroll?: boolean;

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Не анимировать шторку при изменении размера вьюпорта
     */
    ignoreScreenChange?: boolean;

    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: BaseModalProps['backdropProps'];

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: () => Element;

    /**
     * Обработчик закрытия
     */
    onClose: () => void;

    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;
};

const TIMEOUT = 300;
const SWIPE_CLOSE_VELOCITY = 0.4;
const MIN_BACKDROP_OPACITY = 0.2;
const HEADER_HEIGHT = 56;
const MARKET_HEIGHT = 24;

/* Верхний отступ шторки, если она открыта на максимальную высоту */
export const HEADER_OFFSET = 24;
export const CLOSE_OFFSET = 0.2;

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
    (
        {
            open,
            title,
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
            hideHeader,
            disableOverlayClick,
            disableBlockingScroll,
            children,
            zIndex,
            transitionProps = {},
            dataTestId,
            swipeable = true,
            backdropProps,
            container,
            onClose,
            onBack,
        },
        ref,
    ) => {
        const [sheetOffset, setSheetOffset] = useState(0);
        const [backdropOpacity, setBackdropOpacity] = useState(1);
        const [scrollLocked, setScrollLocked] = useState(false);

        const sheetHeight = useRef(0);
        const scrollableContainer = useRef<HTMLDivElement | null>(null);
        const scrollableContainerScrollValue = useRef(0);

        const emptyHeader = !hasCloser && !hasBacker && !leftAddons && !rightAddons && !title;

        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const fullHeight = use100vh()!;
        const targetHeight = `${fullHeight - HEADER_OFFSET}px`;

        const headerProps: HeaderProps = {
            title,
            headerClassName,
            addonClassName,
            closerClassName,
            backerClassName,
            leftAddons,
            rightAddons,
            bottomAddons,
            hasCloser,
            hasBacker,
            titleAlign,
            trimTitle,
            sticky: stickyHeader,
            dataTestId: getDataTestId(dataTestId, 'header'),
            onBack,
        };

        const getBackdropOpacity = (offset: number): number => {
            if (sheetHeight.current === 0) return MIN_BACKDROP_OPACITY;

            const opacity = 1 - (1 - MIN_BACKDROP_OPACITY) * (offset / sheetHeight.current);

            return Number(opacity.toFixed(2));
        };

        const getSheetOffset = (deltaY: number): number => {
            let offset = deltaY > 0 ? 0 : -deltaY;

            offset -= scrollableContainerScrollValue.current;

            return Math.floor(Math.max(0, offset));
        };

        /**
         * Если контент внутри шторки скроллится - то шторка не должна свайпаться
         * Если шапка внутри шторки зафиксирована - то шторка должна свайпаться только в области шапки
         */
        const shouldSkipSwiping = (offsetY: number) => {
            if (!swipeable) return true;

            if (
                !scrollableContainer.current ||
                (stickyHeader && offsetY <= HEADER_HEIGHT + HEADER_OFFSET) ||
                (!stickyHeader && offsetY <= MARKET_HEIGHT + HEADER_OFFSET)
            ) {
                return false;
            }

            if (!scrollableContainerScrollValue.current) {
                scrollableContainerScrollValue.current = Math.floor(
                    scrollableContainer.current.scrollTop,
                );
            }

            return scrollableContainer.current.scrollTop > 0;
        };

        const handleBackdropSwipedDown: SwipeCallback = ({ velocity }) => {
            if (velocity > SWIPE_CLOSE_VELOCITY) {
                onClose();
            }
        };

        const handleSheetSwipedDown: SwipeCallback = ({ velocity, initial }) => {
            const offsetY = initial[1];

            if (shouldSkipSwiping(offsetY)) {
                return;
            }

            const shouldClose =
                sheetOffset > sheetHeight.current * CLOSE_OFFSET || velocity > SWIPE_CLOSE_VELOCITY;

            if (shouldClose) {
                onClose();
            } else {
                setSheetOffset(0);
                setBackdropOpacity(1);
            }
        };

        const handleSheetSwiped: SwipeCallback = () => {
            setScrollLocked(false);
            scrollableContainerScrollValue.current = 0;
        };

        const handleSheetSwiping: SwipeCallback = ({ deltaY, initial }) => {
            const offsetY = initial[1];

            if (shouldSkipSwiping(offsetY)) {
                return;
            }

            const offset = getSheetOffset(deltaY);
            const opacity = getBackdropOpacity(offset);

            setSheetOffset(offset);
            setBackdropOpacity(opacity);

            /**
             * Если шторка начинает свайпаться, то блокируем скролл внутри нее
             */
            if (offset > 0) {
                setScrollLocked(true);
            }
        };

        const backdropSwipeablehandlers = useSwipeable({
            onSwipedDown: handleBackdropSwipedDown,
            delta: 100,
            trackMouse: swipeable,
        });

        const sheetSwipeablehandlers = useSwipeable({
            onSwiping: handleSheetSwiping,
            onSwipedDown: handleSheetSwipedDown,
            onSwiped: handleSheetSwiped,
            delta: 5,
            trackMouse: swipeable,
        });

        const handleExited = useCallback(
            (node: HTMLElement) => {
                setBackdropOpacity(1);

                if (transitionProps.onExited) {
                    transitionProps.onExited(node);
                }
            },
            [transitionProps],
        );

        const handleEntered = useCallback(
            (node: HTMLElement, isAppearing: boolean) => {
                if (!sheetHeight.current) {
                    sheetHeight.current = node.getBoundingClientRect().height;
                }

                setBackdropOpacity(1);

                if (transitionProps.onEntered) {
                    transitionProps.onEntered(node, isAppearing);
                }
            },
            [transitionProps],
        );

        useEffect(() => {
            if (!open) {
                setSheetOffset(0);
            }
        }, [open]);

        const getSwipeStyles = (): CSSProperties => ({
            transform: sheetOffset ? `translateY(${sheetOffset}px)` : '',
        });

        const getHeightStyles = (): CSSProperties => ({
            height: initialHeight === 'full' ? targetHeight : 'unset',
            maxHeight: targetHeight,
        });

        return (
            <BaseModal
                open={open}
                ref={ref}
                dataTestId={dataTestId}
                zIndex={zIndex}
                onClose={onClose}
                scrollHandler={scrollableContainer}
                Backdrop={SwipeableBackdrop}
                backdropProps={{
                    ...backdropProps,
                    opacity: backdropOpacity,
                    handlers: swipeable ? backdropSwipeablehandlers : false,
                    opacityTimeout: TIMEOUT,
                    invisible: initialHeight === 'full' ? false : hideOverlay,
                }}
                disableBackdropClick={hideOverlay ? true : disableOverlayClick}
                className={cn(styles.modal, modalClassName)}
                wrapperClassName={modalWrapperClassName}
                disableBlockingScroll={disableBlockingScroll}
                container={container}
                transitionProps={{
                    appear: true,
                    timeout: TIMEOUT,
                    classNames: styles,
                    ...transitionProps,
                    onExited: handleExited,
                    onEntered: handleEntered,
                }}
            >
                <div style={{ ...getHeightStyles() }}>
                    <div
                        className={cn(styles.component, className, {
                            [styles.withTransition]: !sheetOffset,
                        })}
                        style={{
                            ...getSwipeStyles(),
                            ...getHeightStyles(),
                        }}
                        {...sheetSwipeablehandlers}
                    >
                        <div
                            {...containerProps}
                            className={cn(
                                styles.scrollableContainer,
                                containerProps?.className,
                                containerClassName,
                                {
                                    [styles.scrollLocked]: scrollLocked,
                                },
                            )}
                            ref={scrollableContainer}
                        >
                            {swipeable && <div className={cn(styles.marker)} />}

                            {!hideHeader && !emptyHeader && <Header {...headerProps} />}

                            <div
                                className={cn(styles.content, contentClassName, {
                                    [styles.noHeader]: hideHeader || emptyHeader,
                                    [styles.noFooter]: !actionButton,
                                })}
                            >
                                {children}
                            </div>

                            {actionButton && (
                                <Footer sticky={stickyFooter} className={footerClassName}>
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
