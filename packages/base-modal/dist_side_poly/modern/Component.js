import React, { forwardRef, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import FocusLock from 'react-focus-lock';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import { Backdrop } from '@alfalab/core-components-backdrop/modern';
import { Portal } from '@alfalab/core-components-portal/modern';
import { os, browser } from '@alfalab/core-components-shared/modern';
import { Stack } from '@alfalab/core-components-stack/modern';
import { stackingOrder } from '@alfalab/stack-context';
import { unlockScroll, syncHeight, lockScroll } from './helpers/lockScroll.js';
import { isScrolledToTop, isScrolledToBottom, handleContainer, restoreContainerStyles, hasScrollbar } from './utils.js';
import './matches-polyfill.js';

const styles = {"component":"base-modal__component_1y6m8","wrapper":"base-modal__wrapper_1y6m8","content":"base-modal__content_1y6m8","hidden":"base-modal__hidden_1y6m8","backdrop":"base-modal__backdrop_1y6m8","appear":"base-modal__appear_1y6m8","enter":"base-modal__enter_1y6m8","appearActive":"base-modal__appearActive_1y6m8","enterActive":"base-modal__enterActive_1y6m8","exit":"base-modal__exit_1y6m8","exitActive":"base-modal__exitActive_1y6m8","exitDone":"base-modal__exitDone_1y6m8"};
require('./index.css')

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// eslint-disable-next-line @typescript-eslint/no-redeclare
const BaseModalContext = React.createContext({
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
const BaseModal = forwardRef(({ open, container, children, scrollHandler = 'wrapper', Backdrop: Backdrop$1 = Backdrop, backdropProps = {}, transitionProps = {}, disableBackdropClick, disableAutoFocus = false, disableFocusLock = false, disableEscapeKeyDown = false, disableRestoreFocus = false, disableBlockingScroll = false, keepMounted = false, className, contentClassName, wrapperProps, contentProps, componentDivProps, wrapperClassName, onBackdropClick, onClose, onEscapeKeyDown, onMount, onUnmount, dataTestId, zIndex = stackingOrder.MODAL, componentRef = null, usePortal = true, iOSLock = false, }, ref) => {
    const [exited, setExited] = useState(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [hasHeader, setHasHeader] = useState(false);
    const [hasFooter, setHasFooter] = useState(false);
    const [headerHighlighted, setHeaderHighlighted] = useState(false);
    const [footerHighlighted, setFooterHighlighted] = useState(false);
    const [headerOffset, setHeaderOffset] = useState(0);
    const componentNodeRef = useRef(null);
    const wrapperRef = useRef(null);
    const scrollableNodeRef = useRef(null);
    const contentNodeRef = useRef(null);
    const restoreContainerStylesRef = useRef(null);
    const mouseDownTarget = useRef();
    const resizeObserverRef = useRef();
    const checkToHasScrollBar = () => {
        if (scrollableNodeRef.current) {
            const scrollExists = hasScrollbar(scrollableNodeRef.current);
            setFooterHighlighted(scrollExists);
            setHasScroll(scrollExists);
        }
    };
    const isExited = exited || exited === null;
    const shouldRender = keepMounted || open || !isExited;
    const getContainer = useCallback(() => (container ? container() : document.body), [container]);
    const addResizeHandle = useCallback(() => {
        if (!resizeObserverRef.current)
            return;
        if (scrollableNodeRef.current) {
            resizeObserverRef.current.observe(scrollableNodeRef.current);
        }
        if (contentNodeRef.current) {
            resizeObserverRef.current.observe(contentNodeRef.current);
        }
    }, []);
    const removeResizeHandle = useCallback(() => resizeObserverRef.current?.disconnect(), []);
    const contentRef = useCallback((node) => {
        if (node !== null) {
            contentNodeRef.current = node;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.observe(node);
            }
            checkToHasScrollBar();
        }
    }, []);
    const handleScroll = useCallback(() => {
        if (!scrollableNodeRef.current || !componentNodeRef.current)
            return;
        if (hasHeader) {
            setHeaderHighlighted(!isScrolledToTop(scrollableNodeRef.current) &&
                componentNodeRef.current.getBoundingClientRect().top - headerOffset <= 1);
        }
        if (hasFooter) {
            setFooterHighlighted(!isScrolledToBottom(scrollableNodeRef.current) &&
                componentNodeRef.current.getBoundingClientRect().bottom >=
                    window.innerHeight - 1);
        }
    }, [hasFooter, hasHeader, headerOffset]);
    const handleClose = useCallback((event, reason) => {
        if (iOSLock && os.isIOS()) {
            unlockScroll();
        }
        if (onClose) {
            onClose(event, reason);
        }
        if (reason === 'backdropClick' && onBackdropClick) {
            onBackdropClick(event);
        }
        if (reason === 'escapeKeyDown' && onEscapeKeyDown) {
            onEscapeKeyDown(event);
        }
        return null;
    }, [onBackdropClick, onClose, onEscapeKeyDown, iOSLock]);
    const handleBackdropMouseDown = (event) => {
        let clickedOnScrollbar = false;
        const clientWidth = event.target?.clientWidth;
        if (event.clientX && clientWidth) {
            // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
            const offset = browser.getScrollbarSize() === 0 ? 17 : 0;
            clickedOnScrollbar = event.clientX + offset > clientWidth;
        }
        if (!disableBackdropClick && !clickedOnScrollbar) {
            mouseDownTarget.current = event.target;
        }
    };
    const handleBackdropMouseUp = (event) => {
        if (!disableBackdropClick &&
            event.target === wrapperRef.current &&
            mouseDownTarget.current === wrapperRef.current) {
            handleClose(event, 'backdropClick');
        }
        mouseDownTarget.current = undefined;
    };
    const handleKeyDown = useCallback((event) => {
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
    }, [disableEscapeKeyDown, handleClose]);
    const getScrollHandler = useCallback(() => {
        if (scrollHandler === 'wrapper')
            return wrapperRef.current;
        if (scrollHandler === 'content')
            return componentNodeRef.current;
        return scrollHandler.current || wrapperRef.current;
    }, [scrollHandler]);
    const handleEntered = useCallback((node, isAppearing) => {
        scrollableNodeRef.current = getScrollHandler();
        addResizeHandle();
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
        if (onMount)
            onMount();
    }, [addResizeHandle, getScrollHandler, handleScroll, onMount, transitionProps]);
    const handleExited = useCallback((node) => {
        removeResizeHandle();
        setExited(true);
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.removeEventListener('scroll', handleScroll);
        }
        if (transitionProps.onExited) {
            transitionProps.onExited(node);
        }
        if (onUnmount)
            onUnmount();
        if (restoreContainerStylesRef.current) {
            restoreContainerStylesRef.current();
        }
    }, [handleScroll, onUnmount, removeResizeHandle, transitionProps]);
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
        if (!open) {
            unlockScroll();
        }
    }, [getContainer, open, disableBlockingScroll, isExited, iOSLock]);
    useEffect(() => {
        const ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        resizeObserverRef.current = new ResizeObserver$1(checkToHasScrollBar);
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
        if (disableAutoFocus || !open)
            return;
        wrapperRef.current?.focus();
    }, [open, disableAutoFocus]);
    const contextValue = useMemo(() => ({
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
    }), [
        contentRef,
        hasHeader,
        hasFooter,
        hasScroll,
        headerHighlighted,
        footerHighlighted,
        headerOffset,
        setHeaderOffset,
        handleClose,
    ]);
    const renderContent = () => (React.createElement(Stack, { value: zIndex }, (computedZIndex) => (React.createElement(BaseModalContext.Provider, { value: contextValue },
        React.createElement(FocusLock, { disabled: disableFocusLock || !open, returnFocus: !disableRestoreFocus },
            Backdrop$1 && (React.createElement(Backdrop$1, { ...backdropProps, className: cn(backdropProps.className, styles.backdrop), open: open, style: {
                    zIndex: computedZIndex,
                } })),
            React.createElement("div", { ...wrapperProps, role: 'dialog', className: cn(styles.wrapper, wrapperClassName, wrapperProps?.className, {
                    [styles.hidden]: !open && isExited,
                }), ref: mergeRefs([
                    ref,
                    wrapperRef,
                    wrapperProps?.ref,
                ]), onKeyDown: handleKeyDown, onMouseDown: handleBackdropMouseDown, onMouseUp: handleBackdropMouseUp, tabIndex: -1, "data-test-id": dataTestId, style: {
                    zIndex: computedZIndex,
                } },
                React.createElement(CSSTransition, { appear: true, timeout: 200, classNames: styles, nodeRef: componentNodeRef, ...transitionProps, in: open, onEntered: handleEntered, onExited: handleExited },
                    React.createElement("div", { ...componentDivProps, className: cn(styles.component, className, componentDivProps?.className), ref: mergeRefs([
                            componentRef,
                            componentNodeRef,
                            componentDivProps?.ref || null,
                        ]) },
                        React.createElement("div", { ...contentProps, className: cn(styles.content, contentClassName, contentProps?.className) }, children)))))))));
    if (!shouldRender)
        return null;
    return usePortal ? (React.createElement(Portal, { getPortalContainer: container, immediateMount: true }, renderContent())) : (renderContent());
});
BaseModal.displayName = 'BaseModal';
BaseModalContext.displayName = 'BaseModalContext';

export { BaseModal, BaseModalContext };
