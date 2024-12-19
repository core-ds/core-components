'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var FocusLock = require('react-focus-lock');
var mergeRefs = require('react-merge-refs');
var reactTransitionGroup = require('react-transition-group');
var resizeObserver = require('@juggle/resize-observer');
var cn = require('classnames');
var coreComponentsBackdrop = require('@alfalab/core-components-backdrop/cssm');
var coreComponentsPortal = require('@alfalab/core-components-portal/cssm');
var coreComponentsShared = require('@alfalab/core-components-shared/cssm');
var coreComponentsStack = require('@alfalab/core-components-stack/cssm');
var stackContext = require('@alfalab/stack-context');
var helpers_lockScroll = require('./helpers/lockScroll.js');
var utils = require('./utils.js');
var styles = require('./index.module.css');
require('./matches-polyfill.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var FocusLock__default = /*#__PURE__*/_interopDefaultCompat(FocusLock);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
var BaseModalContext = React__default.default.createContext({
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
var BaseModal = React.forwardRef(function (_a, ref) {
    var open = _a.open, container = _a.container, children = _a.children, _b = _a.scrollHandler, scrollHandler = _b === void 0 ? 'wrapper' : _b, _c = _a.Backdrop, Backdrop = _c === void 0 ? coreComponentsBackdrop.Backdrop : _c, _d = _a.backdropProps, backdropProps = _d === void 0 ? {} : _d, _e = _a.transitionProps, transitionProps = _e === void 0 ? {} : _e, disableBackdropClick = _a.disableBackdropClick, _f = _a.disableAutoFocus, disableAutoFocus = _f === void 0 ? false : _f, _g = _a.disableFocusLock, disableFocusLock = _g === void 0 ? false : _g, _h = _a.disableEscapeKeyDown, disableEscapeKeyDown = _h === void 0 ? false : _h, _j = _a.disableRestoreFocus, disableRestoreFocus = _j === void 0 ? false : _j, _k = _a.disableBlockingScroll, disableBlockingScroll = _k === void 0 ? false : _k, _l = _a.keepMounted, keepMounted = _l === void 0 ? false : _l, className = _a.className, contentClassName = _a.contentClassName, wrapperProps = _a.wrapperProps, contentProps = _a.contentProps, componentDivProps = _a.componentDivProps, wrapperClassName = _a.wrapperClassName, onBackdropClick = _a.onBackdropClick, onClose = _a.onClose, onEscapeKeyDown = _a.onEscapeKeyDown, onMount = _a.onMount, onUnmount = _a.onUnmount, dataTestId = _a.dataTestId, _m = _a.zIndex, zIndex = _m === void 0 ? stackContext.stackingOrder.MODAL : _m, _o = _a.componentRef, componentRef = _o === void 0 ? null : _o, _p = _a.usePortal, usePortal = _p === void 0 ? true : _p, _q = _a.iOSLock, iOSLock = _q === void 0 ? false : _q;
    var _r = React.useState(null), exited = _r[0], setExited = _r[1];
    var _s = React.useState(false), hasScroll = _s[0], setHasScroll = _s[1];
    var _t = React.useState(false), hasHeader = _t[0], setHasHeader = _t[1];
    var _u = React.useState(false), hasFooter = _u[0], setHasFooter = _u[1];
    var _v = React.useState(false), headerHighlighted = _v[0], setHeaderHighlighted = _v[1];
    var _w = React.useState(false), footerHighlighted = _w[0], setFooterHighlighted = _w[1];
    var _x = React.useState(0), headerOffset = _x[0], setHeaderOffset = _x[1];
    var componentNodeRef = React.useRef(null);
    var wrapperRef = React.useRef(null);
    var scrollableNodeRef = React.useRef(null);
    var contentNodeRef = React.useRef(null);
    var restoreContainerStylesRef = React.useRef(null);
    var mouseDownTarget = React.useRef();
    var resizeObserverRef = React.useRef();
    var checkToHasScrollBar = function () {
        if (scrollableNodeRef.current) {
            var scrollExists = utils.hasScrollbar(scrollableNodeRef.current);
            setFooterHighlighted(scrollExists);
            setHasScroll(scrollExists);
        }
    };
    var isExited = exited || exited === null;
    var shouldRender = keepMounted || open || !isExited;
    var getContainer = React.useCallback(function () { return (container ? container() : document.body); }, [container]);
    var addResizeHandle = React.useCallback(function () {
        if (!resizeObserverRef.current)
            return;
        if (scrollableNodeRef.current) {
            resizeObserverRef.current.observe(scrollableNodeRef.current);
        }
        if (contentNodeRef.current) {
            resizeObserverRef.current.observe(contentNodeRef.current);
        }
    }, []);
    var removeResizeHandle = React.useCallback(function () { var _a; return (_a = resizeObserverRef.current) === null || _a === void 0 ? void 0 : _a.disconnect(); }, []);
    var contentRef = React.useCallback(function (node) {
        if (node !== null) {
            contentNodeRef.current = node;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.observe(node);
            }
            checkToHasScrollBar();
        }
    }, []);
    var handleScroll = React.useCallback(function () {
        if (!scrollableNodeRef.current || !componentNodeRef.current)
            return;
        if (hasHeader) {
            setHeaderHighlighted(!utils.isScrolledToTop(scrollableNodeRef.current) &&
                componentNodeRef.current.getBoundingClientRect().top - headerOffset <= 1);
        }
        if (hasFooter) {
            setFooterHighlighted(!utils.isScrolledToBottom(scrollableNodeRef.current) &&
                componentNodeRef.current.getBoundingClientRect().bottom >=
                    window.innerHeight - 1);
        }
    }, [hasFooter, hasHeader, headerOffset]);
    var handleClose = React.useCallback(function (event, reason) {
        if (iOSLock && coreComponentsShared.os.isIOS()) {
            helpers_lockScroll.unlockScroll();
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
            var offset = coreComponentsShared.browser.getScrollbarSize() === 0 ? 17 : 0;
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
    var handleKeyDown = React.useCallback(function (event) {
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
    var getScrollHandler = React.useCallback(function () {
        if (scrollHandler === 'wrapper')
            return wrapperRef.current;
        if (scrollHandler === 'content')
            return componentNodeRef.current;
        return scrollHandler.current || wrapperRef.current;
    }, [scrollHandler]);
    var handleEntered = React.useCallback(function (node, isAppearing) {
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
    var handleExited = React.useCallback(function (node) {
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
    React.useEffect(function () {
        if (open && isExited) {
            if (!disableBlockingScroll) {
                var el_1 = getContainer();
                var shouldIOSLock = iOSLock && coreComponentsShared.os.isIOS();
                utils.handleContainer(el_1, shouldIOSLock);
                if (shouldIOSLock) {
                    helpers_lockScroll.syncHeight();
                    helpers_lockScroll.lockScroll();
                }
                restoreContainerStylesRef.current = function () {
                    restoreContainerStylesRef.current = null;
                    utils.restoreContainerStyles(el_1);
                };
            }
            setExited(false);
        }
        if (!open) {
            helpers_lockScroll.unlockScroll();
        }
    }, [getContainer, open, disableBlockingScroll, isExited, iOSLock]);
    React.useEffect(function () {
        var ResizeObserver = window.ResizeObserver || resizeObserver.ResizeObserver;
        resizeObserverRef.current = new ResizeObserver(checkToHasScrollBar);
        return function () {
            if (restoreContainerStylesRef.current) {
                restoreContainerStylesRef.current();
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, []);
    React.useEffect(function () {
        var _a;
        if (disableAutoFocus || !open)
            return;
        (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [open, disableAutoFocus]);
    var contextValue = React.useMemo(function () { return ({
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
    var renderContent = function () { return (React__default.default.createElement(coreComponentsStack.Stack, { value: zIndex }, function (computedZIndex) {
        var _a;
        return (React__default.default.createElement(BaseModalContext.Provider, { value: contextValue },
            React__default.default.createElement(FocusLock__default.default, { disabled: disableFocusLock || !open, returnFocus: !disableRestoreFocus },
                Backdrop && (React__default.default.createElement(Backdrop, tslib.__assign({}, backdropProps, { className: cn__default.default(backdropProps.className, styles__default.default.backdrop), open: open, style: {
                        zIndex: computedZIndex,
                    } }))),
                React__default.default.createElement("div", tslib.__assign({}, wrapperProps, { role: 'dialog', className: cn__default.default(styles__default.default.wrapper, wrapperClassName, wrapperProps === null || wrapperProps === void 0 ? void 0 : wrapperProps.className, (_a = {},
                        _a[styles__default.default.hidden] = !open && isExited,
                        _a)), ref: mergeRefs__default.default([
                        ref,
                        wrapperRef,
                        wrapperProps === null || wrapperProps === void 0 ? void 0 : wrapperProps.ref,
                    ]), onKeyDown: handleKeyDown, onMouseDown: handleBackdropMouseDown, onMouseUp: handleBackdropMouseUp, tabIndex: -1, "data-test-id": dataTestId, style: {
                        zIndex: computedZIndex,
                    } }),
                    React__default.default.createElement(reactTransitionGroup.CSSTransition, tslib.__assign({ appear: true, timeout: 200, classNames: styles__default.default, nodeRef: componentNodeRef }, transitionProps, { in: open, onEntered: handleEntered, onExited: handleExited }),
                        React__default.default.createElement("div", tslib.__assign({}, componentDivProps, { className: cn__default.default(styles__default.default.component, className, componentDivProps === null || componentDivProps === void 0 ? void 0 : componentDivProps.className), ref: mergeRefs__default.default([
                                componentRef,
                                componentNodeRef,
                                (componentDivProps === null || componentDivProps === void 0 ? void 0 : componentDivProps.ref) || null,
                            ]) }),
                            React__default.default.createElement("div", tslib.__assign({}, contentProps, { className: cn__default.default(styles__default.default.content, contentClassName, contentProps === null || contentProps === void 0 ? void 0 : contentProps.className) }), children)))))));
    })); };
    if (!shouldRender)
        return null;
    return usePortal ? (React__default.default.createElement(coreComponentsPortal.Portal, { getPortalContainer: container, immediateMount: true }, renderContent())) : (renderContent());
});
BaseModal.displayName = 'BaseModal';
BaseModalContext.displayName = 'BaseModalContext';

exports.BaseModal = BaseModal;
exports.BaseModalContext = BaseModalContext;
