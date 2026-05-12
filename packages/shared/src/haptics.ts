import { WebHaptics } from 'web-haptics';

import { isClient } from './isClient';

export type HapticPreset = 'selection';

export type TriggerHapticOptions = {
    enabled?: boolean;
};

const hapticPatterns: Record<HapticPreset, Parameters<WebHaptics['trigger']>[0]> = {
    selection: [{ duration: 50, intensity: 1 }],
    // TODO: add more custom haptic patterns... (or use defaultPatterns)
};

let haptics: WebHaptics | null = null;

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

export const triggerHaptic = (preset: HapticPreset, options: TriggerHapticOptions = {}) => {
    if (options.enabled === false) return;
    if (!isHapticsSupported()) return;

    getHaptics()
        .trigger(hapticPatterns[preset])
        // no-op on error
        .catch(() => {});
};
