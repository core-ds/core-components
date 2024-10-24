/**
 * Хелпер для блокирования скроллинга в iOS
 * В проекте используется overflow: hidden для блокировки, но в некоторых случаях этого недостаточно. Данный хелпер призван решать эту проблему
 */

let scrollY: number;

export const lockScroll = () => {
    scrollY = window.scrollY;
    document.body.classList.add('is-locked');
};

export const unlockScroll = () => {
    document.body.classList.remove('is-locked');
    window.scrollTo(0, scrollY);
};

export const isScrollLocked = () => document.body.classList.contains('is-locked');

export const syncHeight = () => {
    document.body.style.setProperty('--window-inner-scrollY', `${window.scrollY}px`);
};
