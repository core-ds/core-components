import { isClient } from './isClient';

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

export const os = {
    isIOS,
    isApplePlatform,
};
