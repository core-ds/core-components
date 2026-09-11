import { useCallback } from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import {
    type HapticTriggerOptions,
    type UseHapticParams,
    type UseHapticResponse,
} from '../typings';
import { cancelHaptic, hapticPreset, triggerHaptic, useHapticEnvironment } from '../utils';

/**
 * Предоставляет управление haptic feedback.
 *
 * @remarks
 * Приоритет разрешения вызова `trigger`:
 *
 * 1. Глобально отключённый haptic (`CoreConfig.haptics.enabled === false`) — no-op.
 * 2. `preset=false` — локальный no-op.
 * 3. Явно переданный `input`.
 * 4. Значение `preset`.
 * 5. Без `input` и `preset` — no-op.
 *
 * @returns Методы управления и текущее состояние haptic feedback.
 */
export const useHaptic = ({ preset, debug }: UseHapticParams = {}): UseHapticResponse => {
    const { haptics } = useCoreConfig();
    const { vibration, iosFallback } = useHapticEnvironment();

    const isDebug = debug ?? haptics?.debug ?? false;
    const enabled = haptics?.enabled !== false && preset !== false;

    const trigger = useCallback(
        (input = hapticPreset(preset), options?: HapticTriggerOptions) => {
            if (!enabled || input === undefined) return;

            triggerHaptic({ input, options, debug: isDebug });
        },
        [enabled, isDebug, preset],
    );

    const cancel = useCallback(() => cancelHaptic(isDebug), [isDebug]);

    return {
        trigger,
        cancel,
        enabled,
        isSupported: vibration || iosFallback,
    };
};
