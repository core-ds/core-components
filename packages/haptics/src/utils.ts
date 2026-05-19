import { defaultPatterns, type HapticPattern, WebHaptics } from 'web-haptics';

import { isIOS } from '@alfalab/core-components-shared';

import {
    type HapticPreset,
    type TriggerHapticOptions,
} from './types';

// todo: add more haptic patterns
const hapticPatterns: Record<HapticPreset, HapticPattern> = {
    ...defaultPatterns,
    selection: [{ duration: 500, intensity: 1 }],
};

// todo: add more native haptic patterns
const nativeHapticPatterns: Record<HapticPreset, number> = {
    selection: 50,
};

let haptics: WebHaptics | null = null;
let iosHapticInput: HTMLInputElement | null = null;

const isClient = () => typeof window !== 'undefined';

const isTouchEnvironment = () => {
    if (!isClient()) return false;

    return (
        window.navigator.maxTouchPoints > 0 ||
        window.matchMedia?.('(pointer: coarse)').matches === true
    );
};

export const isHapticsSupported = () =>
    isClient() && (typeof window.navigator.vibrate === 'function' || isTouchEnvironment());

const getHaptics = () => {
    if (!haptics) {
        haptics = new WebHaptics({ showSwitch: false });
    }

    return haptics;
};

const getIOSHapticInput = () => {
    if (iosHapticInput?.isConnected) return iosHapticInput;

    const input = document.createElement('input');

    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.setAttribute('aria-hidden', 'true');
    input.tabIndex = -1;
    input.style.cssText = [
        'position:fixed',
        'top:0',
        'left:0',
        'width:1px',
        'height:1px',
        'opacity:0',
        'pointer-events:none',
    ].join(';');

    document.body.appendChild(input);
    iosHapticInput = input;

    return iosHapticInput;
};

export const triggerHaptic = (preset: HapticPreset, options: TriggerHapticOptions = {}) => {
    if (options.enabled === false) return;
    if (!isHapticsSupported()) return;

    if (typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(nativeHapticPatterns[preset]);

        return;
    }

    if (isIOS()) {
        const input = getIOSHapticInput();

        input.checked = !input.checked;
        input.click();

        return;
    }

    getHaptics()
        .trigger(hapticPatterns[preset])
        .catch(() => {});
};
