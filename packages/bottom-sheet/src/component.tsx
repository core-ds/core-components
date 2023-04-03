import React, {
    CSSProperties,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { use100vh } from 'react-div-100vh';
import mergeRefs from 'react-merge-refs';
import { SwipeCallback, SwipeDirections, useSwipeable } from 'react-swipeable';
import { TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import { BaseModal, BaseModalProps } from '@alfalab/core-components-base-modal';
import type { NavigationBarProps } from '@alfalab/core-components-navigation-bar';

import { BackgroundColorType } from '../../types';
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
     * Размер заголовка
     */
    titleSize?: NavigationBarProps['titleSize'];

    /**
     * Подзаголовок.
     */
    subtitle?: NavigationBarProps['subtitle'];

    /**
     * Кнопка действия (обычно, это кнопка закрытия)
     */
    actionButton?: ReactNode;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: BaseModalProps['container'];

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
     * Цвет фона
     */
    backgroundColor?: Extract<BackgroundColorType, 'primary' | 'secondary'>;

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
     * Скрыть скроллбар внутри шторки
     * @default false
     */
    hideScrollbar?: boolean;

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
     * Видимая высота шторки относительно высоты страницы.
     * Можно использовать значение в пикселях - 10 или 10px, либо в процентах - 10%.
     * Не может быть больше чем максимальная высота шторки
     */
    visibleHeight?: string | number;

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
     * Реф на контейнер, в котором происходит скролл
     */
    scrollableContainerRef?: RefObject<HTMLElement>;


    /**
     * Реф на контейнер, в котором находится шторка
     */
    sheetContainerRef?: RefObject<HTMLElement>;

    /**
     * Обработчик закрытия
     */
    onClose: () => void;

    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;

    /**
     * Магнитные области видимой высоты шторки.
     * Можно использовать значения в пикселях - `10` или `10px`, либо в процентах - `10%`.
     */
    magneticAreas?: Array<string | number>;

    /**
     * Значение, больше которого нужно игнорировать притягивание к самой верхней точке вне `magneticAreas`
     * при свайпе вверх
     * @default 20px
     */
    magneticThresholdUp?: (string | number);

    /**
     * Значение, меньше которого нужно игнорировать притягивание к самой верхней точке вне `magneticAreas`
     * при свайпе вниз
     * @default 80%
     */
    magneticThresholdDown?: (string | number);

    /**
     * Вызывается после притягивания к одной из `magneticAreas`
     * -1 если примагнитились не к области из magAreas
     */
    onMagnetic?: (index: number) => void;

    /**
     *  Ref-ы кнопок, при нажатии на которые надо игнорировать свайп.
     *  Нужно указывать, чтобы не моргала анимация при свайпе
     */
    ignoreSwipeRefs?: Array<RefObject<Element | null>>;
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
            container,
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
            visibleHeight: targetVisibleHeight,
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
            scrollableContainerRef = () => null,
            sheetContainerRef = () => null,
            onClose,
            onBack,
            magneticAreas: rawMagneticAreas = [],
            ignoreSwipeRefs = [],
            hideScrollbar = false,
            magneticThresholdUp = 20,
            magneticThresholdDown = '80%',
            onMagnetic,
        },
        ref,
    ) => {
        const [sheetOffset, setSheetOffset] = useState(0);
        const [backdropOpacity, setBackdropOpacity] = useState(1);
        const [scrollLocked, setScrollLocked] = useState(false);
        const [withTransition, setWithTransition] = useState(true);

        const modalRef = useRef<HTMLDivElement | null>(null);
        const scrollableContainer = useRef<HTMLDivElement | null>(null);
        const scrollableContainerScrollValue = useRef(0);
        const footerRef = useRef<HTMLDivElement | null>(null);
        const closerRef = useRef<HTMLButtonElement | null>(null);
        const backButtonRef = useRef<HTMLButtonElement | null>(null);

        const sheetWindowOffset = useRef(0);
        const sheetContainer = useRef<HTMLDivElement | null>(null);
        const sheetIsCaught = useRef<boolean>(false);
        const initialScrollY = useRef<number | null>(null);

        const emptyHeader = !hasCloser && !leftAddons && !title && !hasBacker && !rightAddons;

        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const fullHeight = use100vh()!;
        const targetHeight = `${fullHeight - HEADER_OFFSET}px`;

        const titleIsReactElement = React.isValidElement(title);

        const headerProps: HeaderProps = {
            ...(titleIsReactElement
                ? { children: title }
                : { title: title ? title?.toString() : undefined }),
            scrollableParentRef: scrollableContainer,
            className: headerClassName,
            addonClassName,
            closerClassName,
            closerRef,
            backButtonRef,
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
            if (hideOverlay) return (open && offset === 0) ? 1 : 0;

            const containerHeight = modalRef?.current?.getBoundingClientRect()?.height ?? 0;

            if (containerHeight === 0) return MIN_BACKDROP_OPACITY;

            const opacity = 1 - (1 - MIN_BACKDROP_OPACITY) * (offset / containerHeight);

            return Number(opacity.toFixed(2));
        };

        const getNumberFromVisibleHeight = useCallback(
            (vh: string | number): number => {
                let visibleHeightNumber = vh;

                if (typeof visibleHeightNumber === 'string') {
                    visibleHeightNumber = visibleHeightNumber.includes('%')
                        ? fullHeight * (Number(visibleHeightNumber.replace('%', '')) / 100)
                        : Number(visibleHeightNumber.replace('px', ''));
                }

                return visibleHeightNumber;
            },
            [fullHeight],
        );


        const getOffsetFromVisibleHeight = useCallback(
            (vh: number) => Math.floor(Math.max(0, (modalRef.current?.getBoundingClientRect()?.height ?? 0) - vh)),
            [],
        );

        const getSheetOffset = (deltaY: number): number => {
            const visibleHeight = fullHeight - sheetWindowOffset.current;
            const offset = getOffsetFromVisibleHeight(visibleHeight) + deltaY;

            return Math.floor(Math.max(0, offset));
        };

        /**
         * При блокировки скролла, нужно переместить позицию скролла в изначальное положение,
         * чтобы избежать лока свайпа шторки
         */
        const setScrollLock = (locked: boolean) => {
            if (scrollableContainer.current?.scrollTo && locked) {
                scrollableContainer.current.scrollTo(0, 0);
            }
            setScrollLocked(locked);
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
            // Игнорим свайп вниз, если пользователь нажал вне bottom-sheet или по кнопкам
            if (!sheetIsCaught.current) return;
            // Игнорим конечный свайп вниз, если включены rawMagneticAreas
            if (rawMagneticAreas.length > 0) return;

            if (shouldSkipSwiping(initial[1])) {
                return;
            }

            const containerHeight = modalRef?.current?.getBoundingClientRect()?.height ?? 0;
            const shouldClose =
                sheetOffset > containerHeight * CLOSE_OFFSET || velocity > SWIPE_CLOSE_VELOCITY;

            if (shouldClose) {
                onClose();
            } else {
                setSheetOffset(0);
                setBackdropOpacity(1);
            }
        };

        /**
         * Обрабатываем примагничивание
         */
        const getMagnetizeOffset = (direction: SwipeDirections): number | null => {
            if (rawMagneticAreas.length === 0) {
                if (direction === 'Up') {
                    return 0;
                }

                return null;
            }
            const magneticAreas = rawMagneticAreas.map((area) => getNumberFromVisibleHeight(area));
            const sheetContainerWindowTopOffset = sheetContainer.current?.getBoundingClientRect()?.y;

            // Игнорируем свайпы Вправо и Влево в верхнем положении
            if ((['Left', 'Right'].includes(direction) && sheetOffset === 0) || !sheetContainerWindowTopOffset) {
                return null;
            }

            // видимая высота контейнера = высота окна - отступ сверху
            const visibleHeight = fullHeight - sheetContainerWindowTopOffset;


            /* 1. Видимая высота возможно не входит в заданный промежуток */

            // если видимая высота bottom-sheet больше самой верхней точки последнего сегмента
            const gtThatUp = visibleHeight > magneticAreas[magneticAreas.length - 1];

            // если видимая высота bottom-sheet меньше самой нижней точки первого сегмента
            const ltThatDown = visibleHeight < magneticAreas[0];

            if (gtThatUp || ltThatDown) {

                // Индекс найденной magneticArea
                const targetIndex = gtThatUp ? magneticAreas.length - 1 : 0;

                /*
                 * найденная видимая высота,
                 * если верхняя точка bottom-sheet находится
                 * - выше самого верхнего сегмента
                 * - либо ниже самого нижнего
                 */
                const magnetizeArea = magneticAreas[targetIndex];

                const unmagnetize = direction === 'Up'
                    ? Math.abs(visibleHeight - magnetizeArea) > getNumberFromVisibleHeight(magneticThresholdUp)
                    : Math.abs(visibleHeight - magnetizeArea) < getNumberFromVisibleHeight(magneticThresholdDown);

                if ((direction === 'Up' && unmagnetize) || (direction === 'Down' && !unmagnetize)) {
                    onMagnetic?.(-1);

                    return 0;
                }

                onMagnetic?.(targetIndex);

                return getOffsetFromVisibleHeight(magnetizeArea);
            }


            /* 2. Видимая высота входит в заданный промежуток */

            /*
             * Ищем область в которую входит верняя точка bottom-sheet
             * берем magneticAreas по парам
             * пример [64, 103, 321] -> [64, 103], [103, 321]
             */
            for (let i = 0; i < magneticAreas.length - 1; i++) {
                /*
                 * так как мы идем от меньшего к большему,
                 * нижняя точка в сегменте у нас будет первое число в паре
                 * верхняя - второе
                 */
                const up = magneticAreas[i + 1];
                const down = magneticAreas[i];

                // если видимая высота bottom-sheet находится между точками сегмента
                if (visibleHeight >= down && visibleHeight <= up) {

                    // дальность visibleHeight до верхней точки
                    const distanceToUp = Math.abs(up - visibleHeight);

                    // дальность visibleHeight до нижней точки
                    const distanceToDown = Math.abs(down - visibleHeight);

                    onMagnetic?.(
                        // выбираем индекс той magneticArea, которая ближе к видимой высоте
                        distanceToUp > distanceToDown ? i : i + 1,
                    );

                    return getOffsetFromVisibleHeight(
                        // выбираем ту magneticArea, которая ближе к видимой высоте
                        distanceToUp > distanceToDown ? down : up,
                    );
                }
            }

            return null;
        };

        const handleSheetSwipeStart: SwipeCallback = ({ event }) => {
            sheetWindowOffset.current = sheetContainer.current?.getBoundingClientRect()?.y ?? 0;
            initialScrollY.current = null;

            if (sheetContainer.current !== null) {
                const mainEvent = event instanceof MouseEvent ? event : (event as TouchEvent).touches[0];
                const clickElements = document.elementsFromPoint(mainEvent.clientX, mainEvent.clientY);

                sheetIsCaught.current = clickElements.includes(sheetContainer.current);

                if (!sheetIsCaught.current) {
                    return;
                }

                const ignoreElements = [...ignoreSwipeRefs, footerRef];

                if (hasBacker) {
                    ignoreElements.push(backButtonRef);
                }

                if (hasCloser) {
                    ignoreElements.push(closerRef);
                }

                ignoreElements.forEach((ignoreRef) => {
                    const elementExists = ignoreRef.current ? clickElements.includes(ignoreRef.current) : false;

                    sheetIsCaught.current = sheetIsCaught.current && !elementExists;
                });

                if (sheetIsCaught.current) {
                    setWithTransition(false);
                }
            }
        };

        const handleSheetSwiping: SwipeCallback = ({ initial, event }) => {
            const Y = event instanceof MouseEvent ? event.clientY : (event as TouchEvent).touches[(event as TouchEvent).touches.length - 1].clientY;

            // Игнорим свайп, если свайп заблокирован или пользователь нажал вне bottom-sheet либо по кнопкам
            if (!sheetIsCaught.current || shouldSkipSwiping(initial[1])) return;

            /*
             * initial[1] не всегда равен initialScrollY.current
             * initialScrollY.current - это изначальный Y, когда свайп стал доступен
             * недоступен свайп может быть если внутри шторки у нас есть контейнер со скроллом
             */
            if (initialScrollY.current === null) {
                initialScrollY.current = Y;
            }

            // считаем собственную дельту Y
            const offset = getSheetOffset(Y - initialScrollY.current);
            const opacity = getBackdropOpacity(offset);

            setSheetOffset(offset);
            setBackdropOpacity(opacity);

            /**
             * Если шторка начинает свайпаться, то блокируем скролл внутри нее
             */
            if (offset > 0) {
                setScrollLock(true);
            }
        };

        const handleSheetSwiped: SwipeCallback = ({ dir, initial }) => {
            // Игнорим свайп, если свайп заблокирован или пользователь нажал вне bottom-sheet либо по кнопкам
            if (!sheetIsCaught.current || shouldSkipSwiping(initial[1])) return;

            setWithTransition(true);
            scrollableContainerScrollValue.current = 0;

            const offset = getMagnetizeOffset(dir);

            if (offset !== null) {
                const opacity = getBackdropOpacity(offset);

                setSheetOffset(offset);
                setBackdropOpacity(opacity);
            }
            setScrollLock(offset !== 0);
        };

        const backdropSwipeablehandlers = useSwipeable({
            onSwipedDown: handleBackdropSwipedDown,
            delta: 100,
            trackMouse: swipeable,
        });

        const sheetSwipeablehandlers = useSwipeable({
            onSwipeStart: handleSheetSwipeStart,
            onSwiping: handleSheetSwiping,
            onSwipedDown: handleSheetSwipedDown,
            onSwiped: handleSheetSwiped,
            delta: 5,
            trackMouse: swipeable,
        });

        const handleChangeVisibleHeight = useCallback(
            () => {
                if (!targetVisibleHeight) return;
                const offset = getOffsetFromVisibleHeight(
                    // Выставляем нужную видимую высоту
                    getNumberFromVisibleHeight(targetVisibleHeight),
                );
                const opacity = getBackdropOpacity(offset);

                setScrollLock(offset !== 0);
                setSheetOffset(offset);
                setBackdropOpacity(opacity);
            },
            [targetVisibleHeight, getOffsetFromVisibleHeight, getNumberFromVisibleHeight],
        );

        useEffect(() => {
            setWithTransition(true);
            setSheetOffset(0);
            setBackdropOpacity(hideOverlay ? (open ? 1 : 0) : 1);
            if (open) {
                // Ждем, пока появится шторка, иначе не отработает анимация
                setTimeout(handleChangeVisibleHeight);
            }
        }, [open, handleChangeVisibleHeight]);

        const getSwipeStyles = (): CSSProperties => ({
            transform: sheetOffset ? `translateY(${sheetOffset}px)` : '',
        });

        const getHeightStyles = (): CSSProperties => ({
            height: initialHeight === 'full' ? targetHeight : 'unset',
            maxHeight: targetHeight,
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
                scrollHandler={scrollableContainer}
                Backdrop={SwipeableBackdrop}
                backdropProps={{
                    ...backdropProps,
                    opacity: backdropOpacity,
                    handlers: swipeable ? backdropSwipeablehandlers : false,
                    opacityTimeout: TIMEOUT,
                    style: {
                        pointerEvents: hideOverlay ? 'none' : 'auto',
                    },
                }}
                wrapperStyle={{
                    pointerEvents: hideOverlay ? 'none' : 'auto',
                }}
                disableBackdropClick={ hideOverlay ? true : disableOverlayClick }
                className={ cn(styles.modal, styles.disabledPointerEvents, modalClassName) }
                wrapperClassName={ modalWrapperClassName }
                disableBlockingScroll={ disableBlockingScroll }
                transitionProps={ {
                    appear: true,
                    timeout: TIMEOUT,
                    classNames: styles,
                    ...transitionProps,
                }}
            >
                <div className={ styles.disabledPointerEvents } style={ { ...getHeightStyles() } } ref={ modalRef }>
                    <div
                        className={ cn(styles.component, bgClassName, styles.enabledPointerEvents, className, {
                            [styles.withTransition]: withTransition,
                        }) }
                        style={ {
                            ...getSwipeStyles(),
                            ...getHeightStyles(),
                        } }
                        { ...sheetSwipeablehandlers }
                        ref={ mergeRefs([sheetSwipeablehandlers.ref, sheetContainer, sheetContainerRef]) }
                    >
                        <div
                            { ...containerProps }
                            className={ cn(
                                styles.scrollableContainer,
                                styles.enabledPointerEvents,
                                containerProps?.className,
                                containerClassName,
                                {
                                    [styles.scrollLocked]: scrollLocked,
                                    [styles.withoutScrollbar]: hideScrollbar,
                                },
                            ) }
                            style={ { ...containerProps?.style } }
                            ref={ mergeRefs([scrollableContainer, scrollableContainerRef]) }
                        >
                            { swipeable && <div className={ cn(styles.marker, styles.disabledPointerEvents) } /> }

                            { !hideHeader && !emptyHeader && <Header { ...headerProps } /> }

                            <div
                                className={ cn(styles.content, contentClassName, {
                                    [styles.noHeader]: hideHeader || emptyHeader,
                                    [styles.noFooter]: !actionButton,
                                }) }
                            >
                                { children }
                            </div>

                            { actionButton && (
                                <Footer ref={ footerRef } sticky={ stickyFooter } className={ cn(bgClassName,footerClassName )}>
                                    { actionButton }
                                </Footer>
                            ) }
                        </div>
                    </div>
                </div>
            </BaseModal>
        );
    },
);
