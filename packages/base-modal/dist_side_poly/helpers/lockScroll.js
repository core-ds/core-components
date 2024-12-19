'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Хелпер для блокирования скроллинга в iOS
 * В проекте используется overflow: hidden для блокировки, но в некоторых случаях этого недостаточно. Данный хелпер призван решать эту проблему
 */
var scrollY;
var isScrollLocked = function () { return document.body.classList.contains('is-locked'); };
var lockScroll = function () {
    scrollY = window.scrollY;
    document.body.classList.add('is-locked');
};
var unlockScroll = function () {
    if (!isScrollLocked())
        return;
    document.body.classList.remove('is-locked');
    window.scrollTo(0, scrollY);
};
var syncHeight = function () {
    document.body.style.setProperty('--window-inner-scrollY', "".concat(window.scrollY, "px"));
};

exports.isScrollLocked = isScrollLocked;
exports.lockScroll = lockScroll;
exports.syncHeight = syncHeight;
exports.unlockScroll = unlockScroll;
