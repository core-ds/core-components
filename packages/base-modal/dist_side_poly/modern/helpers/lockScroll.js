/**
 * Хелпер для блокирования скроллинга в iOS
 * В проекте используется overflow: hidden для блокировки, но в некоторых случаях этого недостаточно. Данный хелпер призван решать эту проблему
 */
let scrollY;
const isScrollLocked = () => document.body.classList.contains('is-locked');
const lockScroll = () => {
    scrollY = window.scrollY;
    document.body.classList.add('is-locked');
};
const unlockScroll = () => {
    if (!isScrollLocked())
        return;
    document.body.classList.remove('is-locked');
    window.scrollTo(0, scrollY);
};
const syncHeight = () => {
    document.body.style.setProperty('--window-inner-scrollY', `${window.scrollY}px`);
};

export { isScrollLocked, lockScroll, syncHeight, unlockScroll };
