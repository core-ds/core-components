/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
    ComponentType,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
    ReactNode,
    Ref,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import FocusLock from 'react-focus-lock';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { Backdrop as DefaultBackdrop, BackdropProps } from '@alfalab/core-components-backdrop';
import { Portal, PortalProps } from '@alfalab/core-components-portal';
import { browser, os } from '@alfalab/core-components-shared';
import { Stack, stackingOrder } from '@alfalab/core-components-stack';

import { lockScroll, syncHeight, unlockScroll } from './helpers/lockScroll';
import {
    handleContainer,
    hasScrollbar,
    isScrolledToBottom,
    isScrolledToTop,
    restoreContainerStyles,
} from './utils';

import styles from './index.module.css';

// TODO Без полифила крашится FocusLock в IE11. Выпилить в будущем!!!.
import './matches-polyfill';

export type BaseModalProps = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Компонент бэкдропа
     */
    Backdrop?: ComponentType<BackdropProps>;

    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: Partial<BackdropProps> & Record<string, unknown>;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: PortalProps['getPortalContainer'];

    /**
     * Отключает автоматический перевод фокуса на модалку при открытии
     * @default false
     */
    disableAutoFocus?: boolean;

    /**
     * Отключает ловушку фокуса
     * @default false
     */
    disableFocusLock?: boolean;

    /**
     * Отключает восстановление фокуса на предыдущем элементе после закрытия модалки
     * @default false
     */
    disableRestoreFocus?: boolean;

    /**
     * Отключает вызов `callback` при нажатии Escape
     * @default false
     */
    disableEscapeKeyDown?: boolean;

    /**
     * Отключает вызов `callback` при клике на бэкдроп
     * @default false
     */
    disableBackdropClick?: boolean;

    /**
     * Отключает блокировку скролла при открытии модального окна
     * @default false
     */
    disableBlockingScroll?: boolean;

    /**
     * Содержимое модалки всегда в DOM
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс
     */
    contentClassName?: string;

    /**
     * Дополнительные пропсы на dialog wrapper
     */
    wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

    /**
     * Дополнительные пропсы на обертку контента
     */
    contentProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

    /**
     * Дополнительные пропсы на компонентную обертку контента
     */
    componentDivProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;

    /**
     * Дополнительный класс для обертки (Modal)
     */
    wrapperClassName?: string;

    /**
     * Обработчик скролла контента
     */
    scrollHandler?: 'wrapper' | 'content' | MutableRefObject<HTMLDivElement | null>;

    /**
     * Пропсы для анимации (CSSTransition)
     */
    transitionProps?: Partial<TransitionProps>;

    /**
     * Рендерить ли в контейнер через портал.
     * @default true
     */
    usePortal?: boolean;

    /**
     * Обработчик события нажатия на бэкдроп
     */
    onBackdropClick?: (event: MouseEvent) => void;

    /**
     * Обработчик события нажатия на Escape
     *
     * Если `disableEscapeKeyDown` - false и модальное окно в фокусе
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;

    /**
     * Обработчик закрытия
     */
    onClose?: (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
        reason?: 'backdropClick' | 'escapeKeyDown' | 'closerClick',
    ) => void;

    /**
     * Обработчик события onEntered компонента Transition
     */
    onMount?: () => void;

    /**
     * Обработчик события onExited компонента Transition
     */
    onUnmount?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Реф, который должен быть установлен компонентной области
     */
    componentRef?: MutableRefObject<HTMLDivElement | null>;

    /**
     * Блокирует скролл когда модальное окно открыто. Работает только на iOS.
     */
    iOSLock?: boolean;
};

