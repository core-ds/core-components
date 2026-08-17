import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { type HapticInput, type HapticPresetValue, type TriggerOptions } from '../typings';
import {
    cancelHaptic,
    isVibrationSupported,
    needsIosHapticSwitch,
    resolveHapticConfig,
    resolvePlatformHapticInput,
    triggerHaptic,
} from '../utils';

export interface UseHapticParams {
    preset?: HapticPresetValue;
    debug?: boolean;
}

export interface UseHapticResponse {
    /**
     * Прямой `trigger(input)` работает независимо от этого флага.
     */
    enabled: boolean;

    /**
     * Доступен ли haptic feedback через `navigator.vibrate` или прямое
     * взаимодействие с iOS switch-overlay.
     */
    isSupported: boolean;

    /**
     * Отменяет текущий haptic feedback.
     */
    trigger: (input?: HapticInput, options?: TriggerOptions) => void;

    /**
     * Отменяет текущую вибрацию, если она ещё проигрывается.
     */
    cancel: () => void;

    /**
     *
     */
    fallback: boolean;
}

/**
 * Хук для ручного запуска haptic feedback.
 *
 * Приоритет источников:
 * 1. `trigger(input, options)` — прямой вызов, самый высокий приоритет.
 * 2. `useHaptic({ preset })` — локальный preset или кастомный vibration-конфиг.
 * 3. `CoreConfig.haptics` — глобальная конфигурация из провайдера.
 */
export const useHaptic = ({ preset, debug }: UseHapticParams = {}): UseHapticResponse => {
    const { haptics } = useCoreConfig();

    const isDebug = debug ?? haptics?.debug ?? false;
    const supportsVibration = isVibrationSupported();
    const [needsIosOverlay, setNeedsIosOverlay] = useState(false);

    useEffect(() => {
        setNeedsIosOverlay(needsIosHapticSwitch());
    }, []);

    const config = useMemo(
        () => resolveHapticConfig({ preset, global: haptics }),
        [preset, haptics],
    );

    const trigger = useCallback(
        (input?: HapticInput, options?: TriggerOptions) => {
            const resolvedInput = input ?? config?.input;

            if (resolvedInput === undefined) return;

            const platformInput = resolvePlatformHapticInput(resolvedInput, {
                supportsVibration,
            });

            if (platformInput === undefined) return;

            triggerHaptic(
                platformInput,
                input === undefined ? (options ?? config?.options) : options,
                isDebug,
            );
        },
        [config, isDebug, supportsVibration],
    );

    const cancel = useCallback(() => cancelHaptic(isDebug), [isDebug]);

    return {
        enabled: Boolean(config),
        isSupported: supportsVibration || needsIosOverlay,
        trigger,
        cancel,
        fallback: needsIosOverlay,
    };
};
