import { getModalStore } from '@alfalab/core-components-global-store/modern';
import { browser } from '@alfalab/core-components-shared/modern';

function isScrolledToTop(target) {
    return target.scrollTop <= 0;
}
function isScrolledToBottom(target) {
    return target.scrollHeight - target.offsetHeight <= target.scrollTop;
}
function hasScrollbar(target) {
    return target.scrollHeight > target.clientHeight;
}
const isOverflowing = (container) => {
    if (document.body === container) {
        return window.innerWidth > document.documentElement.clientWidth;
    }
    return container.scrollHeight > container.clientHeight;
};
const getPaddingRight = (node) => parseInt(window.getComputedStyle(node).paddingRight, 10) || 0;
const restoreContainerStyles = (container) => {
    const modalRestoreStyles = getModalStore().getRestoreStyles();
    const index = modalRestoreStyles.findIndex((s) => s.container === container);
    const existingStyles = modalRestoreStyles[index];
    if (!existingStyles)
        return;
    existingStyles.modals -= 1;
    if (existingStyles.modals <= 0) {
        modalRestoreStyles.splice(index, 1);
        existingStyles.styles.forEach(({ value, el, key }) => {
            if (value) {
                el.style.setProperty(key, value);
            }
            else {
                el.style.removeProperty(key);
            }
        });
    }
};
const handleContainer = (container, shouldIOSLock = false) => {
    if (!container)
        return;
    const modalRestoreStyles = getModalStore().getRestoreStyles();
    const existingStyles = modalRestoreStyles.find((s) => s.container === container);
    if (existingStyles) {
        existingStyles.modals += 1;
        return;
    }
    const containerStyles = [];
    if (isOverflowing(container)) {
        // Вычисляет размер до применения `overflow hidden` для избежания скачков
        const scrollbarSize = browser.getScrollbarSize();
        containerStyles.push({
            value: container.style.paddingRight,
            key: 'padding-right',
            el: container,
        });
        // Вычисляем стили, чтобы получить реальный `padding` c шириной сколлбара
        // eslint-disable-next-line no-param-reassign
        container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
    }
    const parent = container.parentElement;
    const scrollContainer = 
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
        container,
        modals: 1,
        styles: containerStyles,
    });
};

export { handleContainer, hasScrollbar, isScrolledToBottom, isScrolledToTop, restoreContainerStyles };