export type BaseModalContext = {
    parentRef: React.RefObject<HTMLDivElement>;
    componentRef: React.RefObject<HTMLDivElement>;
    hasFooter?: boolean;
    hasHeader?: boolean;
    hasScroll?: boolean;
    headerHighlighted?: boolean;
    footerHighlighted?: boolean;
    headerOffset?: number;
    setHeaderOffset: (offset: number) => void;
    contentRef: Ref<HTMLElement>;
    setHasHeader: (exists: boolean) => void;
    setHasFooter: (exists: boolean) => void;
    onClose: Required<BaseModalProps>['onClose'];
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BaseModalContext = React.createContext<BaseModalContext>({
    parentRef: { current: null },
    componentRef: { current: null },
    hasFooter: false,
    hasHeader: false,
    hasScroll: false,
    headerHighlighted: false,
    footerHighlighted: false,
    headerOffset: 0,
    setHeaderOffset: () => null,
    contentRef: () => null,
    setHasHeader: () => null,
    setHasFooter: () => null,
    onClose: () => null,
});

export const BaseModal = forwardRef<HTMLDivElement, BaseModalProps>(
    (
        {
            open,
            container,
            children,
            scrollHandler = 'wrapper',
            Backdrop = DefaultBackdrop,
            backdropProps = {},
            transitionProps = {},
            disableBackdropClick,
            disableAutoFocus = false,
            disableFocusLock = false,
            disableEscapeKeyDown = false,
            disableRestoreFocus = false,
            disableBlockingScroll = false,
            keepMounted = false,
            className,
            contentClassName,
            wrapperProps,
            contentProps,
            componentDivProps,
            wrapperClassName,
            onBackdropClick,
            onClose,
            onEscapeKeyDown,
            onMount,
            onUnmount,
            dataTestId,
            zIndex = stackingOrder.MODAL,
            componentRef = null,
            usePortal = true,
            iOSLock = false,
        },
        ref,
    ) => {
        const [exited, setExited] = useState<boolean | null>(null);
        const [hasScroll, setHasScroll] = useState(false);
        const [hasHeader, setHasHeader] = useState(false);
        const [hasFooter, setHasFooter] = useState(false);
        const [headerHighlighted, setHeaderHighlighted] = useState(false);
        const [footerHighlighted, setFooterHighlighted] = useState(false);
        const [headerOffset, setHeaderOffset] = useState(0);

        const componentNodeRef = useRef<HTMLDivElement>(null);
        const wrapperRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
        const contentNodeRef = useRef<HTMLDivElement | null>(null);
        const restoreContainerStylesRef = useRef<null | (() => void)>(null);
        const mouseDownTarget = useRef<HTMLElement>();
        const resizeObserverRef = useRef<ResizeObserver>();

        const checkToHasScrollBar = () => {
            if (scrollableNodeRef.current) {
                const scrollExists = hasScrollbar(scrollableNodeRef.current);

                setFooterHighlighted(scrollExists);
                setHasScroll(scrollExists);
            }
        };

        const isExited = exited || exited === null;
        const shouldRender = keepMounted || open || !isExited;

        const getContainer = useCallback(
            () => (container ? container() : document.body) as HTMLElement,
            [container],
        );

        const addResizeHandle = useCallback(() => {
            if (!resizeObserverRef.current) return;

            if (scrollableNodeRef.current) {
                resizeObserverRef.current.observe(scrollableNodeRef.current);
            }
            if (contentNodeRef.current) {
                resizeObserverRef.current.observe(contentNodeRef.current);
            }
        }, []);

        const removeResizeHandle = useCallback(() => resizeObserverRef.current?.disconnect(), []);

        const contentRef = useCallback((node: HTMLDivElement) => {
            if (node !== null) {
                contentNodeRef.current = node;
                if (resizeObserverRef.current) {
                    resizeObserverRef.current.observe(node);
                }
                checkToHasScrollBar();
            }
        }, []);

        const handleScroll = useCallback(() => {
            if (!scrollableNodeRef.current || !componentNodeRef.current) return;

            if (hasHeader) {
                setHeaderHighlighted(
                    !isScrolledToTop(scrollableNodeRef.current) &&
                        componentNodeRef.current.getBoundingClientRect().top - headerOffset <= 1,
                );
            }

            if (hasFooter) {
                setFooterHighlighted(
                    !isScrolledToBottom(scrollableNodeRef.current) &&
                        componentNodeRef.current.getBoundingClientRect().bottom >=
                            window.innerHeight - 1,
                );
            }
        }, [hasFooter, hasHeader, headerOffset]);

        const handleClose = useCallback<Required<BaseModalProps>['onClose']>(
            (event, reason) => {
                if (iOSLock && os.isIOS()) {
                    unlockScroll();
                }

                if (onClose) {
                    onClose(event, reason);
                }

                if (reason === 'backdropClick' && onBackdropClick) {
                    onBackdropClick(event as MouseEvent);
                }

                if (reason === 'escapeKeyDown' && onEscapeKeyDown) {
                    onEscapeKeyDown(event as KeyboardEvent);
                }

                return null;
            },
            [onBackdropClick, onClose, onEscapeKeyDown, iOSLock],
        );

        const handleBackdropMouseDown = (event: MouseEvent<HTMLElement>) => {
            let clickedOnScrollbar = false;
            const clientWidth = (event.target as HTMLElement)?.clientWidth;

            if (event.clientX && clientWidth) {
                // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
                const offset = browser.getScrollbarSize() === 0 ? 17 : 0;

                clickedOnScrollbar = event.clientX + offset > clientWidth;
            }

            if (!disableBackdropClick && !clickedOnScrollbar) {
                mouseDownTarget.current = event.target as HTMLElement;
            }
        };

        const handleBackdropMouseUp = (event: MouseEvent<HTMLElement>) => {
            if (
                !disableBackdropClick &&
                event.target === wrapperRef.current &&
                mouseDownTarget.current === wrapperRef.current
            ) {
                handleClose(event, 'backdropClick');
            }

            mouseDownTarget.current = undefined;
        };

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
                /*
                 * Чтобы сохранить дефолтное поведение элементов и событий форм,
                 * обработчик не устанавливает event.preventDefault()
                 */
                if (event.key !== 'Escape') {
                    return;
                }

                // Если есть обработчик escape на body
                event.stopPropagation();

                if (!disableEscapeKeyDown && handleClose) {
                    handleClose(event, 'escapeKeyDown');
                }
            },
            [disableEscapeKeyDown, handleClose],
        );

        const getScrollHandler = useCallback(() => {
            if (scrollHandler === 'wrapper') return wrapperRef.current;
            if (scrollHandler === 'content') return componentNodeRef.current;

            return scrollHandler.current || wrapperRef.current;
        }, [scrollHandler]);

        const handleEntered: Required<TransitionProps>['onEntered'] = useCallback(
            (node, isAppearing) => {
                scrollableNodeRef.current = getScrollHandler();

                addResizeHandle();

                if (scrollableNodeRef.current) {
                    scrollableNodeRef.current.addEventListener('scroll', handleScroll);
                    handleScroll();
                }

                if (transitionProps.onEntered) {
                    transitionProps.onEntered(node, isAppearing);
                }

                if (onMount) onMount();
            },
            [addResizeHandle, getScrollHandler, handleScroll, onMount, transitionProps],
        );

        const handleExited: Required<TransitionProps>['onExited'] = useCallback(
            (node) => {
                removeResizeHandle();

                setExited(true);

                if (scrollableNodeRef.current) {
                    scrollableNodeRef.current.removeEventListener('scroll', handleScroll);
                }

                if (transitionProps.onExited) {
                    transitionProps.onExited(node);
                }

                if (onUnmount) onUnmount();

                if (restoreContainerStylesRef.current) {
                    restoreContainerStylesRef.current();
                }
            },
            [handleScroll, onUnmount, removeResizeHandle, transitionProps],
        );

        useEffect(() => {
            if (open && isExited) {
                if (!disableBlockingScroll) {
                    const el = getContainer();

                    const shouldIOSLock = iOSLock && os.isIOS();

                    handleContainer(el, shouldIOSLock);
                    if (shouldIOSLock) {
                        syncHeight();
                        lockScroll();
                    }

                    restoreContainerStylesRef.current = () => {
                        restoreContainerStylesRef.current = null;
                        restoreContainerStyles(el);
                    };
                }

                setExited(false);
            }
        }, [getContainer, open, disableBlockingScroll, isExited, iOSLock]);

        useEffect(() => {
            const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

            resizeObserverRef.current = new ResizeObserver(checkToHasScrollBar);

            return () => {
                if (restoreContainerStylesRef.current) {
                    restoreContainerStylesRef.current();
                }

                if (resizeObserverRef.current) {
                    resizeObserverRef.current.disconnect();
                }
            };
        }, []);

        useEffect(() => {
            if (disableAutoFocus || !open) return;

            wrapperRef.current?.focus();
        }, [open, disableAutoFocus]);

        const contextValue = useMemo<BaseModalContext>(
            () => ({
                parentRef: wrapperRef,
                componentRef: componentNodeRef,
                hasHeader,
                hasFooter,
                hasScroll,
                headerHighlighted,
                footerHighlighted,
                headerOffset,
                setHeaderOffset,
                contentRef,
                setHasHeader,
                setHasFooter,
                onClose: handleClose,
            }),
            [
                contentRef,
                hasHeader,
                hasFooter,
                hasScroll,
                headerHighlighted,
                footerHighlighted,
                headerOffset,
                setHeaderOffset,
                handleClose,
            ],
        );

        const renderContent = () => (
            <Stack value={zIndex}>
                {(computedZIndex) => (
                    <BaseModalContext.Provider value={contextValue}>
                        <FocusLock
                            disabled={disableFocusLock || !open}
                            returnFocus={!disableRestoreFocus}
                        >
                            {Backdrop && (
                                <Backdrop
                                    {...backdropProps}
                                    className={cn(backdropProps.className, styles.backdrop)}
                                    open={open}
                                    style={{
                                        zIndex: computedZIndex,
                                    }}
                                />
                            )}
                            <div
                                {...wrapperProps}
                                role='dialog'
                                className={cn(
                                    styles.wrapper,
                                    wrapperClassName,
                                    wrapperProps?.className,
                                    {
                                        [styles.hidden]: !open && isExited,
                                    },
                                )}
                                ref={mergeRefs([
                                    ref,
                                    wrapperRef,
                                    wrapperProps?.ref as Ref<HTMLDivElement>,
                                ])}
                                onKeyDown={handleKeyDown}
                                onMouseDown={handleBackdropMouseDown}
                                onMouseUp={handleBackdropMouseUp}
                                tabIndex={-1}
                                data-test-id={dataTestId}
                                style={{
                                    zIndex: computedZIndex,
                                }}
                            >
                                <CSSTransition
                                    appear={true}
                                    timeout={200}
                                    classNames={styles}
                                    nodeRef={componentNodeRef}
                                    {...transitionProps}
                                    in={open}
                                    onEntered={handleEntered}
                                    onExited={handleExited}
                                >
                                    <div
                                        {...componentDivProps}
                                        className={cn(
                                            styles.component,
                                            className,
                                            componentDivProps?.className,
                                        )}
                                        ref={mergeRefs([
                                            componentRef,
                                            componentNodeRef,
                                            componentDivProps?.ref || null,
                                        ])}
                                    >
                                        <div
                                            {...contentProps}
                                            className={cn(
                                                styles.content,
                                                contentClassName,
                                                contentProps?.className,
                                            )}
                                        >
                                            {children}
                                        </div>
                                    </div>
                                </CSSTransition>
                            </div>
                        </FocusLock>
                    </BaseModalContext.Provider>
                )}
            </Stack>
        );

        if (!shouldRender) return null;

        return usePortal ? (
            <Portal getPortalContainer={container} immediateMount={true}>
                {renderContent()}
            </Portal>
        ) : (
            renderContent()
        );
    },
);

BaseModal.displayName = 'BaseModal';
BaseModalContext.displayName = 'BaseModalContext';
