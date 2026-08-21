import { useCallback, useEffect, useState } from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { type HapticComponentValue, type HapticInput, type Options } from '../typings';
import { cancelHaptic, hapticPreset, triggerHaptic } from '../utils';
import { isIosFallback, isSupported as isVibrationSupported } from '../utils/helpers';

export interface UseHapticParams {
    /**
     * Локальный preset или `false` для отключения этого экземпляра хука.
     */
    preset?: HapticComponentValue;

    /**
     * Включает диагностические сообщения.
     */
    debug?: boolean;
}

export interface UseHapticResponse {
    /**
     * Запускает haptic feedback.
     */
    trigger: (input?: HapticInput, options?: Options) => void;

    /**
     * Отменяет haptic feedback.
     */
    cancel: () => void;

    /**
     * Разрешён ли haptic глобальной и локальной политикой.
     */
    enabled: boolean;

    /**
     * Доступен ли программный haptic feedback через Vibration API или iOS switch.
     */
    isSupported: boolean;
}

/**
 * Предоставляет управление haptic feedback.
 *
 * ! todo: add more description
 * @remarks
 * Приоритет разрешения вызова `trigger`:
 *
 * 1. Глобально отключённый haptic — no-op.
 * 2. `preset=false` — локальный no-op.
 * 3. Явно переданный `input`.
 * 4. Значение `preset`.
 * 5. Без `input` и `preset` — no-op.
 *
 * @returns Методы управления и текущее состояние haptic feedback.
 */
export const useHaptic = ({ preset, debug }: UseHapticParams = {}): UseHapticResponse => {
    const { haptics } = useCoreConfig();
    const [isIosSupported, setIsIosSupported] = useState(false);

    const isDebug = debug ?? haptics?.debug ?? false;
    const enabled = haptics?.enabled !== false && preset !== false;

    useEffect(() => {
        setIsIosSupported(isIosFallback);
    }, []);

    const trigger = useCallback(
        (input = hapticPreset(preset), options?: Options) => {
            if (!enabled || input === undefined) return;

            triggerHaptic(input, options, isDebug);
        },
        [enabled, isDebug, preset],
    );

    const cancel = useCallback(() => cancelHaptic(isDebug), [isDebug]);

    return {
        trigger,
        cancel,
        enabled,
        isSupported: isVibrationSupported || isIosSupported,
    };
};
