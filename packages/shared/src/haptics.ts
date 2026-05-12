import { WebHaptics } from 'web-haptics';

import { isClient } from './isClient';
import { isIOS } from './os';

export type HapticPreset = 'selection';

export type TriggerHapticOptions = {
    enabled?: boolean;
};

const hapticPatterns: Record<HapticPreset, Parameters<WebHaptics['trigger']>[0]> = {
    selection: [{ duration: 50, intensity: 1 }],
    // TODO: add more custom haptic patterns... (or use defaultPatterns)
};

let haptics: WebHaptics | null = null;
let iosHapticInput: HTMLInputElement | null = null;

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
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.style.pointerEvents = 'none';
    input.style.width = '1px';
    input.style.height = '1px';
    input.style.left = '-9999px';
    input.style.top = '0';

    document.body.appendChild(input);
    iosHapticInput = input;

    return iosHapticInput;
};

const triggerIOSHapticFallback = () => {
    const input = getIOSHapticInput();

    input.checked = !input.checked;
    input.click();
};

export const triggerHaptic = (preset: HapticPreset, options: TriggerHapticOptions = {}) => {
    if (options.enabled === false) return;
    if (!isHapticsSupported()) return;

    if (isIOS()) {
        triggerIOSHapticFallback();

        return;
    }

    getHaptics()
        .trigger(hapticPatterns[preset])
        // no-op on error
        .catch(() => {});
};
