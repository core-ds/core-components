import { DEFAULT_INTENSITY } from '../constants';
import { type HapticInput, type TriggerOptions } from '../typings';

import { needsIosHapticSwitch, triggerIosSystemTick } from './ios-tick';
import { hapticLog } from './logger';
import { clamp01, clampVibrations, normalizeInput, toVibratePattern } from './vibration';

/**
 * Поддерживает ли окружение нативную вибрацию.
 */
export const isVibrationSupported = (): boolean =>
    typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

/**
 * Запускает haptic feedback.
 */
export const triggerHaptic = (
    input: HapticInput,
    options?: TriggerOptions,
    debug = false,
): void => {
    const vibrations = clampVibrations(normalizeInput(input));

    if (!vibrations?.length) {
        hapticLog(debug, 'trigger', { input, skipped: 'empty or invalid input' });

        return;
    }

    const intensity = clamp01(options?.intensity ?? DEFAULT_INTENSITY);

    hapticLog(debug, 'trigger', { input, vibrations, intensity });

    if (isVibrationSupported()) {
        const pattern = toVibratePattern(vibrations, intensity);
        const accepted = navigator.vibrate(pattern);

        hapticLog(debug, 'vibrate', { pattern, accepted });

        return;
    }

    if (needsIosHapticSwitch()) {
        const ticked = triggerIosSystemTick();

        hapticLog(debug, 'ios:tick', { ticked });
    }
};

export const cancelHaptic = (debug = false): void => {
    if (!isVibrationSupported()) return;

    navigator.vibrate(0);

    hapticLog(debug, 'cancel');
};
