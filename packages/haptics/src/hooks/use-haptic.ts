import { useCallback } from 'react';
import { useWebHaptics } from 'web-haptics/react';

import { useCoreConfig } from '@alfalab/core-components-config';

import {
    type HapticInput,
    type HapticPresetValue,
    type TriggerOptions,
} from '../types';
import { resolveHapticConfig } from '../utils';

type WebHapticsOptions = NonNullable<Parameters<typeof useWebHaptics>[0]>;

interface UseHapticParams extends WebHapticsOptions {
    dataHapticPreset?: HapticPresetValue;
}

interface UseHapticResponse {
    /**
     * Можно ли запускать haptic с учётом итогового конфига и поддержки окружения.
     */
    enabled: boolean;

    /**
     * Поддерживает ли текущее окружение запуск haptic feedback через `web-haptics`.
     */
    isSupported: boolean;

    /**
     * Запускает haptic feedback.
     *
     * Если передать `input`, он будет отправлен напрямую в `web-haptics.trigger`.
     * Если `input` не передан, используется payload из локального `haptic` или `CoreConfig.haptics`.
     */
    trigger: (input?: HapticInput, options?: TriggerOptions) => void;

    /**
     * Отменяет текущий haptic feedback, если `web-haptics` уже начал проигрывать паттерн.
     */
    cancel: () => void;
};

/**
 * Хук для ручного запуска haptic feedback.
 *
 * Оборачивает `useWebHaptics` и добавляет поддержку конфигурации из `CoreConfig.haptics`
 * и локального `data-haptic-preset`-пропса компонента.
 *
 * Приоритет источников:
 * 1. `trigger(input, options)` — прямой вызов с payload для `web-haptics`, самый высокий приоритет.
 * 2. `useHaptic({ dataHapticPreset })` — локальный preset или кастомный vibration-конфиг.
 * 3. `CoreConfig.haptics` — глобальная конфигурация из провайдера.
 *
 * Если `input` передан в `trigger`, локальный и глобальный конфиг используются только для
 * проверки доступности hook-а, но не меняют payload. Если `input` не передан, hook запускает
 * заранее разрешённый payload из локального `data-haptic-preset` или глобального `CoreConfig.haptics`.
 *
 * `enabled` возвращает `true` только когда итоговый конфиг есть и `web-haptics` поддерживается
 * текущим окружением.
 */
export const useHaptic = ({
    dataHapticPreset,
    debug,
    showSwitch,
}: UseHapticParams = {}): UseHapticResponse => {
    const { haptics } = useCoreConfig();
    const { cancel, isSupported, trigger: triggerHaptics } = useWebHaptics({ debug, showSwitch });

    const config = resolveHapticConfig({
        dataHapticPreset,
        global: haptics,
    });

    const trigger = useCallback(
        (input?: HapticInput, options?: TriggerOptions) => {
            if (!isSupported) return;

            // Direct trigger has the highest priority and bypasses local/global config.
            if (input !== undefined) {
                triggerHaptics(input, options)?.catch(() => {});

                return;
            }

            if (!config) return;

            // No direct input: use resolved local `data-haptic-preset` prop or global CoreConfig.haptics.
            triggerHaptics(config.input, options ?? config.options)?.catch(() => {});
        },
        [config, isSupported, triggerHaptics],
    );

    return {
        enabled: Boolean(config && isSupported),
        isSupported,
        trigger,
        cancel,
    };
};
