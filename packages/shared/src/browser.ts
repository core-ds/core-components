import { detect } from 'detect-browser';

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
    return isClient() && navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
}

function isSafari(): boolean {
    return isClient() && detect()?.name === 'safari';
}

function isWebView(): boolean {
    return (
        isClient() &&
        // copied from https://github.com/nolimits4web/swiper/blob/2eba4db20b2a7b4b8107e89567af813125be4ce6/src/shared/get-browser.mjs#L25
        /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)
    );
}

export { getScrollbarSize, isWebkitBased, isSafari, isWebView };
