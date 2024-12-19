'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Component = require('./Component.js');
var utils = require('./utils.js');
var helpers_lockScroll = require('./helpers/lockScroll.js');



exports.BaseModal = Component.BaseModal;
exports.BaseModalContext = Component.BaseModalContext;
exports.handleContainer = utils.handleContainer;
exports.hasScrollbar = utils.hasScrollbar;
exports.isScrolledToBottom = utils.isScrolledToBottom;
exports.isScrolledToTop = utils.isScrolledToTop;
exports.restoreContainerStyles = utils.restoreContainerStyles;
exports.isScrollLocked = helpers_lockScroll.isScrollLocked;
exports.lockScroll = helpers_lockScroll.lockScroll;
exports.syncHeight = helpers_lockScroll.syncHeight;
exports.unlockScroll = helpers_lockScroll.unlockScroll;
