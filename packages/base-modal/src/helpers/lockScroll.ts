let scrollY: number;

export const lockScroll = () => {
    scrollY = window.scrollY;
    document.body.classList.add('is-locked');
};

export const unlockScroll = () => {
    document.body.classList.remove('is-locked');
    window.scrollTo(0, scrollY);
};

export const syncHeight = () => {
    document.body.style.setProperty('--window-inner-scrollY', `${window.scrollY}px`);
};
