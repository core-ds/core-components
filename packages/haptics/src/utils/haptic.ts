import { type HapticInput, type Options } from '../typings';

import { DEFAULT_INTENSITY } from './constants';
import { isIosFallback, isSupported, triggerIosSwitchTick } from './helpers';
import { hapticLog } from './logger';
import { clamp, clampVibrations, normalizeInput, toVibratePattern } from './vibration';

/** Запускает haptic feedback. */
export const triggerHaptic = (input: HapticInput, options?: Options, debug = false): void => {
    const vibrations = clampVibrations(normalizeInput(input));

    if (!vibrations?.length) {
        hapticLog(debug, 'trigger', { input, skipped: 'empty or invalid input' });

        return;
    }

    const intensity = clamp(options?.intensity ?? DEFAULT_INTENSITY);

    hapticLog(debug, 'trigger', { input, vibrations, intensity });

    if (isSupported) {
        const pattern = toVibratePattern(vibrations, intensity);
        const accepted = navigator.vibrate(pattern);

        hapticLog(debug, 'vibrate', { pattern, accepted });

        return;
    }

    if (isIosFallback) {
        const tick = triggerIosSwitchTick();

        if (tick) {
            hapticLog(debug, 'ios:tick', { ticked: tick.toggled });
        }
    }
};

/** Отменяет haptic feedback. */
export const cancelHaptic = (debug = false): void => {
    if (!isSupported) return;

    navigator.vibrate(0);

    hapticLog(debug, 'cancel');
};
