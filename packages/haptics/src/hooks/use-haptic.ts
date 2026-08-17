import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { type HapticInput, type HapticPresetValue, type Options } from '../typings';
import {
    cancelHaptic,
    resolveHapticConfig,
    resolvePlatformHapticInput,
    triggerHaptic,
} from '../utils';
import { isIosFallback, isSupported } from '../utils/helpers';

export interface UseHapticParams {
    preset?: HapticPresetValue;
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
     * Прямой `trigger(input)` работает независимо от этого флага.
     */
    enabled: boolean;

    /**
     * Доступен ли haptic feedback через `navigator.vibrate` или прямое
     * взаимодействие с iOS switch-overlay.
     */
    isSupported: boolean;

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

    // todo: maybe remove
    const [needsIosOverlay, setNeedsIosOverlay] = useState(false);

    useEffect(() => {
        setNeedsIosOverlay(isIosFallback);
    }, []);

    const config = useMemo(
        () => resolveHapticConfig({ preset, global: haptics }),
        [preset, haptics],
    );

    const trigger = useCallback(
        (input?: HapticInput, options?: Options) => {
            const resolvedInput = input ?? config?.input;

            if (resolvedInput === undefined) return;

            const platformInput = resolvePlatformHapticInput(resolvedInput, {
                supportsVibration: isSupported,
            });

            if (platformInput === undefined) return;

            triggerHaptic(
                platformInput,
                input === undefined ? (options ?? config?.options) : options,
                isDebug,
            );
        },
        [config, isDebug],
    );

    const cancel = useCallback(() => cancelHaptic(isDebug), [isDebug]);

    return {
        trigger,
        cancel,
        enabled: Boolean(config),
        isSupported: isSupported || needsIosOverlay,
        fallback: needsIosOverlay,
    };
};
