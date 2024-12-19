import { __assign } from 'tslib';
import React, { forwardRef, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import FocusLock from 'react-focus-lock';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import { Backdrop } from '@alfalab/core-components-backdrop/esm';
import { Portal } from '@alfalab/core-components-portal/esm';
import { os, browser } from '@alfalab/core-components-shared/esm';
import { Stack } from '@alfalab/core-components-stack/esm';
import { stackingOrder } from '@alfalab/stack-context';
import { unlockScroll, syncHeight, lockScroll } from './helpers/lockScroll.js';
import { isScrolledToTop, isScrolledToBottom, handleContainer, restoreContainerStyles, hasScrollbar } from './utils.js';
import './matches-polyfill.js';

var styles = {"component":"base-modal__component_1y6m8","wrapper":"base-modal__wrapper_1y6m8","content":"base-modal__content_1y6m8","hidden":"base-modal__hidden_1y6m8","backdrop":"base-modal__backdrop_1y6m8","appear":"base-modal__appear_1y6m8","enter":"base-modal__enter_1y6m8","appearActive":"base-modal__appearActive_1y6m8","enterActive":"base-modal__enterActive_1y6m8","exit":"base-modal__exit_1y6m8","exitActive":"base-modal__exitActive_1y6m8","exitDone":"base-modal__exitDone_1y6m8"};
require('./index.css')

// eslint-disable-next-line @typescript-eslint/no-redeclare
var BaseModalContext = React.createContext({
    parentRef: { current: null },
    componentRef: { current: null },
    hasFooter: false,
    hasHeader: false,
    hasScroll: false,
    headerHighlighted: false,
    footerHighlighted: false,
    headerOffset: 0,
    setHeaderOffset: function () { return null; },
    contentRef: function () { return null; },
    setHasHeader: function () { return null; },
    setHasFooter: function () { return null; },
    onClose: function () { return null; },
});
var BaseModal = forwardRef(function (_a, ref) {
    var open = _a.open, container = _a.container, children = _a.children, _b = _a.scrollHandler, scrollHandler = _b === void 0 ? 'wrapper' : _b, _c = _a.Backdrop, Backdrop$1 = _c === void 0 ? Backdrop : _c, _d = _a.backdropProps, backdropProps = _d === void 0 ? {} : _d, _e = _a.transitionProps, transitionProps = _e === void 0 ? {} : _e, disableBackdropClick = _a.disableBackdropClick, _f = _a.disableAutoFocus, disableAutoFocus = _f === void 0 ? false : _f, _g = _a.disableFocusLock, disableFocusLock = _g === void 0 ? false : _g, _h = _a.disableEscapeKeyDown, disableEscapeKeyDown = _h === void 0 ? false : _h, _j = _a.disableRestoreFocus, disableRestoreFocus = _j === void 0 ? false : _j, _k = _a.disableBlockingScroll, disableBlockingScroll = _k === void 0 ? false : _k, _l = _a.keepMounted, keepMounted = _l === void 0 ? false : _l, className = _a.className, contentClassName = _a.contentClassName, wrapperProps = _a.wrapperProps, contentProps = _a.contentProps, componentDivProps = _a.componentDivProps, wrapperClassName = _a.wrapperClassName, onBackdropClick = _a.onBackdropClick, onClose = _a.onClose, onEscapeKeyDown = _a.onEscapeKeyDown, onMount = _a.onMount, onUnmount = _a.onUnmount, dataTestId = _a.dataTestId, _m = _a.zIndex, zIndex = _m === void 0 ? stackingOrder.MODAL : _m, _o = _a.componentRef, componentRef = _o === void 0 ? null : _o, _p = _a.usePortal, usePortal = _p === void 0 ? true : _p, _q = _a.iOSLock, iOSLock = _q === void 0 ? false : _q;
    var _r = useState(null), exited = _r[0], setExited = _r[1];
    var _s = useState(false), hasScroll = _s[0], setHasScroll = _s[1];
    var _t = useState(false), hasHeader = _t[0], setHasHeader = _t[1];
    var _u = useState(false), hasFooter = _u[0], setHasFooter = _u[1];
    var _v = useState(false), headerHighlighted = _v[0], setHeaderHighlighted = _v[1];
    var _w = useState(false), footerHighlighted = _w[0], setFooterHighlighted = _w[1];
    var _x = useState(0), headerOffset = _x[0], setHeaderOffset = _x[1];
    var componentNodeRef = useRef(null);
    var wrapperRef = useRef(null);
    var scrollableNodeRef = useRef(null);
    var contentNodeRef = useRef(null);
    var restoreContainerStylesRef = useRef(null);
    var mouseDownTarget = useRef();
    var resizeObserverRef = useRef();
    var checkToHasScrollBar = function () {
        if (scrollableNodeRef.current) {
            var scrollExists = hasScrollbar(scrollableNodeRef.current);
            setFooterHighlighted(scrollExists);
            setHasScroll(scrollExists);
        }
    };
    var isExited = exited || exited === null;
    var shouldRender = keepMounted || open || !isExited;
    var getContainer = useCallback(function () { return (container ? container() : document.body); }, [container]);
    var addResizeHandle = useCallback(function () {
        if (!resizeObserverRef.current)
            return;
        if (scrollableNodeRef.current) {
            resizeObserverRef.current.observe(scrollableNodeRef.current);
        }
        if (contentNodeRef.current) {
            resizeObserverRef.current.observe(contentNodeRef.current);
        }
    }, []);
    var removeResizeHandle = useCallback(function () { var _a; return (_a = resizeObserverRef.current) === null || _a === void 0 ? void 0 : _a.disconnect(); }, []);
    var contentRef = useCallback(function (node) {
        if (node !== null) {
            contentNodeRef.current = node;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.observe(node);
            }
            checkToHasScrollBar();
        }
    }, []);
    var handleScroll = useCallback(function () {
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
    var handleClose = useCallback(function (event, reason) {
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
    var handleBackdropMouseDown = function (event) {
        var _a;
        var clickedOnScrollbar = false;
        var clientWidth = (_a = event.target) === null || _a === void 0 ? void 0 : _a.clientWidth;
        if (event.clientX && clientWidth) {
            // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
            var offset = browser.getScrollbarSize() === 0 ? 17 : 0;
            clickedOnScrollbar = event.clientX + offset > clientWidth;
        }
        if (!disableBackdropClick && !clickedOnScrollbar) {
            mouseDownTarget.current = event.target;
        }
    };
    var handleBackdropMouseUp = function (event) {
        if (!disableBackdropClick &&
            event.target === wrapperRef.current &&
            mouseDownTarget.current === wrapperRef.current) {
            handleClose(event, 'backdropClick');
        }
        mouseDownTarget.current = undefined;
    };
    var handleKeyDown = useCallback(function (event) {
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
    var getScrollHandler = useCallback(function () {
        if (scrollHandler === 'wrapper')
            return wrapperRef.current;
        if (scrollHandler === 'content')
            return componentNodeRef.current;
        return scrollHandler.current || wrapperRef.current;
    }, [scrollHandler]);
    var handleEntered = useCallback(function (node, isAppearing) {
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
    var handleExited = useCallback(function (node) {
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
    useEffect(function () {
        if (open && isExited) {
            if (!disableBlockingScroll) {
                var el_1 = getContainer();
                var shouldIOSLock = iOSLock && os.isIOS();
                handleContainer(el_1, shouldIOSLock);
                if (shouldIOSLock) {
                    syncHeight();
                    lockScroll();
                }
                restoreContainerStylesRef.current = function () {
                    restoreContainerStylesRef.current = null;
                    restoreContainerStyles(el_1);
                };
            }
            setExited(false);
        }
        if (!open) {
            unlockScroll();
        }
    }, [getContainer, open, disableBlockingScroll, isExited, iOSLock]);
    useEffect(function () {
        var ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        resizeObserverRef.current = new ResizeObserver$1(checkToHasScrollBar);
        return function () {
            if (restoreContainerStylesRef.current) {
                restoreContainerStylesRef.current();
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, []);
    useEffect(function () {
        var _a;
        if (disableAutoFocus || !open)
            return;
        (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [open, disableAutoFocus]);
    var contextValue = useMemo(function () { return ({
        parentRef: wrapperRef,
        componentRef: componentNodeRef,
        hasHeader: hasHeader,
        hasFooter: hasFooter,
        hasScroll: hasScroll,
        headerHighlighted: headerHighlighted,
        footerHighlighted: footerHighlighted,
        headerOffset: headerOffset,
        setHeaderOffset: setHeaderOffset,
        contentRef: contentRef,
        setHasHeader: setHasHeader,
        setHasFooter: setHasFooter,
        onClose: handleClose,
    }); }, [
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
    var renderContent = function () { return (React.createElement(Stack, { value: zIndex }, function (computedZIndex) {
        var _a;
        return (React.createElement(BaseModalContext.Provider, { value: contextValue },
            React.createElement(FocusLock, { disabled: disableFocusLock || !open, returnFocus: !disableRestoreFocus },
                Backdrop$1 && (React.createElement(Backdrop$1, __assign({}, backdropProps, { className: cn(backdropProps.className, styles.backdrop), open: open, style: {
                        zIndex: computedZIndex,
                    } }))),
                React.createElement("div", __assign({}, wrapperProps, { role: 'dialog', className: cn(styles.wrapper, wrapperClassName, wrapperProps === null || wrapperProps === void 0 ? void 0 : wrapperProps.className, (_a = {},
                        _a[styles.hidden] = !open && isExited,
                        _a)), ref: mergeRefs([
                        ref,
                        wrapperRef,
                        wrapperProps === null || wrapperProps === void 0 ? void 0 : wrapperProps.ref,
                    ]), onKeyDown: handleKeyDown, onMouseDown: handleBackdropMouseDown, onMouseUp: handleBackdropMouseUp, tabIndex: -1, "data-test-id": dataTestId, style: {
                        zIndex: computedZIndex,
                    } }),
                    React.createElement(CSSTransition, __assign({ appear: true, timeout: 200, classNames: styles, nodeRef: componentNodeRef }, transitionProps, { in: open, onEntered: handleEntered, onExited: handleExited }),
                        React.createElement("div", __assign({}, componentDivProps, { className: cn(styles.component, className, componentDivProps === null || componentDivProps === void 0 ? void 0 : componentDivProps.className), ref: mergeRefs([
                                componentRef,
                                componentNodeRef,
                                (componentDivProps === null || componentDivProps === void 0 ? void 0 : componentDivProps.ref) || null,
                            ]) }),
                            React.createElement("div", __assign({}, contentProps, { className: cn(styles.content, contentClassName, contentProps === null || contentProps === void 0 ? void 0 : contentProps.className) }), children)))))));
    })); };
    if (!shouldRender)
        return null;
    return usePortal ? (React.createElement(Portal, { getPortalContainer: container, immediateMount: true }, renderContent())) : (renderContent());
});
BaseModal.displayName = 'BaseModal';
BaseModalContext.displayName = 'BaseModalContext';

export { BaseModal, BaseModalContext };
