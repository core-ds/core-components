import { isClient } from './isClient';

const getScrollbarSize = (() => {
    let cachedSize: number;

    return () => {
        if (cachedSize !== undefined) return cachedSize;
        if (!isClient()) return 0;

        const scrollDiv = document.createElement('div');

        scrollDiv.style.width = '99px';
        scrollDiv.style.height = '99px';
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.overflow = 'scroll';

        document.body.appendChild(scrollDiv);
        const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        document.body.removeChild(scrollDiv);

        cachedSize = scrollbarSize;

        return scrollbarSize;
    };
})();

function isWebkitBased() {
    if (!isClient()) return false;

    return window.navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
}

function getChromeVersion() {
    if (!isClient()) {
        return false;
    }

    const match = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    return match ? parseInt(match[2], 10) : false;
}

export const browser = {
    getScrollbarSize,
    isWebkitBased,
    getChromeVersion,
};
