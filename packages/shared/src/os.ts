import { detect } from 'detect-browser';

import { isClient } from './isClient';

const browser = detect();

const IOS_REG_EXP = /ipad|iphone|ipod/;

function isApplePlatform(): boolean {
    return window.navigator.platform.startsWith('Mac') || window.navigator.platform === 'iPhone';
}

function isIOS(): boolean {
    if (isClient()) {
        return (
            IOS_REG_EXP.test(window.navigator.userAgent.toLowerCase()) ||
            (isApplePlatform() && window.navigator.maxTouchPoints > 1)
        );
    }

    return false;
}

function isMacOS(): boolean {
    if (isClient() && browser) {
        return browser.os === 'Mac OS';
    }

    return false;
}

export const os = {
    isIOS,
    isApplePlatform,
    isMacOS,
};
