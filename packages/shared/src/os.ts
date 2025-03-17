import { detect } from 'detect-browser';

import { isClient } from './isClient';

function isApplePlatform(): boolean {
    return window.navigator.platform.startsWith('Mac') || window.navigator.platform === 'iPhone';
}

function isIOS(): boolean {
    if (isClient()) {
        const IOS_REG_EXP = /ipad|iphone|ipod/;

        return (
            IOS_REG_EXP.test(window.navigator.userAgent.toLowerCase()) ||
            (isApplePlatform() && window.navigator.maxTouchPoints > 1)
        );
    }

    return false;
}

function isMacOS(): boolean {
    if (isClient()) {
        const browser = detect();

        if (browser) {
            return browser.os === 'Mac OS';
        }
    }

    return false;
}

export { isIOS, isApplePlatform, isMacOS };
