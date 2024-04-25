let scrollY: number;

export const lockScroll = () => {
    scrollY = window.scrollY;
    document.documentElement.classList.add('is-locked');
};

export const unlockScroll = () => {
    document.documentElement.classList.remove('is-locked');
    window.scrollTo(0, scrollY);
};

export const syncHeight = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
};
