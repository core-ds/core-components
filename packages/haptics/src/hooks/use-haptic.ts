import { useCallback } from 'react';
import { useWebHaptics } from 'web-haptics/react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { triggerIosSystemTick } from '../ios-system-tick';
import { type HapticInput, type HapticPresetValue, type TriggerOptions } from '../types';
import { resolveHapticConfig, resolvePlatformHapticInput } from '../utils';

export interface UseHapticParams {
    /**
     * Локальный haptic-пресет или кастомный vibration-конфиг.
     * Перекрывает глобальный `CoreConfig.haptics`, кроме прямого вызова `trigger(input)`.
     */
    preset?: HapticPresetValue;

    /**
     * Звуковой fallback вместо вибрации — для проверки паттернов на десктопе.
     * Приоритет: аргумент хука → `CoreConfig.haptics.debug` → `false`.
     *
     * @default false
     */
    debug?: boolean;
}

interface UseHapticResponse {
    /**
     * Прямой `trigger(input)` работает независимо от этого флага.
     */
    enabled: boolean;

    /**
     * Поддерживает ли текущее окружение нативную вибрацию через `navigator.vibrate`.
     */
    isSupported: boolean;

    /**
     * Запускает haptic feedback.
     *
     */
    trigger: (input?: HapticInput, options?: TriggerOptions) => void;

    /**
     * Отменяет текущий haptic feedback, если `web-haptics` уже начал проигрывать паттерн.
     */
    cancel: () => void;
}

/**
 * Хук для ручного запуска haptic feedback.
 *
 * Оборачивает `useWebHaptics` и добавляет поддержку конфигурации из `CoreConfig.haptics`
 * и локального `preset`.
 *
 * Приоритет источников:
 * 1. `trigger(input, options)` — прямой вызов, самый высокий приоритет.
 * 2. `useHaptic({ preset })` — локальный preset или кастомный vibration-конфиг.
 * 3. `CoreConfig.haptics` — глобальная конфигурация из провайдера.
 */
export const useHaptic = ({ preset, debug }: UseHapticParams = {}): UseHapticResponse => {
    const { haptics } = useCoreConfig();

    const isDebug = debug ?? haptics?.debug ?? false;

    /**
     * `web-haptics` с `debug: true` делает `await ensureAudio()` до `label.click()`.
     * На iOS это теряет user-gesture grant → tick не срабатывает.
     */
    const isVibrateSupported =
        typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

    const webHapticsDebug = isVibrateSupported ? isDebug : false;

    const {
        cancel,
        isSupported,
        trigger: triggerHaptics,
    } = useWebHaptics({
        debug: webHapticsDebug,
    });

    const config = resolveHapticConfig({
        preset,
        global: haptics,
    });

    const trigger = useCallback(
        (input?: HapticInput, options?: TriggerOptions) => {
            const hasWork = input !== undefined || Boolean(config?.input);
            if (!hasWork) return;

            // iOS / no Vibration API: programmatic tick (works on iOS < 26.5).
            if (!isSupported) {
                triggerIosSystemTick();

                return;
            }

            // Android / Vibration API path via web-haptics.
            if (input !== undefined) {
                const platformInput = resolvePlatformHapticInput(input, {
                    isSupported,
                    debug: webHapticsDebug,
                });

                triggerHaptics(platformInput, options)?.catch(() => {});

                return;
            }

            if (!config?.input) return;

            const platformInput = resolvePlatformHapticInput(config.input, {
                isSupported,
                debug: webHapticsDebug,
            });

            triggerHaptics(platformInput, options ?? config.options)?.catch(() => {});
        },
        [config, isSupported, triggerHaptics, webHapticsDebug],
    );

    return {
        enabled: Boolean(config),
        isSupported,
        trigger,
        cancel,
    };
};
