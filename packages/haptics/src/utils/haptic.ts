import { type HapticTriggerInput, type HapticTriggerOptions } from '../typings';

import { DEFAULT_INTENSITY } from './constants';
import { getHapticEnvironment } from './environment';
import { triggerIosSwitchTick } from './helpers';
import { hapticLog } from './logger';
import { clamp, clampVibrations, normalizeInput, toVibratePattern } from './vibration';

type TriggerHapticParams = {
    input: HapticTriggerInput;
    options?: HapticTriggerOptions;
    debug?: boolean;
};

/** Запускает haptic feedback. */
export const triggerHaptic = ({ input, options, debug = false }: TriggerHapticParams): void => {
    const vibrations = clampVibrations(normalizeInput(input));

    if (!vibrations?.length) {
        hapticLog(debug, 'trigger', { input, skipped: 'empty or invalid input' });

        return;
    }

    const intensity = clamp(options?.intensity ?? DEFAULT_INTENSITY);

    hapticLog(debug, 'trigger', { input, vibrations, intensity });

    const { vibration, iosFallback } = getHapticEnvironment();

    if (vibration) {
        const pattern = toVibratePattern(vibrations, intensity);
        const accepted = navigator.vibrate(pattern);

        hapticLog(debug, 'vibrate', { pattern, accepted });

        return;
    }

    if (iosFallback) {
        const tick = triggerIosSwitchTick();

        if (tick) {
            hapticLog(debug, 'ios:tick', { ticked: tick.toggled });
        }
    }
};

/** Отменяет haptic feedback. */
export const cancelHaptic = (debug = false): void => {
    if (!getHapticEnvironment().vibration) return;

    navigator.vibrate(0);

    hapticLog(debug, 'cancel');
};
