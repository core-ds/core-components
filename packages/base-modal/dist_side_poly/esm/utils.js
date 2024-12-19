import { getModalStore } from '@alfalab/core-components-global-store/esm';
import { browser } from '@alfalab/core-components-shared/esm';

function isScrolledToTop(target) {
    return target.scrollTop <= 0;
}
function isScrolledToBottom(target) {
    return target.scrollHeight - target.offsetHeight <= target.scrollTop;
}
function hasScrollbar(target) {
    return target.scrollHeight > target.clientHeight;
}
var isOverflowing = function (container) {
    if (document.body === container) {
        return window.innerWidth > document.documentElement.clientWidth;
    }
    return container.scrollHeight > container.clientHeight;
};
var getPaddingRight = function (node) {
    return parseInt(window.getComputedStyle(node).paddingRight, 10) || 0;
};
var restoreContainerStyles = function (container) {
    var modalRestoreStyles = getModalStore().getRestoreStyles();
    var index = modalRestoreStyles.findIndex(function (s) { return s.container === container; });
    var existingStyles = modalRestoreStyles[index];
    if (!existingStyles)
        return;
    existingStyles.modals -= 1;
    if (existingStyles.modals <= 0) {
        modalRestoreStyles.splice(index, 1);
        existingStyles.styles.forEach(function (_a) {
            var value = _a.value, el = _a.el, key = _a.key;
            if (value) {
                el.style.setProperty(key, value);
            }
            else {
                el.style.removeProperty(key);
            }
        });
    }
};
var handleContainer = function (container, shouldIOSLock) {
    if (shouldIOSLock === void 0) { shouldIOSLock = false; }
    if (!container)
        return;
    var modalRestoreStyles = getModalStore().getRestoreStyles();
    var existingStyles = modalRestoreStyles.find(function (s) { return s.container === container; });
    if (existingStyles) {
        existingStyles.modals += 1;
        return;
    }
    var containerStyles = [];
    if (isOverflowing(container)) {
        // Вычисляет размер до применения `overflow hidden` для избежания скачков
        var scrollbarSize = browser.getScrollbarSize();
        containerStyles.push({
            value: container.style.paddingRight,
            key: 'padding-right',
            el: container,
        });
        // Вычисляем стили, чтобы получить реальный `padding` c шириной сколлбара
        // eslint-disable-next-line no-param-reassign
        container.style.paddingRight = "".concat(getPaddingRight(container) + scrollbarSize, "px");
    }
    var parent = container.parentElement;
    var scrollContainer = 
    // TODO: заменить на optional chaining
    parent &&
        parent.nodeName === 'HTML' &&
        window.getComputedStyle(parent).overflowY === 'scroll'
        ? parent
        : container;
    // Блокируем скролл даже если отсутствует скроллбар
    if (scrollContainer.style.overflow !== 'hidden') {
        containerStyles.push({
            value: scrollContainer.style.overflow,
            key: 'overflow',
            el: scrollContainer,
        });
    }
    if (!shouldIOSLock) {
        scrollContainer.style.overflow = 'hidden';
    }
    modalRestoreStyles.push({
        container: container,
        modals: 1,
        styles: containerStyles,
    });
};

export { handleContainer, hasScrollbar, isScrolledToBottom, isScrolledToTop, restoreContainerStyles };
