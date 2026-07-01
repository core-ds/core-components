import { useCallback } from 'react';
import { useWebHaptics } from 'web-haptics/react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { type HapticInput, type HapticPresetValue, type TriggerOptions } from '../types';
import { resolveHapticConfig } from '../utils';

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
     * `true`, если окружение поддерживает haptic и есть resolved config
     * для вызова `trigger()` без аргументов.
     *
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
     * Если передать `input`, он будет отправлен напрямую в `web-haptics.trigger`.
     * Если `input` не передан, используется payload из `preset` или `CoreConfig.haptics`.
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
    const {
        cancel,
        isSupported,
        trigger: triggerHaptics,
    } = useWebHaptics({
        debug: isDebug,
    });

    const config = resolveHapticConfig({
        preset,
        global: haptics,
    });

    const canTrigger = isSupported || isDebug;

    const trigger = useCallback(
        (input?: HapticInput, options?: TriggerOptions) => {
            if (!canTrigger) return;

            // Direct trigger has the highest priority and bypasses local/global config.
            if (input !== undefined) {
                triggerHaptics(input, options)?.catch(() => {});

                return;
            }

            if (!config) return;

            // No direct input: use resolved local preset or global CoreConfig.haptics.
            triggerHaptics(config.input, options ?? config.options)?.catch(() => {});
        },
        [canTrigger, config, triggerHaptics],
    );

    return {
        enabled: canTrigger && Boolean(config),
        isSupported,
        trigger,
        cancel,
    };
};
