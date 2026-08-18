import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import {
    type HapticComponentValue,
    type HapticInput,
    type HapticPattern,
    type Options,
} from '../typings';
import { cancelHaptic, triggerHaptic } from '../utils';
import { DEFAULT_REPEAT } from '../utils/constants';
import { isIosFallback, isSupported } from '../utils/helpers';

const repeatHapticPattern = (pattern: HapticPattern, repeat = DEFAULT_REPEAT): HapticPattern =>
    Array.from({ length: Math.max(1, Math.floor(repeat)) }).flatMap(() => pattern);

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
     * Доступен ли haptic feedback через `navigator.vibrate` или прямое
     * взаимодействие с iOS switch-overlay.
     */
    isSupported: boolean;

    /**
     * Нужен ли iOS overlay (`HapticFallback`) для нативного тика.
     * `false`, если нет локального preset или haptic отключён.
     */
    fallback: boolean;
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

    const isDebug = debug ?? haptics?.debug ?? false;
    const enabled = haptics?.enabled !== false && preset !== false;

    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        setOverlay(isIosFallback);
    }, []);

    const presetInput = useMemo<HapticInput | undefined>(() => {
        if (!enabled || preset === undefined) return undefined;

        if (typeof preset === 'string') return preset;

        const { repeat = DEFAULT_REPEAT, ...vibration } = preset;

        return repeatHapticPattern([vibration] as HapticPattern, repeat);
    }, [enabled, preset]);

    const trigger = useCallback(
        (input?: HapticInput, options?: Options) => {
            if (!enabled) return;

            const resolvedInput = input ?? presetInput;

            if (resolvedInput === undefined) return;

            triggerHaptic(resolvedInput, options, isDebug);
        },
        [enabled, isDebug, presetInput],
    );

    const cancel = useCallback(() => cancelHaptic(isDebug), [isDebug]);

    return {
        trigger,
        cancel,
        enabled,
        isSupported: isSupported || overlay,
        fallback: overlay && presetInput !== undefined,
    };
};
